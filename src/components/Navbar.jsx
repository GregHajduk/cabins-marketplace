import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersoneOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import Explore from "../pages/Explore";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {};
  return (
    <navbar className="navbar">
      <div className="navbarWrapper">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon
              height="2rem"
              width="2rem"
              onClick={() => navigate("/")}
            />
            <p>explore</p>
          </li>
          <li className="navbarListItem">
            <OfferIcon height="2rem" width="2rem" onClick={() => navigate("/offers")} />
            <p>offers</p>
          </li>
          <li className="navbarListItem">
            <PersoneOutlineIcon
              height="2rem"
              width="2rem"
              onClick={() => navigate("/profile")}
            />
            <p>profile</p>
          </li>
        </ul>
      </div>
    </navbar>
  );
};

export default Navbar;
