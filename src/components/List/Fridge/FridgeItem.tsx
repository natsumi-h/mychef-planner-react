import { Box, Divider, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { FridgeItemButtons } from "./FridgeItemButtons";
import { FridgeItemType } from "./types";

type FridgeItemProps = {
  item: FridgeItemType;
};

export const FridgeItem: FC<FridgeItemProps> = ({ item }) => {
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
