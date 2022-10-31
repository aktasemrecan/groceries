import React from 'react'

export default function CredentialInput({type,onChange,value}) {
  return (
    <input
          type={type}
          onChange={onChange}
          value={value}
          required
          minLength="3"
          maxLength="50"
          className="w-full py-2 px-3 text-gray-800 bg-white border-gray-500 border-2 rounded-xl "
        />
  )
}
