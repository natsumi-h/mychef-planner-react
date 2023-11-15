import { Flex, Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FC } from "react";
import { FridgeItemWindowConfirm } from "./FridgeItemWindowConfirm";
import { FridgeItemModal } from "./FridgeItemModal";
import { FridgeItemType } from "./types";


type MyItemButtonsProps = {
  item: FridgeItemType;
};

export const FridgeItemButtons: FC<MyItemButtonsProps> = ({ item }) => {
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
          aria-label="Edit"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiEdit}></Icon>}
          onClick={onOpenEdit}
        />
      </Flex>

      {/* Edit */}
      <FridgeItemModal
        item={item}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        type="edit"
      />

      {/* Delete */}
      <FridgeItemWindowConfirm
        isOpen={isOpenDeleteConfirm}
        onClose={onCloseDeleteConfirm}
        item={item}
        type="delete"
      />

    </>
  );
};
