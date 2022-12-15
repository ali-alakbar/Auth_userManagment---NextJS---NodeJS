import * as React from "react";
import { FiMenu } from "react-icons/fi";
import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import AuthContext from "../context/Context";
import { useColorMode } from "@chakra-ui/react";
import { IoSunny, IoMoon } from "react-icons/io5";
import Link from 'next/link'
import Signout from "./Signout";
const Simple = () => {
  const { loggedIn } = React.useContext(AuthContext);
  const [color, setColor] = React.useState(false);
  const { toggleColorMode } = useColorMode();
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Box
        position={"absolute"}
        top={6}
        right={7}
        zIndex={123}
        cursor="pointer"
        onClick={() => {
          toggleColorMode();
          setColor(!color);
        }}
      >
        {color ? <IoSunny /> : <IoMoon />}
      </Box>
      {loggedIn === true && (
        <Box
          position={"relative"}
          width="100%"
          as="section"
          pb={{
            base: "12",
            md: "2",
          }}
        >
          <Box
            as="nav"
            bg="bg-surface"
            boxShadow={useColorModeValue("sm", "sm-dark")}
          >
            <Container
              py={{
                base: "4",
                lg: "5",
              }}
            >
              <HStack spacing="10" justify="space-between">
                {isDesktop ? (
                  <Flex justify="space-between" flex="1">
                    <ButtonGroup variant="link" spacing="8">
                      <Link href={"/"}>Home</Link>
                      <Link href={"Users"}>Users</Link>
                    </ButtonGroup>
                    <HStack spacing="3">
                      <Signout />
                    </HStack>
                  </Flex>
                ) : (
                  <IconButton
                    variant="ghost"
                    icon={<FiMenu fontSize="1.25rem" />}
                    aria-label="Open Menu"
                  />
                )}
              </HStack>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Simple;
