import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Home, Login, Register, ForgotPassword } from "./pages";
import { Navbar } from "./components";
import ErrorPage from "./error-page";
import "./App.css";

function App() {
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    async function doAuthTest() {
      if (!user) return;
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/vnd.api+json");
      myHeaders.append("Content-Type", "application/vnd.api+json");
      myHeaders.append("Authorization", `Bearer ${user.token}`);

      const checkAuth = await fetch("/api/testAuth", {
        method: "GET",
        headers: myHeaders,
      });

      const response = await checkAuth.json();

      if (response.message === "Unauthenticated.") {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
    }

    doAuthTest();
  }, []);

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
            <Route
              path="/forgot-password"
              element={!user ? <ForgotPassword /> : <Navigate to="/" />}
            />
            <Route path="*" element={<ErrorPage />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
