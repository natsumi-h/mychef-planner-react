import { useContext, useState } from "react";
import { SingleRecipeContext } from "../../context/SingleRecipeContext";
import { WindowConfirm } from "../Parts/WindowConfirm";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddToListWindowConfirm = ({
  isOpen,
  onClose,
}: WindowConfirmProps) => {
  const { handleSaveIngredients } = useContext(SingleRecipeContext);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const confirmHandler = async () => {
    setButtonLoading(true);
    await handleSaveIngredients();
    setButtonLoading(false);
    onClose();
  };

  return (
    <WindowConfirm
      isOpen={isOpen}
      onClose={onClose}
      header="Add ingredients to my shopping list"
      buttonLoading={buttonLoading}
      buttonText="Add"
      confirmHandler={confirmHandler}
      colorScheme="teal"
    ></WindowConfirm>
  );
};
