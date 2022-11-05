import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchOnAction } from "../actions";
import Products from "../components/Products";
import Search from "../components/Search";


export default function Home() {

  const searchOn = useSelector(state=>state.searchOn);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(searchOnAction(false));
  },[]);

  return (
    <>
      <Search/>
      {!searchOn && <Products />}
    </>
  );
}
