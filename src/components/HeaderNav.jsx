import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HeaderNav({ path, text }) {
  const location = useLocation();

  const checkLink = () => {
    if (location.pathname === path) {
      return "border-b-red-400";
    }
  };
  return (
    <Link to={path}>
      <li
        className={`border-gray-600 border-solid border-2  rounded-xl px-2 py-1 text-lg ${checkLink()}`}
      >
        {text}
      </li>
    </Link>
  );
}
