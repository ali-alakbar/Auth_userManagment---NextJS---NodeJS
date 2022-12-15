import React, { useState } from "react";
import { Box, Button, Heading, Input, TabPanel } from "@chakra-ui/react";
import axios from "axios";
import AuthContext from "../context/Context";
import { useRouter } from "next/navigation";




const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const { getLoggedIn } = React.useContext(AuthContext);
  const router = useRouter();

  const adding = async (e) => {
    e.preventDefault();
    // If successed, print "Signed up!", if not print thes below types of error
    await axios
      .post("http://localhost:8080/auth/signup", {
        email,
        name,
        password,
        passwordVerify,
      })
      .then(async () => {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) inputs[i].value = "";
        await getLoggedIn();
        console.log("Signed up");
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
        <Heading mb={6}>Sign up</Heading>
        <Input
          style={{ border: "solid 1px #9999994e" }}
          placeholder="Your Email..."
          variant={"filled"}
          value={email}
          mb={3}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          style={{ border: "solid 1px #9999994e" }}
          placeholder="Your Name..."
          variant={"filled"}
          value={name}
          mb={3}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          style={{ border: "solid 1px #9999994e" }}
          placeholder="Your Password..."
          variant={"filled"}
          mb={3}
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          style={{ border: "solid 1px #9999994e" }}
          placeholder="Your Password Again..."
          variant={"filled"}
          value={passwordVerify}
          mb={3}
          type="password"
          onChange={(e) => setPasswordVerify(e.target.value)}
        />
        <Button type={"submit"} colorScheme={"teal"}>
          Register
        </Button>
      </form>
    </TabPanel>
  );
};

export default Signup;
