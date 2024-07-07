import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Home, Login, Register } from "./pages";
import { Navbar } from "./components";
import ErrorPage from "./error-page";
import "./App.css";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route path="*" element={<ErrorPage />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
