// Don't mind the code right now, gonna get cleaned up

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import LoaderWrapper from "./loaderwrapper";
import { auth } from "./firebase";

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Not Logged!");
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(user);
      } else {
        console.log("Something went wrong!");
      }
    });
  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <LoaderWrapper>
        <LoaderWrapper.loadingAnimation />
      </LoaderWrapper>
      <div className="sign">
        <h1> Sign In </h1>
        {errorMessage !== "Not Logged!" ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          "You're Not Logged! Try Signing In!"
        )}
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}>LOGIN</button>
        <p>
          You don't have an account ? <Link to="/SignUp">Sign Up</Link>
        </p>
      </div>
    </>
  );
}
export default LoginPage;
