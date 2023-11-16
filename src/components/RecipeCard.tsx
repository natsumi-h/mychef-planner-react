import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "./Link";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardType } from "../types/types";

type RecipeCardProps = {
  recipe: RecipeCardType;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Box
      maxW="sm"
      w={{ base: "calc(50% - 15px / 2)", md: `calc(33.33333% - 30px * 2 / 3)` }}
      position={"relative"}
      _hover={{
        opacity: "0.8",
        transition: "0.3s",
      }}
    >
      <Link to={`/recipe/${recipe.id}`}>
        {recipe.image ? (
          <Image src={recipe.image} borderRadius="lg" alt={recipe.title} />
        ) : (
          <Flex
            bg={"gray.200"}
            borderRadius={"0.5rem"}
            alignItems={"center"}
            justify={"center"}
            aspectRatio={2 / 1.33}
          >
            <Text>No Image</Text>
          </Flex>
        )}

        <Heading mt={"4"} size="sm" noOfLines={2}>
          {recipe.title}
        </Heading>
      </Link>

      <FavoriteButton
        recipe={{
          recipeId: recipe.id,
          image: recipe.image,
          title: recipe.title,
        }}
      />
    </Box>
  );
};
