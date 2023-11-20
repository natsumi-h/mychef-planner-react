import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyItemType } from "./types";
import { FC, useContext, useState } from "react";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import { ItemInputSchema, ItemInputType } from "../../../types/types";
import { Modal } from "../../Parts/Modal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clickCreateSaveHandler?: (inputValue: string) => void;
  item?: MyItemType;
  type: "edit" | "create";
};

export const MyItemModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  item,
}) => {
  const { clickEditSaveHandler, clickCreateSaveHandler } =
    useContext(MiscellaneousContext);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
