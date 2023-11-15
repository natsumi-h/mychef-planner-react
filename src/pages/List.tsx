import { Miscellaneous } from "../components/List/Miscellaneous/Miscellaneous";
import { MainBox } from "../components/Layout/MainBox";
import { ListTabs } from "./Tabs";
import { Flex } from "@chakra-ui/react";
import { MiscellaneousContextProvider } from "../context/MiscellaneousContext";
import { DishListContextProvider } from "../context/DishListContext";
import { DishList } from "../components/List/Dish/DishList";

export const List = () => {
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
        <MiscellaneousContextProvider>
          <Miscellaneous />
        </MiscellaneousContextProvider>

        <DishListContextProvider>
          <DishList />
        </DishListContextProvider>
      </Flex>
    </MainBox>
  );
};
