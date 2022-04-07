import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
const Container = styled.div`
  padding-top: 5rem;
`;

const MainContainer = ({ children }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

export default MainContainer;
