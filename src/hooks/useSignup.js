import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const domain = process.env.REACT_APP_DOMAIN;

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    
    try {
      const response = await axios.post(`${domain}/apis/user/signup`, {
        email,
        password,
      });
      const json = await response.data;
      if (response.status === 200) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        dispatch({ type: "LOGIN", payload: json });
        // update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { signup, isLoading, error };
};
