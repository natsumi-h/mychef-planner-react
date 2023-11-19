import { Box, Divider, Flex, Tag } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { DishItemButtons } from "./DishItemButtons";
import { DishItemContext } from "../../../context/DishItemContext";

type DishItemProps = {
  setIngredientsArr: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DishItem: FC<DishItemProps> = ({ setIngredientsArr }) => {
  const { isInFridge, ingredient } = useContext(DishItemContext);

  return (
    <Box>
      <Flex justify={"space-between"} alignItems={"center"} py={"10px"}>
        <Flex alignItems={"center"}>
          <Box opacity={isInFridge ? "0.8" : "1"}>{ingredient}</Box>
          <Tag
            ml={"10px"}
            rounded={"full"}
            size={"sm"}
            colorScheme={"teal"}
            variant="solid"
            visibility={isInFridge ? "visible" : "hidden"}
          >
            In your fridge!
          </Tag>
        </Flex>

        <DishItemButtons setIngredientsArr={setIngredientsArr} />
      </Flex>
      <Divider />
    </Box>
  );
};
