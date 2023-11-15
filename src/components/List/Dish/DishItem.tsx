import { Box, Divider, Flex } from "@chakra-ui/react";
// import { DishItemButtons } from "./DishItemButtons";
// import { DishType } from "./types";
import React, { FC } from "react";

type DishItemProps = {
  ingredient: string;
  children: React.ReactNode;
};

export const DishItem: FC<DishItemProps> = ({
  ingredient,
  children,
}) => {
  return (
    <Box>
      <Flex justify={"space-between"} alignItems={"center"} py={"10px"}>
        <Box>{ingredient}</Box>
        {children}
      </Flex>
      <Divider />
    </Box>
  );
};
