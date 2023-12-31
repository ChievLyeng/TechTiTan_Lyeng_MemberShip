import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate()
  const PORT = 3000;

  const signup = async (username, email, password, passwordConfirm) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `http://localhost:${PORT}/api/v1/users/register`;

      const response = await axios.post(url, { username, email, password, passwordConfirm }, { withCredentials: true });

      if (response) {
        // Request was successful
        // localStorage.setItem("user", JSON.stringify(response.data));
        // dispatch({ type: "LOGIN", payload: response.data });
        navigate('/checkemail')
      }
    } catch (err) {
      // Handle network or other errors;
      setIsLoading(false);
      setError(err.response ? err.response.data : "An error occurred"); // Set the error state with response data or a generic message
    }
  };

  return { signup, isLoading, error };   

};
