import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { db } from "../firebase";

export default function ProductDetail() {
  const params = useParams();
  const [docData, setDocData] = useState();
  const [docId, setDocId] = useState();
  const [checkBool, setCheckBool] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const state = useSelector((state) => state);

  const fetchData = async () => {
    try {
      const documentResult = await getDoc(doc(db, "products", params.id));
      const docData = documentResult.data();
      setDocId(documentResult.id);
      setDocData(docData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onFavoriteClick = async () => {
    try {
      if (checkBool) {
        await updateDoc(doc(db, "users", state.userReducer.user.uid), {
          favorites: arrayRemove(docId),
        });
        checkFavorite();

        toast.info("Product has been deleted from favorites.");
      } else {
        await updateDoc(doc(db, "users", state.userReducer.user.uid), {
          favorites: arrayUnion(docId),
        });
        checkFavorite();

        toast.info("Product has been successfully added to favorites.");
      }
    } catch (error) {
      toast.error("e" + error.message);
    }
  };

  const checkFavorite = async () => {
    try {
      const snapDoc = await getDoc(
        doc(db, "users", state.userReducer.user.uid)
      );
      const favoritesArray = snapDoc.data().favorites;
      const checkBool = _.includes(favoritesArray, docId);
      setCheckBool(checkBool);
    } catch (error) {}
  };

  const checkShoppingCart = async () => {
    try {
      const snapDoc = await getDoc(
        doc(db, "users", state.userReducer.user.uid)
      );
      const shoppingCarts = snapDoc.data().shoppingCart;

      const selectedData = _.filter(shoppingCarts, {
        docId: docId,
        quantity: quantity,
      });

      if (selectedData.length === 0) {
        await updateDoc(doc(db, "users", state.userReducer.user.uid), {
          shoppingCart: arrayUnion({
            docId: docId,
            quantity: quantity,
            productName: docData.productName,
            quantityT: docData.quantityT,
            price: docData.price,
            discount: docData.discount,
          }),
        });

        toast.info("Product has been successfully added to shopping cart!");
      } else {
        await updateDoc(doc(db, "users", state.userReducer.user.uid), {
          shoppingCart: arrayRemove({
            docId: docId,
            quantity: quantity,
            productName: docData.productName,
            quantityT: docData.quantityT,
            price: docData.price,
            discount: docData.discount,
          }),
        });

        toast.info("Product has been deleted from shopping cart!");
      }
    } catch (error) {}
  };

  const addToCart = async () => {
    try {
      checkShoppingCart();
    } catch (error) {
      toast.error("Product is not added to shopping cart!");
    }
  };

  useEffect(() => {
    checkFavorite();
    fetchData();
  }, []);

  const renderedList = () => {
    return (
      <div className="flex m-10 mt-10">
        <div className="p-2 ml-10 border border-red-400 rounded-2xl w-[45%]">
          <img
            className="rounded-xl"
            src={docData.imageUrl}
            alt={docData.productName}
          />
        </div>
        <div className="justify-between productDetail font-semibold p-5 ml-10 border border-red-400 rounded-2xl w-[45%] text-2xl ">
          <div>
            <p>
              Product Name: <span>{docData.productName}</span>
            </p>
            <p>
              Price:{" "}
              <span>
                {docData.price} €/{docData.quantityT ? "Kg" : "Piece"}
              </span>
            </p>
            <p>
              Discount:{" "}
              <span>
                {docData.discount ? docData.discount + "%" : "No discount"}
              </span>
            </p>
            {docData.discount && (
              <p>
                Price with discount:{" "}
                <span>
                  {docData.price - (docData.discount * docData.price) / 100}
                  €/{docData.quantityT ? "Kg" : "Piece"}
                </span>
              </p>
            )}
            <div className="flex mt-24">
              <button
                onClick={onFavoriteClick}
                className="mr-2 rounded-full text-white  py-3 px-3 bg-red-500 hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
              >
                <MdFavorite className="text-3xl" />
              </button>
              <input
                type="number"
                required
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="rounded-tl-full rounded-bl-full w-[17%] border-2 px-3 text-red-400 bg-gray-200 border-blue-300"
              />
              <button
                onClick={addToCart}
                className="
                mr-2
                rounded-tr-full rounded-br-full
                text-white
                font-semibold
                py-3
                px-3
                bg-blue-400
                hover:bg-blue-500
                active:bg-blue-600
                transition
                duration-200
                ease-in-out"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section>
        <h1 className="mt-5 text-4xl font-semibold text-red-400 w-full justify-center text-center">
          Product Detail
        </h1>
      </section>
      {docData ? (
        renderedList()
      ) : (
        <div className="flex flex-col static h-96 w-full items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
}
