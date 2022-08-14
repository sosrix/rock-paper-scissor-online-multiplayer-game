import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function UserArea({ user, previousScore }) {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="userArea">
      <div className="user">
        <div className="avatar">
          <img
            className="avatar__image"
            alt="myAvatar"
            src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png"
          />
        </div>
        <p>{user ? user.email.toUpperCase() : "USERNAME?"}</p>
        <button className="singOut-btn" onClick={logout}>
          Sign Out
        </button>
      </div>
      <p className="userMessage"> SCORE : {previousScore}</p>
    </div>
  );
}
