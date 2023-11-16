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
// import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { DishListContext } from "../../../context/DishListContext";
import { DishType } from "./types";
import { ItemInputSchema, ItemInputType } from "../../../types/types";

type DishModalProps = {
  ingredient?: string;
  isOpen: boolean;
  onClose: () => void;
  type: "edit" | "create";
  dish: DishType;
  setIngredientsArr?: React.Dispatch<React.SetStateAction<string[]>>;
};

// const ItemInputSchema = yup.object({
//   input: yup
//     .string()
//     .min(3, "Minimum 3 characters are required.")
//     .max(20, "The value can't be more than 20 characters.")
//     .required("This field is required."),
// });

// type ItemInputType = yup.InferType<typeof ItemInputSchema>;

export const DishModalComponent = ({
  ingredient,
  isOpen,
  onClose,
  dish,
  type,
  setIngredientsArr,
}: DishModalProps) => {
  // const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

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
    if (type === "edit" && data.input && ingredient) {
      await clickEditSaveHandler(data.input, dish, ingredient);
      setIngredientsArr &&
        setIngredientsArr((prev) =>
          prev.map((i) => {
            if (i === ingredient) {
              return data.input;
            }
            return i;
          })
        );
    }
    // アイテム作成
    if (type === "create" && data.input) {
      await clickCreateSaveHandler(data.input, dish);
      setIngredientsArr && setIngredientsArr((prev) => [data.input, ...prev]);
    }
    setButtonLoading(false);
    onClose();
    reset({ input: "" });
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
              defaultValue={ingredient}
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
