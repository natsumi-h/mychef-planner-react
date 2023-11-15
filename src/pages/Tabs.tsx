import { Button, Flex } from "@chakra-ui/react";
import { Link } from "../components/Link";
import { useLocation } from "react-router-dom";

export const ListTabs = () => {
  const location = useLocation();
  const list = location.pathname.includes("list");
  const fridge = location.pathname.includes("fridge");

  return (
    <Flex
      gap="20px"
      //   px={{ base: 0, md: "20px" }}
    //   py={"20px"}
      justifyContent={"start"}
      maxW={"600px"}
      mx={"auto"}
    >
      <Button
        flexShrink={0}
        size="sm"
        rounded={"full"}
        color={"text"}
        bg={list ? "secondary" : "transparent"}
        _hover={{
          bg: "secondary",
          opacity: 0.8,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Link to="/list">Shop List</Link>
      </Button>
      <Button
        flexShrink={0}
        size="sm"
        rounded={"full"}
        color={"text"}
        bg={fridge ? "secondary" : "transparent"}
        _hover={{
          bg: "secondary",
          opacity: 0.8,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Link to="/fridge">In the Fridge</Link>
      </Button>
    </Flex>
  );
};
