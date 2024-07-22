import { Button } from "@mui/material";
import React, { useRef } from "react";
import { icon_1, icon_2, icon_3, icon_4 } from "../../assets";
import { Link } from "react-router-dom";

const Hero = () => {
  const linkRef = useRef(null);
  const goto_signup = () => {
    linkRef.current.click();
  };
  return (
    <>
      <section
        className="bg-opacity-65 bg-gray-700 min-w-full  text-white"
        id="hero-section"
      >
        <div className="text-area">
          <h1>TRAZE</h1>
          <p>
            Enjoy extreme profits on the best binary trading platform with the
            best rates and starter packs whether for beginners or expert
            traders.
          </p>
          <p>
            Best platform integrated with metamask, for seamless transactions!
          </p>

          <Button
            variant="contained"
            type="button"
            color="error"
            onClick={goto_signup}
          >
            Get Started
          </Button>
          <Link to="/register" ref={linkRef} className="hidden">
            Register
          </Link>
        </div>
        <div className="icons-animation-area">
          <img src={icon_1} alt="icon-1" />
          <img src={icon_2} alt="icon-2" />
          <img src={icon_3} alt="icon-3" />
          <img src={icon_4} alt="icon-4" />
        </div>
      </section>
    </>
  );
};

export default Hero;
