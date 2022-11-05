import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { productDataAction } from "../actions";

export default function ProductCard({
  productName,
  imageUrl,
  price,
  quantityT,
  productId,
  discount
}) {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [checkBool, setCheckBool] = useState();

  const onFavoriteClick = async () => {
    try {
      if (checkBool) {
        await updateDoc(doc(db, "users", state.userReducer.user.uid), {
          favorites: arrayRemove(productId),
        });
        checkFavorite();

        toast.info("Product has been deleted from favorites.");
      } else {
        await updateDoc(doc(db, "users", state.userReducer.user.uid), {
          favorites: arrayUnion(productId),
        });
        checkFavorite();

        toast.info("Product has been successfully added to favorites.");
      }
    } catch (error) {
      toast.error("e" + error.message);
    }
  };

  const onProductClick = () => {
    navigate("/product/"+productId);
  };

  async function checkFavorite() {
    try {
      const snapDoc = await getDoc(
        doc(db, "users", state.userReducer.user.uid)
      );
      const favoritesArray = snapDoc.data().favorites;
      const checkBool = _.includes(favoritesArray, productId);
      setCheckBool(checkBool);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <div className="lg:m-5 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
      <img
        className="rounded-3xl mx-auto p-3  object-cover h-60"
        src={`${imageUrl}`}
        alt={productName}
      />
      <div className="px-6 py-4">
        <p className="font-bold justify-center text-center text-3xl mb-2">
          {productName}
        </p>
        <p className="font-semibold justify-center text-center text-xl mb-2">
          {price} €/{quantityT ? "Kg" : "Piece"}
        </p>
      </div>
      <hr />
      <div className="flex justify-between items-center px-3 py-3">
        <button
          onClick={onFavoriteClick}
          className="mr-2 rounded-full text-white  py-3 px-3 bg-red-500 hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
        >
          <MdFavorite className="text-3xl" />
        </button>
        <button
          onClick={onProductClick}
          className="items-center flex justify-around rounded-2xl w-full md:w-[75%] text-white text-xl font-sans py-2 px-1 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 transition duration-200 ease-in-out"
        >
          <span className="ml-2  rounded-full bg-white py-2 px-2">
            <GrCart className="text-3xl" />
          </span>
          <p className="text-2xl md:text-2xl">GO TO PRODUCT</p>
        </button>
      </div>
    </div>
  );
}
