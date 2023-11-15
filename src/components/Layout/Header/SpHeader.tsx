import { Box, Flex, Heading, Icon, Spacer } from "@chakra-ui/react";
import { InnerBox } from "../InnerBox";

import { Link } from "../../Link";
import { UserIcon } from "./UserIcon";
import { FaUtensils } from "react-icons/fa6";

export const SpHeader = () => {
  return (
    <Box
      bg={"secondary"}
      w="100%"
      h="60px"
      display={{ base: "block", md: "none" }}
      position={"fixed"}
      top={"0"}
      left={"0"}
      width={"100%"}
      zIndex={"sticky"}
    >
      <InnerBox>
        <Flex h="100%" alignItems={"center"}>
          <Link to="/">
            <Flex alignItems={"center"} columnGap={"5px"}>
              <Icon as={FaUtensils} />
              <Heading as="h1" size="sm" color={"heading"}>
                My Chef Planner
              </Heading>
            </Flex>
          </Link>
          <Spacer />

          <UserIcon />
        </Flex>
      </InnerBox>
    </Box>
  );
};
