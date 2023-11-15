import { Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useFormContext } from "react-hook-form";
// import { Splide, SplideSlide } from "@splidejs/react-splide";

export const FilterButtons = () => {
  const { getRecipes } = useContext(RecipeContext);
  const filterArr = [
    "all",
    "asian",
    "chinese",
    "japanese",
    "korean",
    "pasta",
    "dessert",
  ];

  const { reset } = useFormContext();

  return (
    <Flex
      gap="20px"
      px={{ base: 0, md: "20px" }}
      py={"20px"}
      justifyContent={{ base: "start", md: "center" }}
      overflowX={{base:"auto", md:"unset"}}
      flexWrap={{base:"nowrap", md:"wrap"}}
    >
      {/* <Box mt={"20px"}> */}
      {/* <Splide
        aria-label="お気に入りの写真"
        options={{
          pagination: false,
          autoWidth: true,
          type: "slide",
          // arrrows: true,
          gap: "20px",
          // padding: 20,
        }}
      > */}
      {filterArr.map((filter) => (
        // <SplideSlide key={filter}>
        <Button
          flexShrink={0}
          key={filter}
          size="sm"
          rounded={"full"}
          color={"text"}
          bg={"secondary"}
          _hover={{
            opacity: 0.8,
            transition: "all 0.2s ease-in-out",
          }}
          onClick={() => {
            reset();
            getRecipes(filter === "all" ? "" : filter);
          }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Button>
        // </SplideSlide>
      ))}

      {/* </Splide> */}
      {/* </Box> */}
    </Flex>
  );
};
//
