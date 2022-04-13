import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
`;
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
  color: #00cc66;
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

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = userData;
  const [changeUserData, setChangeUserData] = useState(false);

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

  return (
    <ProfileContainer>
      <Header>
        <Title>my profile</Title>
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
        <Button title="create a listing" />
      </CreateListingLink>
    </ProfileContainer>
  );
};

export default Profile;
