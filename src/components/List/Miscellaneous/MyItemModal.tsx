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
import { MyItemType } from "./types";
import { FC, useContext, useState } from "react";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import { ItemInputSchema, ItemInputType } from "../../../types/types";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clickCreateSaveHandler?: (inputValue: string) => void;
  item?: MyItemType;
  type: "edit" | "create";
};

// const ItemInputSchema = yup.object({
//   input: yup
//     .string()
//     .min(3, "Minimum 3 characters are required.")
//     .max(20, "The value can't be more than 20 characters.")
//     .required("This field is required."),
// });

// type ItemInputType = yup.InferType<typeof ItemInputSchema>;

export const MyItemModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  item,
  type,
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
    <Modal isOpen={isOpen} onClose={onClose}>
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
              defaultValue={type === "edit" ? item?.fields?.ingredient : ""}
              {...register("input")}
            />
            <FormErrorMessage>{errors?.input?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
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
