import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useContext, useState } from "react";
import { FridgeContext } from "../../../context/FridgeContext";
import { FridgeItemType } from "./types";
import { ItemInputSchema, ItemInputType } from "../../../types/types";
import { Modal } from "../../Parts/Modal";

type FridgeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clickCreateSaveHandler?: (inputValue: string) => void;
  item?: FridgeItemType;
  type: "edit" | "create";
};

export const FridgeItemModal: FC<FridgeModalProps> = ({
  isOpen,
  onClose,
  type,
  item,
}) => {
  const { clickEditSaveHandler, clickCreateSaveHandler } =
    useContext(FridgeContext);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemInputType>({ resolver: yupResolver(ItemInputSchema) });

  const onSubmit: SubmitHandler<ItemInputType> = async (data) => {
    setButtonLoading(true);
    if (data.input && item && type === "edit") {
      await clickEditSaveHandler(data.input, item);
    }
    if (data.input && type === "create") {
      await clickCreateSaveHandler(data.input);
      reset({ input: "" });
    }
    setButtonLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      type={type}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      buttonLoading={buttonLoading}
      register={register}
      defaultValue={type === "edit" && item ? item?.fields?.ingredient : ""}
    ></Modal>
  );
};
