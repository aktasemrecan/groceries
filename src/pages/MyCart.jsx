import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { fetchUserDataFromFs } from "../services";
import Loading from "../components/Loading";
import { MdFavorite } from "react-icons/md";
import { useDispatch } from "react-redux";
import { sumTotalAction } from "../actions";

export default function MyCart() {
  const auth = getAuth();
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  const getUserData = async () => {
    const doc = await fetchUserDataFromFs();
    setUserData(doc);
  };

  useEffect(() => {
    if (auth.currentUser) {
      getUserData();
    }
  }, [auth.currentUser]);

  const sumTotal = (product) => {
    // const newSum = (
    //   (product.price -(product.price * product.discount) / 100) *product.quantity);
    // dispatch(sumTotalAction(newSum));
  };

  const dataRow = () => {
    return userData.shoppingCart.map((product, index) => {
      sumTotal(product);
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
              onClick={() => {}}
              className="mr-2 rounded-xl text-white  py-3 px-3   bg-red-500 hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
            >
              <MdFavorite className="text-lg" />
            </button>
            <button
              onClick={() => {}}
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
              <th scope="col" className="py-3 px-6 text-center">
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
                {} Euro
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
