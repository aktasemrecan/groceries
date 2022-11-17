import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userAction, userDataAction } from "../actions";

export default function GoogleAuthButton() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const data = {
        email: user.email,
        name: user.displayName,
      };
      data.timeStamp = serverTimestamp();
      updateDoc(doc(db, "users", user.uid), data);
      toast.info("You signed in with google successfully!");
      dispatch(userAction(user));
      dispatch(userDataAction());
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button
      className="bg-red-500 rounded-xl text-white w-full py-2 px-2 font-semibold"
      onClick={onClick}
    >
      Sign in with Google
    </button>
  );
}
