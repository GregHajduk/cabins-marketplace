import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersoneOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import styled from "styled-components";

const Nav = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 6rem;
  background-color: #ffffff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavbarWrapper = styled.div`
  width: 100%;
  margin-top: 0.75rem;
  overflow-y: hidden;
`;
const NavbarListItems = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const NavbarListItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NavbarListItemTitle = styled.p``;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const active = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <Nav>
      <NavbarWrapper>
        <NavbarListItems>
          <NavbarListItem>
            <ExploreIcon
              fill={active("/") ? "rebeccapurple" : "grey"}
              height="2rem"
              width="2rem"
              onClick={() => navigate("/")}
            />
            <NavbarListItemTitle>explore</NavbarListItemTitle>
          </NavbarListItem>
          <NavbarListItem>
            <OfferIcon
              fill={active("/offers") ? "rebeccapurple" : "grey"}
              height="2rem"
              width="2rem"
              onClick={() => navigate("/offers")}
            />
            <NavbarListItemTitle>offers</NavbarListItemTitle>{" "}
          </NavbarListItem>
          <NavbarListItem>
            <PersoneOutlineIcon
              fill={active("/profile") ? "rebeccapurple" : "grey"}
              height="2rem"
              width="2rem"
              onClick={() => navigate("/profile")}
            />
            <NavbarListItemTitle>profile</NavbarListItemTitle>{" "}
          </NavbarListItem>
        </NavbarListItems>
      </NavbarWrapper>
    </Nav>
  );
};

export default Navbar;
