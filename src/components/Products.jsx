import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [snapData, setSnapData] = useState();

  const fetchData = async () => {
    try {
      await getDocs(collection(db, "products")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSnapData(newData);
      });
    } catch (error) {
      toast.error(`Products are not successfully downloaded. ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedList = () => {
    return snapData.map((doc, i) => (
      <ProductCard
        key={i}
        productId={doc.id}
        productName={doc.productName}
        price={doc.price}
        imageUrl={doc.imageUrl}
        quantityT={doc.quantityT}
      />
    ));
  };

  return (
    <div className="m-5 grid  grid-cols-1 gap-1   md:grid-cols-3 md:gap-3  ">
      {snapData ? renderedList() : "Loading..."}
    </div>
  );
}
