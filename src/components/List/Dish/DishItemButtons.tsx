import { Flex, Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiCheck, FiEdit, FiTrash } from "react-icons/fi";
import { DishModalComponent } from "./DishModalComponent";
import { DishWindowConfirm } from "./DishWindowConfirm";
import { useContext } from "react";
import { DishItemContext } from "../../../context/DishItemContext";

export const DishItemButtons = () => {
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
  const { ingredient } = useContext(DishItemContext);

  return (
    <>
      {/* Trash Item */}
      <Flex columnGap={"10px"} opacity={ingredient.isInFridge ? "0.8" : "1"}>
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
          isDisabled={ingredient.isInFridge}
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
        isOpen={isOpen}
        onClose={onClose}
        type="edit"
      />

      {/* Trash Item WindowConfirm */}
      <DishWindowConfirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        type="delete item"
      />

      {/* Add to fridge WindowConfirm */}
      <DishWindowConfirm
        isOpen={isOpenFridgeConfirm}
        onClose={onCloseFridgeConfirm}
        type="fridge"
      />
    </>
  );
};
