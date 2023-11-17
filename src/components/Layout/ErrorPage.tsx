import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";
import { PcHeader } from "./Header/PcHeader";
import { SpHeader } from "./Header/SpHeader";
import { InnerBox } from "./InnerBox";
import { PcFooter } from "./Footer/PcFooter";
import { SpFooter } from "./Footer/SpFooter";
import { MainBox } from "./MainBox";

type ErrorType = {
  statusText: string;
  message: string;
};

export const ErrorPage = () => {
  const error = useRouteError() as ErrorType | undefined | null;

  console.error(error);

  return (
    <Flex flexDirection="column" minH={"100vh"} position={"relative"}>
      {/* PC Header */}
      <PcHeader />

      {/* SP Header */}
      <SpHeader />

      {/* Body */}
      <Box flexGrow={"1"}>
        <InnerBox>
          <MainBox>
            <Center mt={"100px"}>
              <Box textAlign={"center"}>
                <Heading>Oops!</Heading>
                <Text>Sorry, an unexpected error has occurred.</Text>
                <Text>
                  <i>{error?.statusText || error?.message}</i>
                </Text>
              </Box>
            </Center>
          </MainBox>
        </InnerBox>
      </Box>

      {/* PC Footer（固定なし） */}
      <PcFooter />

      {/* Mobile Footer （固定）*/}
      <SpFooter />
    </Flex>
  );
};
