import { Box, Flex, Heading, Icon, IconButton, Spacer } from "@chakra-ui/react";
import { InnerBox } from "../InnerBox";
import { FiHeart, FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link } from "../../Link";
import { UserIcon } from "./UserIcon";
import { useLocation } from "react-router-dom";
import { FaUtensils } from "react-icons/fa6";

export const PcHeader = () => {
  const location = useLocation();
  const list = location.pathname.includes("/list");
  const favorite = location.pathname.includes("favorite");
  const others = !list && !favorite;

  return (
    <Box
      bg={"secondary"}
      w="100%"
      h="60px"
      display={{ base: "none", md: "block" }}
      position={"fixed"}
      top={"0"}
      left={"0"}
      width={"100%"}
      zIndex={"sticky"}
    >
      <InnerBox>
        <Flex h="100%" alignItems={"center"} columnGap={"20px"}>
          <Link to="/">
            <Flex alignItems={"center"} columnGap={"5px"}>
              <Icon as={FaUtensils} />
              <Heading as="h1" size="sm" color={"heading"}>
                My Chef Planner
              </Heading>
            </Flex>
          </Link>

          <Spacer />

          <Flex
            justifyContent="space-between"
            gap="10px"
            align="center"
            h="100%"
          >
            <Link to="/">
              <IconButton
                isRound={true}
                outline={"none"}
                bg={others ? "teal" : "transparent"}
                colorScheme="teal"
                aria-label="List"
                fontSize="20px"
                icon={<Icon boxSize={4} as={FiSearch}></Icon>}
                color={others ? "white" : "text"}
                _hover={{
                  color: "white",
                  bg: "teal",
                }}
              />
            </Link>

            <Link to="/favorite">
              <IconButton
                isRound={true}
                outline={"none"}
                bg={favorite ? "teal" : "transparent"}
                colorScheme="teal"
                aria-label="List"
                fontSize="20px"
                icon={<Icon boxSize={4} as={FiHeart}></Icon>}
                color={favorite ? "white" : "text"}
                _hover={{
                  color: "white",
                  bg: "teal",
                }}
              />
            </Link>

            <Link to="/list">
              <IconButton
                isRound={true}
                outline={"none"}
                bg={list ? "teal" : "transparent"}
                colorScheme="teal"
                aria-label="List"
                fontSize="20px"
                icon={<Icon boxSize={4} as={FiShoppingCart}></Icon>}
                color={list ? "white" : "text"}
                _hover={{
                  color: "white",
                  bg: "teal",
                }}
              />
            </Link>
          </Flex>

          <UserIcon />
        </Flex>
      </InnerBox>
    </Box>
  );
};
