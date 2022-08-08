// Don't mind the code right now, gonna get cleaned up

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "./firebase";

export default function SignUp() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [user, setUser] = useState();

  let playerID;
  let playerEmail;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        playerID = currentUser.uid;
      } else {
        // Not logged in!
      }
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );

      // initializing players in the database after a successful creation of their account

      if (user) {
        playerID = user.user.uid;
        playerEmail = user.user.email;
        const db = getDatabase();
        set(ref(db, "users/" + playerID), {
          playerEmail,
          playerID,
          points: 0,
        });
      } else {
        // Something went wrong while signing up - Try again!
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign">
      <h1> Sign Up </h1>
      <input
        type="email"
        placeholder="Email"
        value={signUpEmail}
        onChange={(event) => {
          setSignUpEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={signUpPassword}
        onChange={(event) => {
          setSignUpPassword(event.target.value);
        }}
      />
      <button onClick={register}>SIGN UP</button>{" "}
      <p>
        Already a user ? <Link to="/SignIn">Sign In</Link>
      </p>
    </div>
  );
}
