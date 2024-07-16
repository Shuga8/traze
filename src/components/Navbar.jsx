import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { TrazzerContext } from "../context/TrazzerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [isToggle, setToggleMenu] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [walletAddress, setWalletAddress] = useState(null);
  const { connectWallet, checkIfWalletIsConnected } =
    useContext(TrazzerContext);

  const location = useLocation();

  useEffect(() => {
    const checkWalletConnection = async () => {
      const address = await checkIfWalletIsConnected();
      if (address) {
        setWalletAddress(address);
      }
    };

    checkWalletConnection();
  }, [checkIfWalletIsConnected]);

  const connect = async () => {
    const address = await checkIfWalletIsConnected();
    if (address) {
      setWalletAddress(address);
      console.table(address);
      return;
    }
    const newAddress = await connectWallet();
    setWalletAddress(newAddress);
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <nav className="border-gray-200 dark:bg-gray-900 bg-opacity-65 bg-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-cyan-800 dark:text-gray-400">
            TZ
          </span>
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden text-cyan-800 dark:text-sky-400"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setToggleMenu(!isToggle)}
        >
          {isToggle ? (
            <RiCloseLine
              className="text-cyan-800 dark:text-sky-400"
              size={27}
            />
          ) : (
            <RiMenu3Line
              className="text-cyan-800 dark:text-sky-400"
              size={27}
            />
          )}
        </button>

        <div
          className={
            isToggle
              ? "block w-full md:block md:w-auto"
              : "hidden w-full md:block md:w-auto"
          }
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 items-center justify-normal">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 m-2 md:m-0 text-white rounded ${
                  location.pathname == "/"
                    ? "md:bg-gray-500 bg-opacity-30 md:hover:bg-opacity-35"
                    : ""
                }  md:border-0`}
              >
                Home
              </Link>
            </li>

            {user ? (
              <>
                <Link
                  to="/logout"
                  className={`block py-2 px-3 m-2 md:m-0 text-white rounded ${
                    location.pathname == "/logout"
                      ? "md:bg-gray-500 bg-opacity-30 md:hover:bg-opacity-35"
                      : ""
                  }  md:border-0`}
                  onClick={logoutUser}
                >
                  Logout
                </Link>

                <Button
                  variant="contained"
                  type="button"
                  color="success"
                  className="connect-wallet-btn"
                  onClick={connect}
                >
                  {walletAddress
                    ? walletAddress.slice(0, 6) +
                      "..." +
                      walletAddress.slice(-4)
                    : "Connect"}
                </Button>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`block py-2 px-3 m-2 md:m-0 text-white rounded ${
                      location.pathname == "/login"
                        ? "md:bg-gray-500 bg-opacity-30 md:hover:bg-opacity-35"
                        : ""
                    }  md:border-0`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`block py-2 px-3 m-2 md:m-0 text-white rounded ${
                      location.pathname == "/register"
                        ? "md:bg-gray-500 bg-opacity-30 md:hover:bg-opacity-35"
                        : ""
                    }  md:border-0`}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
