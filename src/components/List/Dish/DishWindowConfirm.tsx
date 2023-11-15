import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { DishListContext } from "../../../context/DishListContext";
import { DishType } from "./types";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "delete dish" | "delete item" | "fridge";
  dish: DishType;
  ingredient?: string;
  setIngredientsArr?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DishWindowConfirm: FC<WindowConfirmProps> = ({
  isOpen,
  onClose,
  dish,
  type,
  ingredient,
  setIngredientsArr,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { handleDeleteDish, handleDeleteItem, handleAddToFridge } =
    useContext(DishListContext);

  const confirmHandler = async () => {
    setButtonLoading(true);
    if (type === "delete dish") {
      await handleDeleteDish(dish);
    }
    // アイテム削除
    if (type === "delete item" && ingredient) {
      await handleDeleteItem(dish, ingredient);
      setIngredientsArr &&
        setIngredientsArr((prev) => prev.filter((i) => i !== ingredient));
    }
    // Add to Fridge
    if (type === "fridge" && ingredient) {
      await handleAddToFridge(dish, ingredient);
      setIngredientsArr &&
        setIngredientsArr((prev) => prev.filter((i) => i !== ingredient));
    }
    setButtonLoading(false);
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {type === "delete dish"
              ? `Delete ${dish?.fields?.dish}`
              : type === "delete item"
              ? `Delete ${ingredient}`
              : `Add ${ingredient} to Fridge`}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={buttonLoading}
              colorScheme={type === "fridge" ? "teal" : "red"}
              onClick={confirmHandler}
              ml={3}
            >
              {type === "fridge" ? "Add" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
