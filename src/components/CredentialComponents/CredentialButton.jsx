import React from 'react'

export default function CredentialButton({text,onClick}) {
  return (
    <button type="submit" onClick={onClick} className="rounded-xl uppercase w-full py-2 px-2 text-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xl hover:shadow-2xl transition duration-200 ease-in-out">{text}</button>
  )
}
