import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { DishListContext } from "../../../context/DishListContext";
import { ItemInputSchema, ItemInputType } from "../../../types/types";
import { DishItemContext } from "../../../context/DishItemContext";
import { DishType } from "./types";

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
  // const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);
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
      // initialFocusRef={initialRef}
      // finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === "edit"
            ? "Edit ingredient"
            : type === "create"
            ? "Add ingredient"
            : ""}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={errors.input ? true : false}>
            <Input
              placeholder="Tomato"
              defaultValue={ingredient.ingredient}
              {...register("input")}
            />
            <FormErrorMessage>{errors?.input?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit(onSubmit)}
            isLoading={buttonLoading}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
