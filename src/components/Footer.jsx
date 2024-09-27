import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Footer = () => {
  const { user } = useAuthContext();
  return (
    <footer className="footer">
      <div className="">
        <h2 className="text-2xl">TRAZE</h2>
        <div>
          Enjoy extreme profits on the best binary trading platform with the
          best rates and starter packs whether for beginners or expert
          traders.Best platform integrated with metamask, for seamless
          transactions!
        </div>
      </div>

      <div className="">
        <h3 className="text-xl">Company</h3>

        <ul>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <Link to="/register">Dashboard</Link>
            </>
          )}

          <li>
            <Link to="/login">Contact</Link>
          </li>
          <li>
            <Link to="/register">About</Link>
          </li>
        </ul>
      </div>

      <div className="">
        <h3 className="text-xl">Socials</h3>

        <ul>
            <li>
                <link></link>
            </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
