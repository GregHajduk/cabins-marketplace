import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ secondary }) =>
    secondary ? "white" : "rebeccapurple"};
  color: ${({ secondary }) => (secondary ? "black" : "white")};
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 10px;
  cursor: pointer;
`;

const Button = ({ title, secondary, onClick, id, value }) => {
  return (
    <Btn
      onClick={onClick}
      secondary={secondary}
      id={id}
      value={value}
      type="button"
    >
      {title}
    </Btn>
  );
};

export default Button;
