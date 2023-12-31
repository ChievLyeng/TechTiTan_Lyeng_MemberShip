import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { navigate } = useNavigate();
  //   const { dispatch } = useAuthContext();
  const PORT = 3000;

  const resetpassword = async (password,passwordConfirm,token) => {
    setIsLoading(true);
    setError(null);
   

    try {
      const url = `http://localhost:${PORT}/api/v1/users/resetPassword/${token}`;
      console.log('url',url)

      const response = await axios.patch(
        url,
        { password,passwordConfirm },
        { withCredentials: true }
      );

      if (response) {
        navigate('/checkemail')
      }
    } catch (err) {
      // Handle network or other errors;
      setIsLoading(false);
      setError(err.response ? err.response.data : "An error occurred"); // Set the error state with response data or a generic message
    }
  };

  return { resetpassword, isLoading, error };
};
