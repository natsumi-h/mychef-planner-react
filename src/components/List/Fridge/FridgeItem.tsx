import { Box, Divider, Flex, Tag } from "@chakra-ui/react";
import { FC } from "react";
import { FridgeItemButtons } from "./FridgeItemButtons";
import { FridgeItemType } from "./types";
import { Link } from "../../Parts/Link";

type FridgeItemProps = {
  item: FridgeItemType;
};

export const FridgeItem: FC<FridgeItemProps> = ({ item }) => {
  return (
    <>
      <Box>
        <Flex
          justify={"space-between"}
          alignItems={"center"}
          py={"10px"}
          columnGap={"10px"}
        >
          <Flex
            alignItems={{ base: "flex-start", md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box flexShrink={"0"}>{item.fields.ingredient}</Box>
            {item.fields.recipeId && (
              <Tag
                rounded={"full"}
                size={"sm"}
                // colorScheme={"teal"}
                // variant="solid"
                bg={"secondary"}
                color={"text"}
                ml={{ base: "0", md: "10px" }}
                mt={{ base: "5px", md: "0" }}
                display={{ base: "none", md: "inline" }}
                lineHeight={"inherit"}
              >
                <Link to={`/recipe/${item.fields.recipeId}`} underline>
                  {item.fields.recipeTitle}
                </Link>
              </Tag>
            )}
          </Flex>
          <FridgeItemButtons item={item} />
        </Flex>

        <Divider />
      </Box>
      <Divider />
    </>
  );
};
