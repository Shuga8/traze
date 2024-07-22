import React, { useEffect, useRef } from "react";
import { Navbar, Hero, Analysis } from "../components";
import * as THREE from "three";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Analysis />
    </>
  );
};

export default Home;
