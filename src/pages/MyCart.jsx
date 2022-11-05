import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { fetchUserDataFromFs } from "../services";
import Loading from "../components/Loading";
import { MdFavorite } from "react-icons/md";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import _ from "lodash";
import { db } from "../firebase";

export default function MyCart() {
  const auth = getAuth();
  const [userData, setUserData] = useState();
  const [checkBool, setCheckBool] = useState(false);
  const [sumTotally, setSumTotally] = useState(0);

  const getUserData = async () => {
    const doc = await fetchUserDataFromFs();
    setUserData(doc);
  };

  useEffect(() => {
    if (auth.currentUser) {
      getUserData();
      sumTotal();
    }
  }, [auth.currentUser]);

  const onFavoriteClick = async (productId) => {
    try {
      if (checkBool) {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          favorites: arrayRemove(productId),
        });
        checkFavorite(productId);

        toast.info("Product has been deleted from favorites.");
      } else {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          favorites: arrayUnion(productId),
        });
        checkFavorite(productId);

        toast.info("Product has been successfully added to favorites.");
      }
    } catch (error) {
      toast.error("e" + error.message);
    }
  };

  const checkFavorite = async (productId) => {
    const snapDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const favoritesArray = snapDoc.data().favorites;
    const checkBool = _.includes(favoritesArray, productId);
    setCheckBool(checkBool);
  };
  const deleteFromCart = async (
    docId,
    quantity,
    productName,
    quantityT,
    price,
    discount
  ) => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      shoppingCart: arrayRemove({
        docId: docId,
        quantity: quantity,
        productName: productName,
        quantityT: quantityT,
        price: price,
        discount: discount,
      }),
    });
    // I tried to delete data from array to show updated list.
    // const newArray =_.pull(shoppingCartData,{
    //   docId: docId,
    //   quantity: quantity,
    //   productName: productName,
    //   quantityT: quantityT,
    //   price: price,
    //   discount: discount,
    // });
    toast.info("Product has been deleted from shopping cart!");
  };

  const sumTotal = async () => {
    let sumNumber = 0;
    const userData = await fetchUserDataFromFs();
    userData.shoppingCart.forEach((productData) => {
      const sum =
        productData.quantity *
        (productData.price - (productData.price * productData.discount) / 100);
      sumNumber = sumNumber + sum;
    });
    setSumTotally(sumNumber);
  };

  const dataRow = () => {
    return userData.shoppingCart.map((product, index) => {
      return (
        <tr
          key={index}
          className={` border-b  border-gray-700 ${
            index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
          }`}
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-lg text-white whitespace-nowrap "
          >
            {product.productName}
          </th>
          <td className="py-4 px-6 text-lg text-center">
            {product.quantity}{" "}
            {product.quantityT
              ? "Kg"
              : product.quantity !== 0
              ? "Pieces"
              : "Piece"}
          </td>
          <td className="py-4 px-6 text-lg text-center">
            {(
              (product.price - (product.price * product.discount) / 100) *
              product.quantity
            ).toFixed(2)}{" "}
            €
          </td>

          <td className="py-4 px-6 items-center justify-center text-center">
            <button
              onClick={() => onFavoriteClick(product.docId)}
              className="mr-2 rounded-xl text-white  py-3 px-3   bg-red-500 hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
            >
              <MdFavorite className="text-lg" />
            </button>
            <button
              onClick={() =>
                deleteFromCart(
                  product.docId,
                  product.quantity,
                  product.productName,
                  product.quantityT,
                  product.price,
                  product.discount
                )
              }
              className="
              
              rounded-xl
              text-white
              font-semibold
              py-3
              px-3
              bg-blue-400
              hover:bg-blue-500
              active:bg-blue-600
              transition
              duration-200
              ease-in-out
              
              "
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderedList = () => {
    return (
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white ">
          <thead className="text-xl  uppercase bg-gray-900 text-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                Product Name
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Quantity
              </th>
              <th scope="col" className="py-3 px-3 text-center">
                Price
              </th>
              <th
                scope="col"
                className="py-3 px-3 justify-center items-center text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>{dataRow()}</tbody>
          <tfoot>
            <tr className="text-xl  uppercase bg-gray-900 text-gray-300">
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6 text-center"></th>
              <th scope="col" className="py-3 px-6 text-center">
                Total Price :
              </th>
              <th
                scope="col"
                className="py-3 px-3 justify-center items-center text-center"
              >
                {/* SHOW THE TOTAL SUM */}
                {sumTotally && sumTotally} Euro
                <button
                  onClick={() => {}}
                  className="
                  ml-5
              rounded-xl
              text-white
              font-semibold
              py-2
              px-2
              bg-blue-400
              hover:bg-blue-500
              active:bg-blue-600
              transition
              duration-200
              ease-in-out
              
              "
                >
                  PURCHASE
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return (
    <div className="mx-44 mt-8 ">
      {userData ? (
        renderedList()
      ) : (
        <div className="flex flex-col static h-96 w-full items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
