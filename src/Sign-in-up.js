// Don't mind the code right now, gonna get cleaned up

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

import { auth } from "./firebase";

function LoginPage() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState();
  let playerID;
  let playerEmail;

  function getScore() {
    const db = getDatabase();

    const starCountRef = ref(db, "users/" + playerID + "/points");
    onValue(starCountRef, (snapshot) => {
      const score = snapshot.val();
      console.log("points", score);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        playerID = currentUser.uid;
        getScore();
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="">
      <div>
        <h3> Sign Up </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setSignUpEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setSignUpPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Sign In </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      {user ? user.email : "Not Logged In"}
      {user ? <button onClick={logout}> Sign Out </button> : ""}
    </div>
  );
}
export default LoginPage;
