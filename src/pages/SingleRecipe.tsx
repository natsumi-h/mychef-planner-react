import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  ListItem,
  OrderedList,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
// import { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { Signin } from "./Signin";
// import {
//   spoonacularRoot,
//   spoonacularApiKey,
//   airTableRoot,
//   airTableBaseId,
//   airTableApiKey,
// } from "../config/config.js";
// import { useShowToast } from "../hooks/useShowToast.js";
import { MainBox } from "../components/Layout/MainBox.js";
import { FiUsers } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import { FavoriteButton } from "../components/FavoriteButton.js";
import { useSingleRecipe } from "../hooks/useSingleRecipe.js";
import { AddToListbutton } from "../components/SingleRecipe/AddToListbutton.js";

// http://localhost:5173/recipe/639606

export const SingleRecipe = () => {
  const { recipe, isLoading, error } = useSingleRecipe();
  const {
    id,
    image,
    title,
    servings,
    readyInMinutes,
    extendedIngredients,
    instructions,
  } = recipe;
  const instructionsArr = instructions?.split(".").filter(function (item) {
    return item.trim() !== "";
  });

  return (
    <MainBox>
      {/* {signInMode && <Signin redirectTo={`/recipe/${id}`} />} */}
      {/* {!signInMode && ( */}
      <>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="lg"
            mx={"auto"}
            display={"block"}
            mt={"100px"}
          />
        ) : error ? (
          <Text textAlign={"center"} mt={"20px"}>
            Something went wrong! Please try again later.
          </Text>
        ) : (
          <Box maxW={"600px"} mx={"auto"}>
            <Box position={"relative"}>
              {image ? <Image src={image} w={"100%"} /> : <Text>No Image</Text>}

              <FavoriteButton
                recipe={{
                  recipeId: id,
                  title,
                  image,
                }}
              />
            </Box>

            {/* Title */}
            <Heading as={"h2"} size={"lg"} color="heading" my={"10px"}>
              {title}
            </Heading>

            <Flex alignItems={"center"} columnGap={"5px"}>
              <Icon as={FiUsers}></Icon>
              <Text>
                <Text as="b" display={"inline"} color={"heading"}>
                  {servings}
                </Text>{" "}
                Servings
              </Text>
              <Icon as={LuTimer}></Icon>
              <Text>
                <Text as="b" display={"inline"} color={"heading"}>
                  {readyInMinutes}
                </Text>{" "}
                Mins
              </Text>
            </Flex>

            {/* Ingredients */}
            <Heading as={"h3"} size={"md"} color="heading" my={"10px"}>
              Ingredients:
            </Heading>
            <UnorderedList>
              {extendedIngredients?.map((ingredient, i: number) => (
                <ListItem key={i}>{ingredient?.original}</ListItem>
              ))}
            </UnorderedList>

            <AddToListbutton />

            {/* Steps */}
            <Heading as={"h3"} size={"md"} color="heading" my={"10px"}>
              Steps:
            </Heading>

            <OrderedList>
              {instructionsArr?.map((step, i: number) => (
                <ListItem key={i}>{step}</ListItem>
              ))}
            </OrderedList>
          </Box>
        )}
      </>
      {/* )} */}
    </MainBox>
  );
};
