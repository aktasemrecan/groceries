import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import HeaderNav from "./HeaderNav";
import { toast } from "react-toastify";

export default function Header() {
  const auth = getAuth();
  const state = useSelector((state) => state);

  const onClick = async () => {
    try {
      await auth.signOut();
      toast.info("user signed out");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="mt-4 mx-4 p-3 rounded-2xl bg-gray-800 border-gray-700">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <Link className="flex items-center" to="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-10"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Groceries
          </span>
        </Link>

        <div className="w-full md:block md:w-auto">
          <ul className="text-white flex space-x-2 items-center justify-end">
            <HeaderNav text="Home" path="/" />
            {!state.userReducer.user && (
              <>
                <HeaderNav text="Login" path="/login" />
                <HeaderNav text="Register" path="/register" />
              </>
            )}
            {state.userReducer.user && (
              <>
                <HeaderNav text="Favorites" path="/favorites" />
                <HeaderNav text="My Cart" path="/my-shopping-cart" />
                <li
                  onClick={onClick}
                  className="border-gray-600 border-solid border-2  rounded-xl px-2 py-1 text-lg cursor-pointer"
                >
                  Sign Out
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
