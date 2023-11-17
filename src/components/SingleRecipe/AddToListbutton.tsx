import { Button, useDisclosure } from "@chakra-ui/react";
import { AddToListWindowConfirm } from "./AddToListWindowConfirm";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { SingleRecipeContext } from "../../context/SingleRecipeContext";

export const AddToListbutton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const { isRecipeInDishList } = useContext(SingleRecipeContext);
  const { setSignInMode } = useContext(AuthContext);

  const handleOnClick = () => {
    if (!user) {
      setSignInMode(true);
      return;
    }
    onOpen();
  };

  return (
    <>
      <Button
        colorScheme="teal"
        size="xs"
        onClick={handleOnClick}
        mt={"10px"}
        isDisabled={isRecipeInDishList}
      >
        {isRecipeInDishList
          ? "Ingredients are in your shop list!"
          : "Save to my shop list"}
      </Button>

      <AddToListWindowConfirm isOpen={isOpen} onClose={onClose} />
    </>
  );
};
