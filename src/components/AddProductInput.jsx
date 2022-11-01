import React from "react";
import CredentialLabel from "./CredentialComponents/CredentialLabel";

export default function AddProductInput({labelShow = true, text,extraClass, type,placeholder, onChange, value }) {
  return (
    <>
      {labelShow && <CredentialLabel extraClass="text-2xl" text={text}/>}
      <input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        required
        minLength="3"
        className={`w-full my-2 py-2 px-3 text-gray-800 bg-white border-gray-500 border-2 rounded-xl text-2xl ${extraClass}`}
      />
    </>
  );
}
