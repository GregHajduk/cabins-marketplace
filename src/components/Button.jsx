import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ secondary }) => (secondary ? "black" : "#00cc66")};
  color: white;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 10px;
  cursor: pointer;
`;

const Button = ({ title, secondary }) => {
  return (
    <Btn secondary={secondary} type="button">
      {title}
    </Btn>
  );
};

export default Button;
