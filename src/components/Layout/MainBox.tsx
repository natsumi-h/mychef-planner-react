import { Box } from "@chakra-ui/react";
import { ReactChildren } from "../../types/types";

export const MainBox = ({ children }: ReactChildren) => {
  return (
    <Box my={"60px"} py={"30px"}>
      {children}
    </Box>
  );
};
