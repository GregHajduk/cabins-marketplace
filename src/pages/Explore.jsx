import { Link } from "react-router-dom";
import styled from "styled-components";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import HeaderTitle from "../components/HeaderTitle";

const Container = styled.div``;
const Main = styled.main``;
const CategoryHeading = styled.h4`
  font-weight: 700;
  margin-top: 3rem;
`;
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CategoryLink = styled(Link)`
  width: 48%;
`;
const CategoryImage = styled.img`
  min-height: 115px;
  height: 15vw;
  width: 100%;
  border-radius: 1.5rem;
  object-fit: cover;
  margin: 0 auto;
`;
const CategoryName = styled.p`
  font-weight: 500;
  text-align: left;
  text-transform: capitalize;
`;
const Explore = () => {
  return (
    <Container>
      <HeaderTitle title="explore" />
      <Main>
        <CategoryHeading>categories</CategoryHeading>
        <Categories>
          <CategoryLink to="/category/rent">
            <CategoryImage src={rentCategoryImage} alt="rent" />
            <CategoryName>for rent</CategoryName>
          </CategoryLink>
          <CategoryLink to="/category/sell">
            <CategoryImage src={sellCategoryImage} alt="sell" />
            <CategoryName>for sale</CategoryName>
          </CategoryLink>
        </Categories>
      </Main>
    </Container>
  );
};

export default Explore;
