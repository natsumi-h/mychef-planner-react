import { Box } from "@chakra-ui/react";
import { ReactChildren } from "../../types/types";

export const InnerBox = ({ children }: ReactChildren) => {
  return (
    <Box maxW="900px" h="100%" mx="auto" px={{ base: "15px", md: "none" }}>
      {children}
    </Box>
  );
};
