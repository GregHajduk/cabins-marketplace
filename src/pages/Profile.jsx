import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

import styled from "styled-components";

const Title = styled.h1``;
const ProfileContainer = styled.div``;
const Header = styled.header``;
const Button = styled.button``;

const Profile = () => {
  const auth = getAuth();
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const handleLogout = () => {
    
  };

  return (
    <ProfileContainer>
      <Header>
        <Title>my profile</Title>
        <Button type="button" onClick={handleLogout}>
          logout
        </Button>
      </Header>
    </ProfileContainer>
  );
};

export default Profile;
