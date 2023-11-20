import { Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FavoriteWindowConfirm } from "./FavoriteWindowConfirm";
import { FiHeart } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FavoriteRecipeContext } from "../../context/FavoriteRecipeContext";
import { FaHeart } from "react-icons/fa";
import { RecipeCardProps } from "../Parts/RecipeCard";

export const FavoriteButton = ({ recipe }: RecipeCardProps) => {
  const { user, setSignInMode } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favRecipes, deleteFavRecipe, addToFavorite } = useContext(
    FavoriteRecipeContext
  );
  const ifRecipeIsFavorite = favRecipes.some(
    (favRecipe) => favRecipe.fields.recipeId === recipe.id
  );

  const onClickFavIcon = () => {
    if (!user) {
      setSignInMode(true);
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
        colorScheme="teal"
        aria-label="Done"
        fontSize="20px"
        icon={
          <Icon
            boxSize={5}
            as={ifRecipeIsFavorite ? FaHeart : FiHeart}
            color={"white"}
          ></Icon>
        }
        position={"absolute"}
        top={{ base: "3px", md: "8px" }}
        right={{ base: "3px", md: "8px" }}
        onClick={onClickFavIcon}
      />

      <FavoriteWindowConfirm
        isOpen={isOpen}
        onClose={onClose}
        confirmHandler={
          ifRecipeIsFavorite && recipe.id
            ? async () => {
                await deleteFavRecipe(recipe.id);
                onClose();
              }
            : async () => {
                await addToFavorite(recipe);
                onClose();
              }
        }
        header={recipe.title}
        type={ifRecipeIsFavorite ? "remove" : "add"}
      />
    </>
  );
};
