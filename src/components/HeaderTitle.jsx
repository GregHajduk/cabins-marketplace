import styled from "styled-components";
const Title = styled.h1`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 800;
  text-transform: capitalize;
`;
const HeaderTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

export default HeaderTitle;
