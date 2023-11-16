import { Button, useDisclosure } from "@chakra-ui/react";
import { AddToListWindowConfirm } from "./AddToListWindowConfirm";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SingleRecipeContext } from "../../context/SingleRecipeContext";

export const AddToListbutton = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const { isRecipeInDishList } = useContext(SingleRecipeContext);

  const handleOnClick = () => {
    if (!user) {
      navigate("/signin");
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
        isDisabled={!user || isRecipeInDishList}
      >
        {isRecipeInDishList
          ? "Ingredients are in your shop list!"
          : "Save to my shop list"}
      </Button>

      <AddToListWindowConfirm isOpen={isOpen} onClose={onClose} />
    </>
  );
};
