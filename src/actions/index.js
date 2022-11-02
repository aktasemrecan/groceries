import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const userAction = (user) => {
    return {
        type: "USER",
        payload: user
    }
};


export const userDataAction = (userId)=> async(dispatch,getState)=>{
    const docSnap = await getDoc(doc(db,"users",userId));
    if(docSnap.exists){
        dispatch({
            type: "USER_DATA",
            payload: docSnap.data()
        })
    }
    else{
        dispatch({
            type: "USER_DATA",
            payload: "NO_DATA_FOUND_ACTION"
        })
    }
   
};


export const productsAction = () => async(dispatch,getState)=>{
    await getDocs(collection(db, "products")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if(newData.exists){
            dispatch({
                type: "FETCH_PRODUCTS",
                payload: newData
            });
        }
        else{
            dispatch({
                type:"FETCH_PRODUCTS",
                payload: "NO_DATA_ACTION"
            });
        }
    })}