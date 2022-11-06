import React, { useState } from "react";
import CredentialInput from "../components/CredentialComponents/CredentialInput";
import CredentialLabel from "../components/CredentialComponents/CredentialLabel";
import HeaderLabel from "../components/HeaderLabel";
import CredentialButton from "../components/CredentialComponents/CredentialButton";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useDispatch } from "react-redux";
import { userAction ,userDataAction} from "../actions";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onClick = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const data = {
        name: name,
        email: email,
      };
      data.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), data);
      dispatch(userAction(user));
      dispatch(userDataAction());
      toast.info("You are successfully registered");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="mx-auto w-[95%]">
      <HeaderLabel text="Register" />
      <div className="flex">
        <img
          className="w-[49%] rounded-xl "
          src="https://media.timeout.com/images/105041644/image.jpg"
          alt="Groceries"
        />

        <div className="pt-3 w-[45%]  items-center justify-center mx-auto">
          <form onSubmit={onSubmit} className="pb-2">
            <div className="pb-3">
              <CredentialLabel text="Name" />
              <CredentialInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div className="pb-3">
              <CredentialLabel text="Email" />
              <CredentialInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </div>
            <div className="pb-7">
              <CredentialLabel text="Password" />
              <CredentialInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <CredentialButton onClick={onClick} text="Register" />
          </form>
          <p className="font-semibold py-2 text-red-400 text-lg text-center">
            OR
          </p>
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
}
