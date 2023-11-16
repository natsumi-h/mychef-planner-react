import { SkeltonCard } from "../Parts/SkeltonCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import { RecipeCard } from "../Parts/RecipeCard";
import { useContext } from "react";
import { FavoriteRecipeContext } from "../../context/FavoriteRecipeContext";

export const FavoriteRecipeList = () => {
  const { error, favRecipes, loading } = useContext(FavoriteRecipeContext);

  return (
    <>
      {error ? (
        <Text textAlign={"center"} mt={"20px"}>
          Something went wrong! Please try again later.
        </Text>
      ) : loading || favRecipes.length !== 0 ? (
        <Box mt="20px">
          <Flex
            gap={{ base: "15px", md: "30px" }}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
          >
            {loading && (
              <>
                {Array.from({ length: 6 }, (_, index) => (
                  <SkeltonCard key={index} />
                ))}
              </>
            )}
            {favRecipes?.map((favRecipe) => (
              <RecipeCard
                key={favRecipe.id}
                recipe={{
                  id: favRecipe.fields.recipeId,
                  title: favRecipe.fields.title,
                  image: favRecipe.fields.image,
                }}
              />
            ))}
          </Flex>
        </Box>
      ) : favRecipes?.length === 0 ? (
        <Text textAlign={"center"} mt={"20px"}>
          You have no favorite recipes yet!
        </Text>
      ) : null}
    </>
  );
};
