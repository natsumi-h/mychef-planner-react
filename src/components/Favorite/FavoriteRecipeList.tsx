import { SkeltonCard } from "../SkeltonCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import { RecipeCard } from "../RecipeCard";
import { useContext, useEffect } from "react";
import { FavoriteRecipeContext } from "../../context/FavoriteRecipeContext";

export const FavoriteRecipeList = () => {
  const { error, recipes, loading, getFavRecipes, favUpdated, setFavUpdated } =
    useContext(FavoriteRecipeContext);

  useEffect(() => {
    getFavRecipes();
    setFavUpdated(false);
  }, [favUpdated]);

  return (
    <>
      {error ? (
        <Text textAlign={"center"} mt={"20px"}>
          Something went wrong! Please try again later.
        </Text>
      ) : loading || recipes.length !== 0 ? (
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
            {recipes?.map((recipe) => (
              <RecipeCard
                key={recipe?.recipeId}
                recipe={{
                  id: recipe?.recipeId,
                  title: recipe?.title,
                  image: recipe?.image,
                }}
              />
            ))}
          </Flex>
        </Box>
      ) : recipes.length === 0 ? (
        <Text textAlign={"center"} mt={"20px"}>
          You have no favorite recipes yet!
        </Text>
      ) : null}
    </>
  );
};
