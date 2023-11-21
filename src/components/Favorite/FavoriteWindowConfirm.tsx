import { useState } from "react";
import { WindowConfirm } from "../Parts/WindowConfirm";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  confirmHandler: () => void;
  type: "add" | "remove";
};

export const FavoriteWindowConfirm = ({
  type,
  isOpen,
  onClose,
  header,
  confirmHandler,
}: WindowConfirmProps) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleOnClick = async () => {
    setButtonLoading(true);
    await confirmHandler();
    setButtonLoading(false);
  };

  return (
    <WindowConfirm
      isOpen={isOpen}
      onClose={onClose}
      header={
        type === "remove"
          ? `Remove ${header} from favorite`
          : `Add ${header} to favorite`
      }
      buttonLoading={buttonLoading}
      buttonText={type === "remove" ? "Remove" : "Add"}
      confirmHandler={handleOnClick}
      colorScheme={type === "remove" ? "red" : "teal"}
    ></WindowConfirm>
  );
};
