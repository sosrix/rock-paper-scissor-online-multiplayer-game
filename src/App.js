import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./checkIfLogged";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Game from "./game";
import LoginPage from "./sign-in";
import SignUp from "./sign-up";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SignUp"
          element={
            <IsUserRedirect user={user} loggedInPath="/">
              <SignUp />
            </IsUserRedirect>
          }
        />
        <Route
          path="/SignIn"
          element={
            <IsUserRedirect user={user} loggedInPath="/">
              <LoginPage />
            </IsUserRedirect>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
