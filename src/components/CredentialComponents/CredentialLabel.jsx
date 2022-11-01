import React from 'react'

export default function CredentialLabel({text,color,extraClass}) {
  return (
    <p className={`font-semibold ${extraClass? extraClass : "text-lg"} text-start ${color ? color : "text-red-400"}`}>{text}</p>
  )
}
