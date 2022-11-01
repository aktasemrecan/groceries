import React, { useState } from "react";
import HeaderLabel from "../components/HeaderLabel";
import AddProductInput from "../components/AddProductInput";
import CredentialLabel from "../components/CredentialComponents/CredentialLabel";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function AddProduct() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantityT, setQuantityT] = useState(true);

  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await addDoc(collection(db, "products"), {
        productName: productName,
        price: price,
        quantityT: quantityT,
        imageUrl: imageUrl,
        discount: discount,
      });
      toast.info("Product is successfully added.");
      navigate("/");
    } catch (error) {
      toast.error(`Product is not created. ${error.message}`);
    }
  };

  return (
    <>
      <section>
        <HeaderLabel
          extraClass="text-3xl font-bold py-5 mb-3"
          text="Add a Product"
        />
      </section>
      <form className="container mx-auto w-[30%]" onSubmit={onSubmit}>
        <div className="container border-collapse border-2 rounded-2xl border-red-300 my-2 px-3 py-2">
          <AddProductInput
            text="Product Name"
            placeholder="Apple"
            value={productName}
            type="text"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <div className=" container border-collapse border-2 rounded-2xl border-red-300 my-2 px-3 py-2 w-[55%]">
            <CredentialLabel extraClass="text-2xl" text="Price" />
            <div className="flex items-center">
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                placeholder="7€"
                max="1000"
                className={`my-2 py-2 px-3 text-gray-800 bg-white border-gray-500 border-2 rounded-xl text-2xl mr-3 w-[70%]`}
              />
              <p className="text-2xl text-red-400 font-semibold">
                {price}€/{quantityT ? "Kg" : "Pieces"}
              </p>
            </div>
          </div>
          <div className="container border-collapse border-2 rounded-2xl border-red-300 my-2 px-2 py-2 w-[43%] items-center">
            <CredentialLabel extraClass="text-2xl" text="Quantity Type" />
            <div className="flex">
              <p className="text-xl font-arial text-red-600 mr-2">Kilograms</p>
              <input
                type="radio"
                id="kg"
                name="quantityT"
                onClick={() => setQuantityT(true)}
              />
            </div>
            <div className="flex">
              <p className="text-xl font-arial text-red-600 mr-2">Piece</p>
              <input
                type="radio"
                id="piece"
                name="quantityT"
                onClick={() => setQuantityT(false)}
              />
            </div>
          </div>
        </div>
        <div className="container border-collapse border-2 rounded-2xl border-red-300 my-2 px-2 py-2">
          <CredentialLabel extraClass="text-2xl" text="Discount (%)" />
          <div className="flex items-center">
            <AddProductInput
              labelShow={false}
              value={discount}
              placeholder="25%"
              type="number"
              extraClass="w-[25%] mr-3"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <p className="text-2xl text-red-400 font-semibold">
              {price - (price * discount) / 100}€
            </p>
          </div>
        </div>
        <div className="container border-collapse border-2 rounded-2xl border-red-300 my-2 px-3 py-2">
          <AddProductInput
            text="Image Url"
            placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXljqA-TVxM-AV_btLcUsIVmuaTVo1Tw4yOQ&usqp=CAU"
            value={imageUrl}
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button
          onClick={onClick}
          className="border-2 bg-red-400 hover:bg-red-500 active:bg-red-600 shadow-lg transition duration-200 ease-in-out py-2 px-2 mt-2 mb-2 text-orange-200 text-xl rounded-xl justify-center w-full"
        >
          ADD PRODUCT
        </button>
      </form>
    </>
  );
}
