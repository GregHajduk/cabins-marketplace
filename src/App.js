import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContainer from "./components/MainContainer";
import PrivateRoute from "./pages/PrivateRoute";
import Category from "./pages/Category";
import Discover from "./pages/Discover";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
import SingleListing from "./pages/SingleListing";
function App() {
  return (
    <>
      <BrowserRouter>
        <MainContainer>
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/category/:categoryName/:listingId" element={<SingleListing />} />
          </Routes>
        </MainContainer>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
