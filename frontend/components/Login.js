import { Box, Button, Heading, Input, TabPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import AuthContext from "../context/Context";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = React.useContext(AuthContext);
  const router = useRouter();
  const adding = async (e) => {
    e.preventDefault();
    // If successed, print "YES!", if not print err
    await axios
      .post("http://localhost:8080/auth/login", {
        email,
        password,
      })
      .then(async () => {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) inputs[i].value = "";
        await getLoggedIn();

        console.log("Logged in");
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  return (
    <TabPanel>
      <form onSubmit={adding}>
        {" "}
        <Heading mb={6}>Log In</Heading>
        <Input
          style={{ border: "solid 1px #9999994e" }}
          placeholder="Your Email..."
          variant={"filled"}
          mb={3}
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          style={{ border: "solid 1px #9999994e" }}
          placeholder="Your Password..."
          variant={"filled"}
          value={password}
          mb={3}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type={"submit"} colorScheme={"teal"}>
          Log In
        </Button>
      </form>
    </TabPanel>
  );
};

export default Login;
