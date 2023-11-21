import { Box, Flex } from "@chakra-ui/react";
import { InnerBox } from "./InnerBox";
import { Outlet } from "react-router-dom";
import { PcHeader } from "./Header/PcHeader";
import { SpHeader } from "./Header/SpHeader";
import { PcFooter } from "./Footer/PcFooter";
import { SpFooter } from "./Footer/SpFooter";

export const Layout = () => {
  return (
    <Flex flexDirection="column" minH={"100vh"} position={"relative"}>
      {/* PC Header */}
      <PcHeader />

      {/* SP Header */}
      <SpHeader />

      {/* Body */}
      <Box flexGrow={"1"}>
        <InnerBox>
          <Outlet />
        </InnerBox>
      </Box>

      {/* PC Footer（固定なし） */}
      <PcFooter />

      {/* Mobile Footer （固定）*/}
      <SpFooter />
    </Flex>
  );
};
