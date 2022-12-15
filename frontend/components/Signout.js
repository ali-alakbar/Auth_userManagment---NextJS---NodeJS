import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../context/Context";
const Signout = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    await axios.get("http://localhost:8080/auth/signout");
    await getLoggedIn();
    console.log("Signed out.");
    router.push("/register")
  };

  return (
    <Button onClick={logout} variant="primary">
      Sign out
    </Button>
  );
};

export default Signout;
