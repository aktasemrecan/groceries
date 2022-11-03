import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDoc, doc, arrayUnion, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  const state = useSelector((state) => state);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [docId, setDocId] = useState([]);

  const fetchProducts = async () => {
    await getDoc(doc(db, "users", state.userReducer.user.uid)).then(
      (querySnapshot) => {
        const favoriteList = querySnapshot.get("favorites");
        catchProducts(favoriteList);
      }
    );
  };

  const catchProducts = (favoriteList) => {
    favoriteList.map(async (favorite) => {
      const docSnap = await getDoc(doc(db, "products", favorite));
      setFavoriteProducts((oldArray) => [...oldArray, docSnap.data()]);
      setDocId((oldArray) => [...oldArray, docSnap.id]);
    });
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      toast.error(error.message);
    }
  }, [state.userReducer.user]);

  const renderedList = () => {
    return favoriteProducts.map((doc, i) => (
      <ProductCard
        key={i}
        productId={docId[i]}
        productName={doc.productName}
        price={doc.price}
        imageUrl={doc.imageUrl}
        quantityT={doc.quantityT}
      />
    ));
  };

  return <div>{favoriteProducts ? renderedList() : "Loading..."}</div>;
}
