/* This component is to handle the favourite users */

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

const Users = () => {
  const [users, setUsers] = useState([]);
  // Getting the users from the db
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
        <Heading color={"teal"}>Favourite Users</Heading>
        <Text>Here're the Favourite Users</Text>
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
              <Th>Favourite Users</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* Apply only the users with userAdded ture, meaning, fav users only */}
            {users.map((item, index) => {
              return item.userAdded === true ? (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                </Tr>
              ) : (
                <Tr key={index}>
                  <Td> --- </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Users;
