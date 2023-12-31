import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigate();
  //   const { dispatch } = useAuthContext();
  const PORT = 3000;

  const forgotpassword = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `http://localhost:${PORT}/api/v1/users/forgotpassword`;

      const response = await axios.post(
        url,
        { email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.status);
        navigate("/login");
      }
    } catch (err) {
      // Handle network or other errors;
      setIsLoading(false);
      setError(err.response ? err.response.data : "An error occurred"); // Set the error state with response data or a generic message
    }
  };

  return { forgotpassword, isLoading, error };
};
