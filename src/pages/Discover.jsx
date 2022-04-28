import { Link } from "react-router-dom";
import styled from "styled-components";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import mainbg from "../assets/jpg/mainbg2.jpg";

const Container = styled.div``;
const HeaderContainer = styled.div`
  min-height: 40vh;
  background-image: url(${mainbg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const MainHeaderTitle = styled.h1`
  flex: 1;
  font-size: 4rem;
  font-weight: 800;
  text-transform: capitalize;
  text-align: center;
  color: var(--main-light-color);
`;

const Main = styled.main``;
const CategoryHeading = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CategoryLink = styled(Link)`
  width: 48%;
`;
const CategoryImage = styled.img`
  min-height: 8rem;
  height: 15vw;
  width: 100%;
  object-fit: cover;
  margin: 0 auto;
`;
const CategoryName = styled.p`
  font-weight: 500;
  text-align: left;
  text-transform: capitalize;
  margin-top: 0.5rem;
`;
const Explore = () => {
  return (
    <Container>
      <HeaderContainer>
        <MainHeaderTitle>discover the nature</MainHeaderTitle>
      </HeaderContainer>
      <Main>
        <CategoryHeading>categories</CategoryHeading>
        <Categories>
          <CategoryLink to="/category/rent">
            <CategoryImage src={rentCategoryImage} alt="rent" />
            <CategoryName>for rent</CategoryName>
          </CategoryLink>
          <CategoryLink to="/category/sale">
            <CategoryImage src={sellCategoryImage} alt="sale" />
            <CategoryName>for sale</CategoryName>
          </CategoryLink>
        </Categories>
      </Main>
    </Container>
  );
};

export default Explore;
