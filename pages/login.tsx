import { useState } from "react";
import LoginComponent from "../components/LoginComponent";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Login = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;
