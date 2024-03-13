import { useState } from "react";
import axios from "axios";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSuccess] = useState(false);

  const forgotpassword = async (email) => {
    // initail state
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = `https://techtitan-lyeng-membership.onrender.com/api/v1/users/forgotpassword`;

      const response = await axios.post(
        url,
        { email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsLoading(false);
        setSuccess(true);
      }
    } catch (err) {
      // Handle network or other errors;
      setIsLoading(false);
      setError(err.response ? err.response.data : "An error occurred"); // Set the error state with response data or a generic message
    }
  };

  return { forgotpassword, isLoading, succes, error };
};
