import React from "react";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const productDetail = useSelector(
    (state) => state.productDetailReducer.product
  );

  return (
    <>
      <section>
        <h1 className="mt-5 text-4xl font-semibold text-red-400 w-full justify-center text-center">
          Product Detail
        </h1>
      </section>
      <div className="flex m-10 mt-10">
        <div className="p-2 ml-10 border border-red-400 rounded-2xl w-[45%]">
          <img
            className="rounded-xl"
            src={productDetail.imageUrl}
            alt={productDetail.productName}
          />
        </div>
        <div className="productDetail font-semibold p-5 justify-evenly  ml-10 border border-red-400 rounded-2xl w-[45%] text-2xl ">
          <p>
            Product Name: <span>{productDetail.productName}</span>
          </p>
          <p>
            Price: <span>{productDetail.price} €/{productDetail.quantityT ? "Kg": "Piece"}</span>
          </p>
          <p>
            Discount:{" "}
            <span>
              {productDetail.discount ? productDetail.discount+"%" : "No discount"}
            </span>
          </p>
          {productDetail.discount && <p>
            Price with discount:{" "}
            <span>
              {(productDetail.price -(productDetail.discount*productDetail.price/100))}
                €/{productDetail.quantityT ? "Kg": "Piece"}
            </span>
          </p>}
        </div>
        
      </div>
    </>
  );
}
