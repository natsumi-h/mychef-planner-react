import { FC, useContext, useState } from "react";
import { FridgeContext } from "../../../context/FridgeContext";
import { MyItemType } from "../Miscellaneous/types";
import { WindowConfirm } from "../../Parts/WindowConfirm";

type FridgeWindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  item: MyItemType;
  type: "fridge" | "delete";
};

export const FridgeItemWindowConfirm: FC<FridgeWindowConfirmProps> = ({
  isOpen,
  onClose,
  item,
  type,
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const { clickTrashHandler } = useContext(FridgeContext);

  const onClickHandler = async () => {
    setButtonLoading(true);
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
      colorScheme={type === "fridge" ? "teal" : "red"}
    ></WindowConfirm>
  );
};
