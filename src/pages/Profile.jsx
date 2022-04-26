import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  updateDoc,
  doc,
  where,
  getDocs,
  query,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import HeaderTitle from "../components/HeaderTitle";
import SingleListingComponent from "../components/SingleListingComponent";

const ProfileContainer = styled.div``;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
`;
const DetailsName = styled.p`
  font-weight: 600;
`;
const ChangeDetailsButton = styled.button`
  cursor: pointer;
  font-weight: 600;
  color: rebeccapurple;
  background-color: transparent;
`;
const ProfileForm = styled.form``;
const Input = styled.input`
  margin: 0.3rem 0;
  padding: 0.5rem 1rem;
  font-weight: 600;
  width: 100%;
  background-color: white;
  outline: none;
  border: none;
  border-radius: 5px;
`;
const CreateListingLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;
const ListingsText = styled.p``;
const ListingsList = styled.ul``;

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeUserData, setChangeUserData] = useState(false);
  const [listings, setListings] = useState(null);
  const navigate = useNavigate();

  const { name, email } = userData;

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const handleSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("details could't be updated");
    }
  };
  const handleChange = (e) => {
    setUserData((prev) => ({
      ...userData,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid)
      );
      const querySnap = await getDocs(q);

      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
      console.log(listings);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const handleDelete = (listingId) => {
    deleteDoc(doc(db, "listings", listingId));
    const newListings = listings.filter((listing) => listing.id !== listingId);
    setListings(newListings);
  };

  return (
    <ProfileContainer>
      <Header>
        <HeaderTitle title="profile" />
        <Button secondary title="logout" onClick={handleLogout} />
      </Header>
      <UserDetailsContainer>
        <DetailsName>personal details</DetailsName>
        <ChangeDetailsButton
          onClick={() => {
            changeUserData && handleSubmit();
            setChangeUserData(!changeUserData);
          }}
        >
          {changeUserData ? "done" : "change"}
        </ChangeDetailsButton>
      </UserDetailsContainer>
      <ProfileForm>
        <Input
          type="text"
          id="name"
          disabled={!changeUserData}
          value={name}
          onChange={handleChange}
        ></Input>
        <Input
          type="text"
          id="email"
          disabled={!changeUserData}
          value={email}
          onChange={handleChange}
        ></Input>
      </ProfileForm>
      <CreateListingLink to="/create-listing">
        <Button title="create a new listing" />
      </CreateListingLink>
      {!loading && listings.length > 0 && (
        <>
          <ListingsText>your listings</ListingsText>
          <ListingsList>
            {listings.map((listing) => (
              <SingleListingComponent
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => handleDelete(listing.id)}
              />
            ))}
          </ListingsList>
        </>
      )}
    </ProfileContainer>
  );
};

export default Profile;
