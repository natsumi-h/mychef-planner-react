import { Box, Flex, Text } from "@chakra-ui/react";
import { RecipeCard } from "../Parts/RecipeCard";
import { SkeltonCard } from "../Parts/SkeltonCard";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";

export const RecipeList = () => {
  const { error, recipes, loading } = useContext(RecipeContext);

  return (
    <>
      {error ? (
        <Text textAlign={"center"} mt={"20px"}>
          Something went wrong! Please try again later.
        </Text>
      ) : loading || recipes?.length !== 0 ? (
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
      ) : (
        recipes?.length === 0 && (
          <Text textAlign={"center"} mt={"20px"}>
            No results found!
          </Text>
        )
      )}
    </>
  );
};
