import { Box, Flex, Text } from "@chakra-ui/react";
import { DishItem } from "./DishItem";
import { Link } from "../../Parts/Link";
import { DishButtons } from "./DishButtons";
import { FC, useState } from "react";
import { DishType } from "./types";
import { DishItemContextProvider } from "../../../context/DishItemContext";

type DishProps = {
  dish: DishType;
};

export const Dish: FC<DishProps> = ({ dish }) => {
  const [ingredientsArr, setIngredientsArr] = useState<string[]>(
    dish?.fields?.ingredients?.split(", ")
  );

  return (
    <>
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
            <DishButtons dish={dish} setIngredientsArr={setIngredientsArr} />
          </Box>
        </Flex>

        {/* Ingredients */}
        {ingredientsArr?.map((ingredient: string, i: number) => {
          return (
            <DishItemContextProvider ingredient={ingredient} dish={dish}>
              <DishItem
                key={i}
                setIngredientsArr={setIngredientsArr}
              >
              </DishItem>
            </DishItemContextProvider>
          );
        })}
      </Box>
    </>
  );
};
