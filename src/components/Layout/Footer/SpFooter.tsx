import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { InnerBox } from "../InnerBox";
import { Link } from "../../Parts/Link";
import { FiHeart, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export const SpFooter = () => {
  const location = useLocation();
  const list =
    location.pathname.includes("/list") || location.pathname.includes("fridge");
  const favorite = location.pathname.includes("favorite");
  const others = !list && !favorite;

  return (
    <Box
      bg={"secondary"}
      h="60px"
      position={"fixed"}
      bottom={"0"}
      left={"0"}
      display={{ base: "block", md: "none" }}
      width={"100%"}
      zIndex={"sticky"}
    >
      <InnerBox>
        <Box maxW={"70%"} mx={"auto"} h="100%">
          <Flex
            justifyContent="space-between"
            gap="10px"
            alignItems="center"
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
        </Box>
      </InnerBox>
    </Box>
  );
};
