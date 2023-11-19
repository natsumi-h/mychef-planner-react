import { Flex, Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { DishModalComponent } from "./DishModalComponent";
import { DishWindowConfirm } from "./DishWindowConfirm";
import { DishType } from "./types";
import { FC } from "react";

type DishButtonsProps = {
  dish: DishType;
  // setIngredientsArr?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DishButtons: FC<DishButtonsProps> = ({
  // setIngredientsArr,
  dish,
}) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();


  return (
    <>
      <Flex columnGap={"10px"}>
        {/* Add Item */}
        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Add"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiPlus}></Icon>}
          onClick={onOpenModal}
        />

        {/* Delete Dish */}
        <IconButton
          isRound={true}
          outline={"none"}
          colorScheme="teal"
          aria-label="Delete"
          fontSize="20px"
          icon={<Icon boxSize={3} as={FiTrash}></Icon>}
          onClick={onOpenConfirm}
        />
      </Flex>

      {/* Dish Create Modal */}
      <DishModalComponent
        isOpen={isOpenModal}
        onClose={onCloseModal}
        type="create"
        dish={dish}
      />

      {/* Dish Delete Confirm */}
      <DishWindowConfirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        type="delete dish"
        dish={dish}
      />
    </>
  );
};
