import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";
import { InnerBox } from "../InnerBox";
import { Link } from "../../Link";

export const PcFooter = () => {
  return (
    <Box
      bg={"secondary"}
      px={"50px"}
      py={"10px"}
      h={"70px"}
      display={{ base: "none", md: "block" }}
    >
      <InnerBox>
        {/* <Center h="100%"> */}
        <Flex columnGap={"15px"} justify={"center"} align={"center"} h={"100%"}>
          <Link to="https://github.com/natsumi-h" target="_blank">
            <IconButton
              isRound={true}
              outline={"none"}
              bg={"teal"}
              colorScheme="teal"
              aria-label="List"
              fontSize="20px"
              icon={<Icon boxSize={4} as={FiGithub} color={"white"}></Icon>}
            />
          </Link>

          <Link
            to="https://www.linkedin.com/in/natsumi-hori-51970594/"
            target="_blank"
          >
            <IconButton
              isRound={true}
              outline={"none"}
              bg={"teal"}
              colorScheme="teal"
              aria-label="List"
              fontSize="20px"
              icon={<Icon boxSize={4} as={FiLinkedin} color={"white"}></Icon>}
            />
          </Link>

          <Link
            to="https://www.notion.so/natsumih/Natsumi-H-s-Portfolio-b60b2867b5aa4ebea9c7cdee04d628c1"
            target="_blank"
          >
            <IconButton
              isRound={true}
              outline={"none"}
              bg={"teal"}
              colorScheme="teal"
              aria-label="List"
              fontSize="20px"
              icon={<Icon boxSize={4} as={FiGlobe} color={"white"}></Icon>}
            />
          </Link>
        </Flex>
        {/* </Center> */}
      </InnerBox>
    </Box>
  );
};
