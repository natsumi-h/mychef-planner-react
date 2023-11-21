import { FC, useContext, useState } from "react";
import { DishListContext } from "../../../context/DishListContext";
import { DishItemContext } from "../../../context/DishItemContext";
import { DishType } from "./types";
import { WindowConfirm } from "../../Parts/WindowConfirm";

type DishWindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "delete dish" | "delete item" | "fridge";
  dish?: DishType;
};

export const DishWindowConfirm: FC<DishWindowConfirmProps> = ({
  isOpen,
  onClose,
  type,
  dish,
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { handleDeleteDish, handleDeleteItem, handleAddToFridge } =
    useContext(DishListContext);
  const { ingredient, dish: itemDish } = useContext(DishItemContext);

  const confirmHandler = async () => {
    setButtonLoading(true);
    // Dish 削除
    if (type === "delete dish" && dish) {
      await handleDeleteDish(dish);
    }
    // アイテム削除
    if (type === "delete item") {
      await handleDeleteItem(itemDish, ingredient.ingredient);
    }
    // Add to Fridge
    if (type === "fridge") {
      await handleAddToFridge(itemDish, ingredient.ingredient);
    }
    setButtonLoading(false);
    onClose();
  };

  return (
    <WindowConfirm
      isOpen={isOpen}
      onClose={onClose}
      header={
        type === "delete dish"
          ? `Delete ${dish?.fields?.dish}`
          : type === "delete item"
          ? `Delete ${ingredient.ingredient}`
          : `Add ${ingredient.ingredient} to Fridge`
      }
      buttonLoading={buttonLoading}
      buttonText={type === "fridge" ? "Add" : "Delete"}
      confirmHandler={confirmHandler}
      colorScheme={type === "fridge" ? "teal" : "red"}
    ></WindowConfirm>
  );
};
