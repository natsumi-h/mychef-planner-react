import { Box, Flex, Text } from "@chakra-ui/react";
import { RecipeCard } from "./RecipeCard";
import { SkeltonCard } from "./SkeltonCard";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../../context/RecipeContext";

export const RecipeList = () => {
  const { error, recipes, loading, getRecipes } = useContext(RecipeContext);

  useEffect(() => {
    getRecipes("");
  }, []);

  return (
    <>
      {error ? (
        <Text textAlign={"center"} mt={"20px"}>
          Something went wrong! Please try again later.
        </Text>
      ) : (
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
              <RecipeCard key={recipe?.id} recipe={recipe} />
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
};
