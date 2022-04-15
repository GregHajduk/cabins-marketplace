import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import styled from "styled-components";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import HeaderTitle from "../components/HeaderTitle";

const PageContainer = styled.div`
  margin: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmailInput = styled.input`
  box-shadow: rgba(0, 0, 0, 0.11);
  border: none;
  background: #ffffff;
  border-radius: 3rem;
  height: 3rem;
  width: 100%;
  outline: none;
  padding: 0 3rem;
  font-size: 1rem;
`;
const NameInput = styled.input`
  box-shadow: rgba(0, 0, 0, 0.11);
  border: none;
  background: #ffffff;
  border-radius: 3rem;
  height: 3rem;
  width: 100%;
  outline: none;
  padding: 0 3rem;
  font-size: 1rem;
`;
const PasswordInputContainer = styled.div`
  position: relative;
`;
const PasswordInput = styled.input`
  margin-bottom: 2rem;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.11);
  border: none;
  background: #ffffff;
  border-radius: 3rem;
  height: 3rem;
  width: 100%;
  outline: none;
  padding: 0 3rem;
  font-size: 1rem;
`;
const Image = styled.img`
  cursor: pointer;
  position: absolute;
  top: -4%;
  right: 1%;
  padding: 1rem;
`;
const ForgotPassword = styled(Link)`
  cursor: pointer;
  color: rebeccapurple;
  font-weight: 600;
  text-align: right;
`;
const SignInButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: inherit;
`;
const SignInText = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: rebeccapurple;
  border-radius: 50%;
  cursor: pointer;
`;
const Register = styled(Link)`
  margin-top: 4rem;
  color: rebeccapurple;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
`;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { name, email, password } = userData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...userData,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userDataCopy = { ...userData };
      delete userDataCopy.password;
      userDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), userDataCopy);
    } catch (error) {
      toast.error("there was a problem with your registration");
    }
    navigate("/");
  };

  return (
    <>
      <PageContainer>
        <HeaderTitle title="welcome back!" />
        <Form onSubmit={handleSubmit}>
          <NameInput
            type="name"
            placeholder="Name"
            id="name"
            value={name}
            onChange={handleChange}
          />
          <EmailInput
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          <PasswordInputContainer>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={handleChange}
            />
            <Image
              src={visibilityIcon}
              alt="show password"
              onClick={() => setShowPassword(!showPassword)}
            />
            <ForgotPassword to="/forgot-password">
              forgot passoword?
            </ForgotPassword>
          </PasswordInputContainer>
          <SignInButtonContainer>
            <SignInText>sign up</SignInText>
            <Button>
              <ArrowRightIcon fill="#fff" width="2rem" height="2rem" />
            </Button>
          </SignInButtonContainer>
        </Form>
        <Register to="/sign-in">already have an account? sign in</Register>
      </PageContainer>
    </>
  );
};

export default SignUp;
