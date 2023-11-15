import { Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { WindowConfirm } from "./WindowConfirm";
import { FiHeart } from "react-icons/fi";

import { useShowToast } from "../hooks/useShowToast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FavoriteRecipeContext } from "../context/FavoriteRecipeContext";
import { FaHeart } from "react-icons/fa";

type FavRecipe = {
  recipe: {
    recipeId: number;
    title: string;
    image: string;
  };
};

export const FavoriteButton = ({ recipe }: FavRecipe) => {
  const showToast = useShowToast();
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getFavRecipesIdArr, deleteFavRecipe, addToFavorite } = useContext(
    FavoriteRecipeContext
  );
  const ifRecipeIsFavorite = getFavRecipesIdArr().includes(recipe.recipeId);

  const onClickFavIcon = () => {
    if (!user) {
      showToast("error", "Please sign in first!");
      return;
    }

    onOpen();
  };

  return (
    <>
      <IconButton
        isRound={true}
        outline={"none"}
        bg={ifRecipeIsFavorite ? "teal" : "transparent"}
        // bg={"transparent"}
        colorScheme="teal"
        aria-label="Done"
        fontSize="20px"
        icon={<Icon boxSize={5} as={ifRecipeIsFavorite ? FaHeart: FiHeart} color={"white"}></Icon>}
        position={"absolute"}
        top={{ base: "3px", md: "8px" }}
        right={{ base: "3px", md: "8px" }}
        onClick={onClickFavIcon}
      />

      <WindowConfirm
        isOpen={isOpen}
        onClose={onClose}
        confirmHandler={
          ifRecipeIsFavorite
            ? async () => {
                await deleteFavRecipe(recipe.recipeId);
                onClose();
              }
            : async () => {
                await addToFavorite(recipe);
                onClose();
              }
        }
        header={recipe.title}
        action={ifRecipeIsFavorite ? "remove from favorite" : "add to favorite"}
      />
    </>
  );
};
