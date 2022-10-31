import { doc, getDoc } from "firebase/firestore";
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

