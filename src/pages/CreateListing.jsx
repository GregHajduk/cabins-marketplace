import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
import HeaderTitle from "../components/HeaderTitle";
import Button from "../components/Button";
import styled from "styled-components";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const Container = styled.div``;
const Wrapper = styled.div``;
const Form = styled.form`
  margin-bottom: 1rem;
`;
const FormRooms = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 1rem;
`;
const FormFeatures = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const Label = styled.label`
  font-weight: 600;
  margin-top: 1rem;
  display: block;
  margin-bottom: 1rem;
`;
const FormButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Input = styled.input`
  padding: 1rem 1.25rem;
  background-color: #ffffff;
  font-weight: 600;
  border-radius: 10px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
`;
const Feature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TextArea = styled.textarea`
  padding: 0.9rem 3rem;
  background-color: #ffffff;
  font-weight: 600;
  border-radius: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
`;
const PriceContainer = styled.div`
  display: flex;
`;
const PriceText = styled.p`
  font-weight: 600;
  margin-top: 1rem;
  margin-left: 0.5rem;
`;
const SubmitButton = styled.button`
  cursor: pointer;
  background: var(--main-accent-color);
  border-radius: 1rem;
  padding: 0.85rem 2rem;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.25rem;
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;
const ImagesMessage = styled.p`
  font-size: 0.75rem;
  color: grey;
`;

const CreateListing = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    wifi: false,
    parking: false,
    address: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    furnished,
    wifi,
    parking,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
      } else {
        navigate("/sign-in");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("discounted price should be less then regular price");
      return;
    }
    if (images.length > 4) {
      setLoading(false);
      toast.error("you can add max. 4 photos");
      return;
    }
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${image.name} + ${v4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const newFormData = {
      ...formData,
      imageUrls,
      timestamp: serverTimestamp(),
    };
    delete newFormData.images;

    const docRef = await addDoc(collection(db, "listings"), newFormData);

    setLoading(false);
    toast.success("you added a new listing");
    navigate(`/category/${newFormData.type}/${docRef.id}`);
  };

  const handleClickAndChange = (e) => {
    e.preventDefault();

    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    } else if (!e.target.files) {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container>
        <HeaderTitle title="create a listing" />
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Label>sell / rent</Label>
            <FormButtons>
              <Button
                secondary={type === "sale" ? "" : "secondary"}
                id="type"
                value="sale"
                onClick={handleClickAndChange}
                title="sell"
              />
              <Button
                secondary={type === "rent" ? "" : "secondary"}
                id="type"
                value="rent"
                onClick={handleClickAndChange}
                title="rent"
              />
            </FormButtons>
            <FormFeatures>
              <Label>offer</Label>
              <FormButtons>
                <Button
                  secondary={offer === "true" ? "" : "secondary"}
                  id="offer"
                  value={true}
                  onClick={handleClickAndChange}
                  title="yes"
                />
                <Button
                  secondary={offer !== "true" ? "" : "secondary"}
                  id="offer"
                  value={false}
                  onClick={handleClickAndChange}
                  title="no"
                />
              </FormButtons>
            </FormFeatures>
            <Label>regular price</Label>
            <PriceContainer>
              <Input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={handleClickAndChange}
                min="100"
                max="10000000"
                required
              />
              {type === "rent" && <PriceText> / Month</PriceText>}
            </PriceContainer>
            {offer === "true" && (
              <>
                <Label>discounted price</Label>
                <PriceContainer>
                  <Input
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={handleClickAndChange}
                    min="100"
                    max="10000000"
                    required
                  />
                  {type === "rent" && <PriceText> / Month</PriceText>}
                </PriceContainer>
              </>
            )}

            <Label>name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              maxLength="32"
              minLength="6"
              onChange={handleClickAndChange}
              required
            />
            <Label>address</Label>
            <TextArea
              type="text"
              id="address"
              value={address}
              onChange={handleClickAndChange}
              required
            ></TextArea>

            <FormRooms>
              <Feature>
                <Label>bedrooms</Label>
                <Input
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={handleClickAndChange}
                  min="1"
                  max="10"
                  required
                />
              </Feature>
              <Feature>
                <Label>bathrooms</Label>
                <Input
                  type="number"
                  id="bathrooms"
                  value={bathrooms}
                  onChange={handleClickAndChange}
                  min="1"
                  max="10"
                  required
                />
              </Feature>
            </FormRooms>
            <FormFeatures>
              <Label>parking</Label>
              <FormButtons>
                <Button
                  secondary={parking === "true" ? "" : "secondary"}
                  id="parking"
                  value={true}
                  onClick={handleClickAndChange}
                  title="yes"
                />
                <Button
                  secondary={parking !== "true" ? "" : "secondary"}
                  id="parking"
                  value={false}
                  onClick={handleClickAndChange}
                  title="no"
                />
              </FormButtons>
            </FormFeatures>
            <FormFeatures>
              <Label>furnished</Label>
              <FormButtons>
                <Button
                  secondary={furnished === "true" ? "" : "secondary"}
                  id="furnished"
                  value={true}
                  onClick={handleClickAndChange}
                  title="yes"
                />
                <Button
                  secondary={furnished !== "true" ? "" : "secondary"}
                  id="furnished"
                  value={false}
                  onClick={handleClickAndChange}
                  title="no"
                />
              </FormButtons>
            </FormFeatures>
            <FormFeatures>
              <Label>wifi</Label>
              <FormButtons>
                <Button
                  secondary={wifi === "true" ? "" : "secondary"}
                  id="wifi"
                  value={true}
                  onClick={handleClickAndChange}
                  title="yes"
                />
                <Button
                  secondary={wifi !== "true" ? "" : "secondary"}
                  id="wifi"
                  value={false}
                  onClick={handleClickAndChange}
                  title="no"
                />
              </FormButtons>
            </FormFeatures>
            <Label>images</Label>
            <ImagesMessage>you can add max. 4 photos</ImagesMessage>
            <Input
              type="file"
              id="images"
              onChange={handleClickAndChange}
              max="4"
              accept=".jpg,.png,.jped"
              multiple
              required
            />
            <SubmitButton type="submit">create listing</SubmitButton>
          </Form>
        </Wrapper>
      </Container>
    );
  }
};

export default CreateListing;
