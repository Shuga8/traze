import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setEmailError(null);
    setPassError(null);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.api+json");
    myHeaders.append("Content-Type", "application/vnd.api+json");

    const data = JSON.stringify({
      email,
      password,
    });

    const loginUser = await fetch("/api/auth/login", {
      method: "POST",
      headers: myHeaders,
      body: data,
    });

    const response = await loginUser.json();

    if (!response.errors) {
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
    } else {
      let errors = response.errors;

      if (errors.email) {
        setEmailError(errors.email[0]);
      }
      if (errors.password) {
        setPassError(errors.password[0]);
      }
    }

    setLoading(false);
  };

  return {
    login,
    loading,
    emailError,
    passError,
    loginSuccess,
  };
};
