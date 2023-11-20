import { Box, Divider, Flex, Tag } from "@chakra-ui/react";
import { useContext } from "react";
import { DishItemButtons } from "./DishItemButtons";
import { DishItemContext } from "../../../context/DishItemContext";

export const DishItem = () => {
  const { ingredient } = useContext(DishItemContext);

  return (
    <Box>
      <Flex justify={"space-between"} alignItems={"center"} py={"10px"}>
        <Flex alignItems={"center"}>
          <Box opacity={ingredient.isInFridge ? "0.8" : "1"}>
            {ingredient.ingredient}
          </Box>
          <Tag
            ml={"10px"}
            rounded={"full"}
            size={"sm"}
            colorScheme={"teal"}
            variant="solid"
            visibility={ingredient.isInFridge ? "visible" : "hidden"}
          >
            In your fridge!
          </Tag>
        </Flex>

        <DishItemButtons />
      </Flex>
      <Divider />
    </Box>
  );
};
