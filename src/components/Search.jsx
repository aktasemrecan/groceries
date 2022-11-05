import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchOnAction } from "../actions";
import { db } from "../firebase";
import ProductCard from "./ProductCard";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const [docArray, setDocArray] = useState();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchOnAction(true));
    const productName = searchTerm.toUpperCase();
    const q = query(
      collection(db, "products"),
      where("productName", ">=", productName, orderBy("productName", "asc"))
    );
    onSnapshot(q, (snapshot) =>
      setDocArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  const renderedList = () => {
    return docArray.map((doc, i) => (
      <ProductCard
        key={i}
        productId={doc.id}
        productName={doc.productName}
        price={doc.price}
        imageUrl={doc.imageUrl}
        quantityT={doc.quantityT}
        discount={doc.discount}
      />
    ));
  };

  return (
    <div>
      <p className="mx-auto justify-center mt-5  w-[55%] items-center py-1 font-semibold text-red-400 text-semibold text-2xl mr-5 ">
        Search Product
      </p>
      <form
        onSubmit={onSubmit}
        className="flex mx-auto justify-center  mb-4 w-[55%]"
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Apple"
          className="px-2 py-2    justify-center text-xl rounded-tl-xl rounded-bl-xl  items-center content-center w-[35%]"
        />
        <button
          onClick={onSubmit}
          className="px-2 py-1  text-white bg-blue-400 hover:bg-blue-500 font-semibold active:bg-blue-600 transition duration-200 ease-in-out  justify-center text-xl rounded-tr-xl rounded-br-xl items-center content-center w-[15%]"
        >
          Search
        </button>
      </form>
      <div>
        {docArray && (
          <div className="m-5 grid  grid-cols-1 gap-1 md:grid-cols-3 md:gap-3  ">
            {renderedList()}
          </div>
        )}
      </div>
    </div>
  );
}
