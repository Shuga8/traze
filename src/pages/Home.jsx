import React, { useEffect, useRef } from "react";
import { Navbar, Hero, Analysis, Subscribe, Footer } from "../components";
import * as THREE from "three";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Analysis />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
