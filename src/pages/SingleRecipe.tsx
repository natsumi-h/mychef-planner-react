import {
  Box,
  Button,
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
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Signin } from "./Signin";
import {
  spoonacularRoot,
  spoonacularApiKey,
  airTableRoot,
  airTableBaseId,
  airTableApiKey,
} from "../config/config.js";
import { useShowToast } from "../hooks/useShowToast.js";
import { MainBox } from "../components/Layout/MainBox.js";
import { FiUsers } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import { FavoriteButton } from "../components/FavoriteButton.js";

type Recipe = {
  id: number;
  image: string;
  title: string;
  servings?: number;
  readyInMinutes?: number;
  extendedIngredients: {
    name: string;
    original: string;
  }[];
  instructions: string;
};

export const SingleRecipe = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const pathId = pathParts[pathParts.length - 1];
  const { user } = useContext(AuthContext);
  const [signIn, setSignIn] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setSignIn(false);
    }
    getRecipe();
  }, [user]);

  const showToast = useShowToast();

  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    image: "",
    title: "",
    servings: 0,
    readyInMinutes: 0,
    extendedIngredients: [],
    instructions: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const getRecipe = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch(
        `${spoonacularRoot}recipes/${pathId}/information?apiKey=${spoonacularApiKey}&includeNutrition=false`
      );
      if (!res.ok) {
        setError("Something went wrong!");
        return;
      }
      const data = await res.json();

      setRecipe(data);
    } catch (err: unknown) {
      console.log(err);
      setError("Somwthing went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // http://localhost:5173/recipe/639606

  const postShoppingList = async () => {
    const ingredientNamesStr = extendedIngredients
      .map((ingredient) => ingredient.name)
      .join(", ");
    try {
      await fetch(`${airTableRoot}${airTableBaseId}/Item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
        body: JSON.stringify({
          fields: {
            recipeId: pathId,
            ingredients: ingredientNamesStr,
            userId: user?.uid,
            dish: title,
          },
        }),
      });
      // const data = await res.json();
      showToast("success", "Item added to your shopping list!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveIngredients = async () => {
    if (!user) {
      setSignIn(true);
      return;
    }

    await postShoppingList();
  };

  return (
    <MainBox>
      {signIn && <Signin redirectTo={`/recipe/${id}`} />}
      {!signIn && (
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
                {image ? (
                  <Image src={image} w={"100%"} />
                ) : (
                  <Text>No Image</Text>
                )}

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
                {extendedIngredients?.map((ingredient) => (
                  <ListItem>{ingredient?.original}</ListItem>
                ))}
              </UnorderedList>

              <Button
                colorScheme="teal"
                size="xs"
                onClick={handleSaveIngredients}
                mt={"10px"}
              >
                Save to my shopping list
              </Button>

              {/* Steps */}
              <Heading as={"h3"} size={"md"} color="heading" my={"10px"}>
                Steps:
              </Heading>

              <OrderedList>
                {instructionsArr?.map((step) => (
                  <ListItem>{step}</ListItem>
                ))}
              </OrderedList>
            </Box>
          )}
        </>
      )}
    </MainBox>
  );
};
