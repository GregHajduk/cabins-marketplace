import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
const Container = styled.div`
  max-width: 65rem;
  margin: 0 auto;
  padding: 6rem 1rem 0 1rem;
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
