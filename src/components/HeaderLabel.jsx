import React from 'react'

export default function HeaderLabel({text,extraClass}) {
  return (
    <h2 className={`py-2 text-center ${extraClass? extraClass : "text-2xl"} text-red-400 justify-center  font-semibold`}>
        {text}
      </h2>
  )
}
