import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import HeaderTitle from "../components/HeaderTitle";

const Form = styled.form``;
const Input = styled.input`
  margin-bottom: 2rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.11);
  border: none;
  border-radius: 3rem;
  height: 3rem;
  width: 100%;
  outline: none;
  padding: 0 3rem;
  font-size: 1rem;
`;
const SignInLink = styled(Link)`
  cursor: pointer;
  color: rebeccapurple;
  font-weight: 600;
  text-align: right;
`;
const ResetButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: inherit;
`;
const ResetText = styled.p`
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
const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("email was sent");
    } catch (error) {
      toast.error("couldn't send the reset link");
    }
  };
  return (
    <>
      <HeaderTitle title="forgot password" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <SignInLink to="/sign-in">sing in</SignInLink>
        <ResetButtonContainer>
          <ResetText>reset password</ResetText>
          <Button>
            <ArrowRightIcon fill="#fff" width="2rem" height="2rem" />
          </Button>
        </ResetButtonContainer>
      </Form>
    </>
  );
};

export default ForgotPassword;
