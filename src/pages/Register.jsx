import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const Register = () => {
  const [loading, isLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [unameError, setUnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setTermsError("You must accept terms and condition to sign up");
      return;
    }
    setTermsError(null);
    e.target.setAttribute("disabled", true);
    isLoading(true);

    setRegistrationSuccess(null);
    setUnameError(null);
    setEmailError(null);
    setPassError(null);

    const formEl = document.forms["registerForm"];
    const username = formEl["username"].value;
    const email = formEl["email"].value;
    const password = formEl["password"].value;
    const password_confirmation = formEl["password_confirmation"].value;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.api+json");
    myHeaders.append("Content-Type", "application/vnd.api+json");

    const data = JSON.stringify({
      username,
      email,
      password,
      password_confirmation,
    });

    const register = await fetch("/api/auth/register", {
      method: "POST",
      headers: myHeaders,
      body: data,
    });

    const response = await register.json();

    if (!response.errors) {
      setRegistrationSuccess(response.message);
      formEl["username"].value = "";
      formEl["email"].value = "";
      formEl["password"].value = "";
      formEl["password_confirmation"].value = "";
    } else {
      let errors = response.errors;
      if (errors.username) {
        setUnameError(errors.username[0]);
      }
      if (errors.email) {
        setEmailError(errors.email[0]);
      }
      if (errors.password) {
        setPassError(errors.password[0]);
      }
    }

    e.target.removeAttribute("disabled");
    isLoading(false);
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 dark:bg-gray-900 py-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-cyan-800 dark:text-sky-400"
          >
            TRAZE
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>

              {registrationSuccess && (
                <p className="text-xs text-green-500  p-1 text-center my-1 bg-gray-200 rounded">
                  {registrationSuccess}
                </p>
              )}

              <form
                className="space-y-4 md:space-y-6"
                action=""
                name="registerForm"
              >
                <div>
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                  />
                  {unameError && (
                    <p className="text-red-500 text-sm">{unameError}</p>
                  )}
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />

                  {passError && (
                    <p className="text-red-500 text-sm">{passError}</p>
                  )}
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                      onClick={() => {
                        setTermsAccepted(!termsAccepted);
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <Link
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        to="/terms-and-conditions"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                {termsError && (
                  <p className="text-red-500 text-xs">{termsError}</p>
                )}
                <button
                  type="submit"
                  className={
                    !loading
                      ? "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      : "w-full text-white bg-primary-300  focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-300 "
                  }
                  onClick={registerUser}
                >
                  {!loading ? (
                    "Create an account"
                  ) : (
                    <span className="material-symbols-outlined spinner">
                      progress_activity
                    </span>
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
