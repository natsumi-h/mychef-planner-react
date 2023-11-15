import { Box, Divider, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { FridgeItemButtons } from "./FridgeItemButtons";
import { MyItemType } from "../Miscellaneous/types";

type MyItemProps = {
  item: MyItemType;
};

export const FridgeItem: FC<MyItemProps> = ({ item }) => {
  return (
    <Box>
      <Flex justify={"space-between"} alignItems={"center"} py={"10px"}>
        <Box>{item.fields.ingredient}</Box>

        <FridgeItemButtons item={item} />
      </Flex>
      <Divider />
    </Box>
  );
};
