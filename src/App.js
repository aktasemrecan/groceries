import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction, userDataAction } from "./actions";
import { db } from "./firebase";
import Favorites from "./pages/Favorites";
import MyCart from "./pages/MyCart";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const state = useSelector((state) => state);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userAction(user));
        dispatch(userDataAction(user.uid));
      } else {
        dispatch(userDataAction({}));
        dispatch(userAction());
      }
    });
  }, [state.userReducer.user]);

  const PrivateRoute = ({ children }) => {
    return auth.currentUser ? <Navigate to="/" /> : children;
  };
  const SecondPrivateRoute = ({ children }) => {
    return auth.currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/login"
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-shopping-cart"
            element={
              <SecondPrivateRoute>
                <MyCart />
              </SecondPrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <SecondPrivateRoute>
                <Favorites />
              </SecondPrivateRoute>
            }
          />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
