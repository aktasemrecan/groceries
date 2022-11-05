import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebase";

export const fetchUserDataFromFs = async () => {
  try {
    const auth = getAuth();
    return (await getDoc(doc(db, "users", auth.currentUser.uid))).data();
  } catch (error) {
    toast.error("Fetch user data from firestore is problem" + error.message);
  }
};

// export const fetchFavoriteList = async () => {
//     return await getDoc(doc(db, "users", a.uid)).then(
//       (querySnapshot) => {
//         const favoriteList = querySnapshot.get("favorites");
//         return fetchFavoriteProducts(favoriteList);
//       }
//     );
//   };

//   const fetchFavoriteProducts = (favoriteList) => {
//     return favoriteList.map(async (favorite) => {
//       const docSnap = await getDoc(doc(db, "products", favorite));
//       return docSnap;
//     });
//   };