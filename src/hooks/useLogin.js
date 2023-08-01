import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

     const response = await axios.post(
       "https://glorious-mite-waistcoat.cyclic.cloud/apis/user/login",
       { email, password }
     );

     console.log({responsefromlogin: response.data})

     const json = await response.data;
     
;

    if (response.status !== 200) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.status === 200) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
