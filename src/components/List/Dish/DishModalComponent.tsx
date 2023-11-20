import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { DishListContext } from "../../../context/DishListContext";
import { ItemInputSchema, ItemInputType } from "../../../types/types";
import { DishItemContext } from "../../../context/DishItemContext";
import { DishType } from "./types";
import { Modal } from "../../Parts/Modal";

type DishModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "edit" | "create";
  dish?: DishType;
};

export const DishModalComponent = ({
  isOpen,
  onClose,
  type,
  dish,
}: DishModalProps) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { ingredient, dish: itemDish } = useContext(DishItemContext);

  const { clickCreateSaveHandler, clickEditSaveHandler } =
    useContext(DishListContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemInputType>({ resolver: yupResolver(ItemInputSchema) });

  const onSubmit: SubmitHandler<ItemInputType> = async (data) => {
    setButtonLoading(true);
    // アイテム編集
    if (type === "edit" && data.input) {
      await clickEditSaveHandler(data.input, itemDish, ingredient.ingredient);
    }
    // アイテム作成
    if (type === "create" && data.input && dish) {
      await clickCreateSaveHandler(data.input, dish);
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
      defaultValue={ingredient.ingredient}
    ></Modal>
  );
};
