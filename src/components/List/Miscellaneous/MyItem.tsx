import { Box, Divider, Flex } from "@chakra-ui/react";
import { MyItemButtons } from "./MyItemButtons";
import { MyItemType } from "./types";
import { FC } from "react";


type MyItemProps = {
  item: MyItemType;
};

export const MyItem: FC<MyItemProps> = ({ item }) => {
  return (
    <Box>
      <Flex justify={"space-between"} alignItems={"center"} py={"10px"}>
        <Box>{item.fields.ingredient}</Box>

        <MyItemButtons
          item={item}
        />
      </Flex>
      <Divider />
    </Box>
  );
};
