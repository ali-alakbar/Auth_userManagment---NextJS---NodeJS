import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  // Getting the cookies token and send it to our parent component as a props
  // The main idea is check if the token is validated, then signed in.
  const getLoggedIn = async () => {
    await axios
      .get("http://localhost:8080/auth/loggedIn")
      .then((res) => {
        setLoggedIn(res.data);
      })
      .catch((err) => console.log("err"));
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export { AuthContextProvider };
