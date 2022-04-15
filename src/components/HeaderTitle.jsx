import styled from "styled-components";
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  text-transform: capitalize;
`;
const HeaderTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

export default HeaderTitle;
