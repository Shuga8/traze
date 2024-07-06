import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Navbar } from "./components";
import ErrorPage from "./error-page";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
