// Don't mind the code right now, gonna get cleaned up

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Something went wrong!
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
    }
  };

  return (
    <div className="sign">
      <h1> Sign In </h1>
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
  );
}
export default LoginPage;
