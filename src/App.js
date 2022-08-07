import { Routes, Route } from "react-router-dom";

import Game from "./game";
import LoginPage from "./sign-in";
import SignUp from "./sign-up";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
