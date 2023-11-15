import { Flex, Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiCheck, FiEdit, FiTrash } from "react-icons/fi";
import { MyItemModal } from "./MyItemModal";
import { MyItemWindowConfirm } from "./MyItemWindowConfirm";
import { FC } from "react";
import { MyItemType } from "./types";

type MyItemButtonsProps = {
  item: MyItemType;
};

export const MyItemButtons: FC<MyItemButtonsProps> = ({ item }) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteConfirm,
    onOpen: onOpenDeleteConfirm,
    onClose: onCloseDeleteConfirm,
  } = useDisclosure();

  const {
    isOpen: isOpenFridgeConfirm,
    onOpen: onOpenFridgeConfirm,
    onClose: onCloseFridgeConfirm,
  } = useDisclosure();

  return (
    <>
      <Flex columnGap={"10px"}>
        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Delete"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiTrash}></Icon>}
          onClick={onOpenDeleteConfirm}
        />

        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Add to Fridge"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiCheck}></Icon>}
          onClick={onOpenFridgeConfirm}
        />

        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Edit"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiEdit}></Icon>}
          onClick={onOpenEdit}
        />
      </Flex>

      {/* Edit */}
      <MyItemModal
        item={item}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        type="edit"
      />

      {/* Delete */}
      <MyItemWindowConfirm
        isOpen={isOpenDeleteConfirm}
        onClose={onCloseDeleteConfirm}
        item={item}
        type="delete"
      />

      {/* To Fridge */}
      <MyItemWindowConfirm
        isOpen={isOpenFridgeConfirm}
        onClose={onCloseFridgeConfirm}
        item={item}
        type="fridge"
      />
    </>
  );
};
