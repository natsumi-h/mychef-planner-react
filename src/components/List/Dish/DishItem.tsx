import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

type DishItemProps = {
  ingredient: string;
  children: React.ReactNode;
};

export const DishItem: FC<DishItemProps> = ({ ingredient, children }) => {
  // console.log("DishItem Ingderdient: ", ingredient);

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
