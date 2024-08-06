import React from "react";
import sub_img from "../../assets/update.png";
import { Button } from "@mui/material";

const Subscribe = () => {
  return (
    <div className="subscribe-cointainer w-full h-80 flex flex-row justify-center md:justify-normal mt-10 gap-4">
      <div>
        <form
          action="/subscribe"
          method="post"
          autoComplete="off"
          className="p-2 flex-"
        >
          <h3 className="text-2xl">
            Stay ahead in digital and cryptocurrency trends by subscribing to
            our newsletter.
          </h3>
          <p className="mt-4 text-xs ">
            Weekly newsletter to be recieved by the week's end to recieve
            updates in the cryptocurrency world. You are to recieve
            notifications of market stability, stable coin launch, currency
            derialings, best coins to trade in coming periods, and top level
            earning, withdrawals and bonus activity sections on this platform.
          </p>
          <div className="input-group mt-8 w-full flex flex-row gap-5">
            <input />
            <Button id="subscribe-btn" variant="contained" color="error">
              Subscribe
            </Button>
          </div>
        </form>
      </div>

      <div className="hidden md:block h-full">
        <img src={sub_img} alt="img" />
      </div>
    </div>
  );
};

export default Subscribe;
