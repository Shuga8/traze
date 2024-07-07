import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { user, dispatch } = useAuthContext();

  const logout = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.api+json");
    myHeaders.append("Content-Type", "application/vnd.api+json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const logoutUser = await fetch("/api/auth/logout", {
      headers: myHeaders,
      method: "POST",
    });

    const response = await logoutUser.json();

    if (response.data.success) {
      localStorage.removeItem("user");

      dispatch({ type: "LOGOUT" });

      console.log("token deleted");
    } else {
      localStorage.removeItem("user");

      dispatch({ type: "LOGOUT" });

      console.log("Token not found");
    }
  };

  return { logout };
};
