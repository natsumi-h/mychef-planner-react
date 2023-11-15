import { Flex } from "@chakra-ui/react";
import { MainBox } from "../components/Layout/MainBox";
import { Fridge } from "../components/List/Fridge/Fridge";
import { ListTabs } from "./Tabs";
import { FridgeContextProvider } from "../context/FridgeContext";

export const FridgePage = () => {
  return (
    <MainBox>
      <ListTabs />
      <Flex
        flexDirection={"column"}
        rowGap={"30px"}
        maxW={"600px"}
        mx={"auto"}
        mt={"20px"}
      >
        <FridgeContextProvider>
          <Fridge />
        </FridgeContextProvider>
      </Flex>
    </MainBox>
  );
};
