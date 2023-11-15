import { Flex, Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiCheck, FiEdit, FiTrash } from "react-icons/fi";
import { DishModalComponent } from "./DishModalComponent";
import { DishWindowConfirm } from "./DishWindowConfirm";
import { FC } from "react";
import { DishType } from "./types";

type ItemButtonsProps = {
  ingredient: string;
  dish: DishType;
  setIngredientsArr: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DishItemButtons: FC<ItemButtonsProps> = ({
  ingredient,
  dish,
  setIngredientsArr,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const {
    isOpen: isOpenFridgeConfirm,
    onOpen: onOpenFridgeConfirm,
    onClose: onCloseFridgeConfirm,
  } = useDisclosure();

  return (
    <>
      {/* Trash Item */}
      <Flex columnGap={"10px"}>
        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Add"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiTrash}></Icon>}
          onClick={onOpenConfirm}
        />

        {/* Add to Fridge */}
        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Add"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiCheck}></Icon>}
          onClick={onOpenFridgeConfirm}
        />

        {/* Edit */}
        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Edit"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiEdit}></Icon>}
          onClick={onOpen}
        />
      </Flex>

      {/* Edit Item Modal*/}
      <DishModalComponent
        ingredient={ingredient}
        isOpen={isOpen}
        onClose={onClose}
        type="edit"
        dish={dish}
        setIngredientsArr={setIngredientsArr}
      />

      {/* Trash Item WindowConfirm */}
      <DishWindowConfirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        dish={dish}
        type="delete item"
        ingredient={ingredient}
        setIngredientsArr={setIngredientsArr}
      />

      {/* Add to feidge WindowConfirm */}
      <DishWindowConfirm
        isOpen={isOpenFridgeConfirm}
        onClose={onCloseFridgeConfirm}
        dish={dish}
        type="fridge"
        ingredient={ingredient}
        setIngredientsArr={setIngredientsArr}
      />
    </>
  );
};
