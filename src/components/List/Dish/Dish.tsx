import { Box, Flex, Text } from "@chakra-ui/react";
import { DishItem } from "./DishItem";
import { Link } from "../../Parts/Link";
import { FC } from "react";
import { DishType, Ingredient } from "./types";
import { DishItemContextProvider } from "../../../context/DishItemContext";
import { DishButtons } from "./DishButtons";

type DishProps = {
  dish: DishType;
};

export const Dish: FC<DishProps> = ({ dish }) => {
  const { ingredients } = dish;

  return (
    <Box>
      <Flex
        justify={"flex-start"}
        align={"center"}
        py={"10px"}
        columnGap={"20px"}
      >
        {/* Dish Title */}
        <Link to={`/recipe/${dish?.fields?.recipeId}`}>
          <Text
            fontSize="lg"
            as="b"
            color={"heading"}
            textDecoration={"underline"}
          >
            {dish?.fields?.dish}
          </Text>
        </Link>

        {/* Dish Buttons */}
        <Box>
          <DishButtons dish={dish} />
        </Box>
      </Flex>

      {/* Ingredients */}
      {ingredients?.map((ingredient: Ingredient, i: number) => {
        return (
          <DishItemContextProvider key={i} ingredient={ingredient} dish={dish}>
            <DishItem key={i}></DishItem>
          </DishItemContextProvider>
        );
      })}
    </Box>
  );
};
