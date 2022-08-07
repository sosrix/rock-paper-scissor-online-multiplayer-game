// Don't mind the code right now, gonna get cleaned up

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

import { auth } from "./firebase";

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState();

  let playerID;

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
    <div className="sign-in">
      <h3> Sign In </h3>
      <input
        placeholder="Email..."
        value={loginEmail}
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
      />
      <input
        placeholder="Password..."
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
