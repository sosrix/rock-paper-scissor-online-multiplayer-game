import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs1emoaYHQ3WdkfGVnZ_nq16q3cFtKru8",
  authDomain: "rock-paper-siccors-aa7da.firebaseapp.com",
  databaseURL:
    "https://rock-paper-siccors-aa7da-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rock-paper-siccors-aa7da",
  storageBucket: "rock-paper-siccors-aa7da.appspot.com",
  messagingSenderId: "1054721281819",
  appId: "1:1054721281819:web:3c683b6f411af6b2740dbe",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
