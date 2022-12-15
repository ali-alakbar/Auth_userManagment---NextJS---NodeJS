import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  useColorMode,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AuthContext from "../context/Context";
import { useRouter } from "next/navigation";
import { Router } from "next/dist/client/router";
const register = () => {
  const formBackGround = useColorModeValue("gray.100", "gray.700");
  const { loggedIn } = React.useContext(AuthContext);

  const router = useRouter();

  return (
    <Flex
      style={{ transition: "all ease-in-out 0.3s !important" }}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
  
      {loggedIn === false && (
        <>
          <Flex
            style={{ transition: "all ease-in-out 0.3s !important" }}
            direction={"column"}
            width="50%"
            background={formBackGround}
            p={12}
            rounded={6}
            position={"relative"}
            textAlign="center"
          >
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList display={"flex"} justifyContent="center">
                <Tab>Login</Tab>
                <Tab>Sign up</Tab>
              </TabList>
              <TabPanels>
                <Login />
                <Signup />
              </TabPanels>
            </Tabs>
          </Flex>
        </>
      )}

      {loggedIn === true && router.push("/")}
    </Flex>
  );
};

export default register;
