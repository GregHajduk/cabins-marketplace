import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 6rem;
  background-color: var(--main-accent-color);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavbarWrapper = styled.div`
  width: 100%;
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
const NavbarListItemTitle = styled.p`
  padding: 0.5rem 2rem;
  color: ${(props) => props.color};
  text-transform: capitalize;
  font-weight: 700;
`;

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
            <NavbarListItemTitle
              color={active("/") ? "var(--main-light-color)" : "var(--main-dark-color)"}
              onClick={() => navigate("/")}
            >
              discover
            </NavbarListItemTitle>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarListItemTitle
              color={active("/offers") ? "var(--main-light-color)" : "var(--main-dark-color)"}
              onClick={() => navigate("/offers")}
            >
              offers
            </NavbarListItemTitle>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarListItemTitle
              color={active("/profile") ? "var(--main-light-color)" : "var(--main-dark-color)"}
              onClick={() => navigate("/profile")}
            >
              my profile
            </NavbarListItemTitle>
          </NavbarListItem>
        </NavbarListItems>
      </NavbarWrapper>
    </Nav>
  );
};

export default Navbar;
