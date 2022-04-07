import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: #00cc66;
  border-radius: 50%;
  cursor: pointer;
`;

const Button = ({ title }) => {
  return <Btn>{title}</Btn>;
};

export default Button;
