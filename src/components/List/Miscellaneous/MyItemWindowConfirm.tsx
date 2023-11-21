import { FC, useContext, useState } from "react";
import { MyItemType } from "./types";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import { WindowConfirm } from "../../Parts/WindowConfirm";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  item: MyItemType;
  type: "fridge" | "delete";
};

export const MyItemWindowConfirm: FC<WindowConfirmProps> = ({
  isOpen,
  onClose,
  item,
  type,
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { clickTrashHandler, addToFridgeHandler } =
    useContext(MiscellaneousContext);

  const onClickHandler = async () => {
    setButtonLoading(true);
    if (type === "fridge") {
      await addToFridgeHandler(item);
    }
    if (type === "delete") {
      await clickTrashHandler(item);
    }
    setButtonLoading(false);
    onClose();
  };

  return (
    <WindowConfirm
      isOpen={isOpen}
      onClose={onClose}
      header={
        type === "fridge"
          ? `Add ${item.fields.ingredient} to Fridge`
          : `Delete ${item.fields.ingredient}`
      }
      buttonLoading={buttonLoading}
      buttonText={type === "fridge" ? "Add" : "Delete"}
      confirmHandler={onClickHandler}
      colorScheme="teal"
    ></WindowConfirm>
  );
};
