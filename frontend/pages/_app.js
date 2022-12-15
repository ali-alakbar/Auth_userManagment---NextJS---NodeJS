import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { AuthContextProvider } from "../context/Context";
import axios from "axios";
axios.defaults.withCredentials = true;
function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <NavBar />

        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
