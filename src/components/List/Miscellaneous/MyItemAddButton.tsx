import { Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { MyItemModal } from "./MyItemModal";

export const MyItemAddButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        isRound={true}
        outline={"none"}
        colorScheme="teal"
        aria-label="Add"
        fontSize="20px"
        icon={<Icon boxSize={3} as={FiPlus}></Icon>}
        onClick={onOpen}
      />

      <MyItemModal isOpen={isOpen} onClose={onClose} type="create" />
    </>
  );
};
