import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "edit" | "create";
  errors?: FieldErrors<{
    input: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      input: string;
    },
    undefined
  >;
  onSubmit: SubmitHandler<{
    input: string;
  }>;
  buttonLoading: boolean;
  register: UseFormRegister<{
    input: string;
  }>;
  defaultValue: string;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  errors,
  handleSubmit,
  onSubmit,
  buttonLoading,
  register,
  defaultValue,
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
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
          <FormControl isInvalid={errors?.input ? true : false}>
            <Input
              placeholder="Tomato"
              defaultValue={defaultValue}
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
    </ChakraModal>
  );
};
