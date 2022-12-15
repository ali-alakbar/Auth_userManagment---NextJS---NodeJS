import {
  Button,
  Heading,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = () => {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    axios
      .get("http://localhost:8080/auth/all_users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsers();
  }, []);

  // ======================================================================
  // Getting the input as parameters and post them to the db
  const onUpdate = async (paraID, paraUser) => {
    await axios
      .post("http://localhost:8080/edit/add", {
        id: paraID,
        userData: paraUser,
      })
      .then((res) => {
        getUsers();
        console.log(res);
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
  // ======================================================================
  // Same procedure as onupdate funciton. Getting the id as a parameter, and set the other value to false, to remove fav user
  const onRemoveFav = async (paraID) => {
    await axios
      .post("http://localhost:8080/edit/remove", {
        id: paraID,
        userData: false,
      })
      .then((res) => {
        getUsers();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ======================================================================

  return (
    <section
      style={{
        height: "fit-content",
        display: "grid",
        alignContent: "center",
        padding: "50px",
      }}
    >
      <Stack mb={8} textAlign={"center"} className="heading-title">
        <Heading color={"teal"}>Users List</Heading>
        <Text>Add Users to the Favourite List</Text>
      </Stack>
      <TableContainer
        style={{
          border: "solid 1px #999",
          borderRadius: " 30px",
          paddingTop: "30px",
        }}
      >
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>ADD to Favourite</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    {item.userAdded === true ? (
                      <Button
                        onClick={() => onRemoveFav(item._id)}
                        colorScheme={"red"}
                        fontWeight={"light"}
                      >
                        Remove from favourite
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onUpdate(item._id, !item.isComplete)}
                        colorScheme={"blue"}
                        fontWeight={"light"}
                      >
                        Add to Favourite
                      </Button>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default index;
