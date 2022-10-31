import React, { useState } from "react";
import CredentialInput from "../components/CredentialComponents/CredentialInput";
import CredentialLabel from "../components/CredentialComponents/CredentialLabel";
import HeaderLabel from "../components/HeaderLabel";
import CredentialButton from "../components/CredentialComponents/CredentialButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onClick = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.info("You are successfully signed-in");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container w-full mx-auto">
      <HeaderLabel text="Login" />
      <div className="flex">
        <img
          className="w-[49%] rounded-xl "
          src="https://media.timeout.com/images/105041644/image.jpg"
          alt="Groceries"
        />

        <div className="pt-3 w-[45%]  items-center justify-center mx-auto">
          <form
            onSubmit={onSubmit}
            className="pb-2"
          >
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
            <CredentialButton onClick={onClick} text="login" />
          </form>
          <p className="font-semibold py-2 text-red-400 text-lg text-center">OR</p>
          <GoogleAuthButton/>
        </div>
      </div>
    </div>
  );
}
