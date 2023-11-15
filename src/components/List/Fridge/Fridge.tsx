import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FridgeContext } from "../../../context/FridgeContext";
import { FridgeItem } from "./FridgeItem";
import { FridgeItemAddButton } from "./FridgeAddButton";

export const Fridge = () => {
  const { items, error, loading } = useContext(FridgeContext);

  return (
    <>
      <Box>
        <Flex
          justify={"flex-start"}
          align={"center"}
          py={"10px"}
          columnGap={"20px"}
        >
          <Text fontSize="lg" as="b" color={"heading"}>
            In the Fridge
          </Text>
          <Box>
            <Flex columnGap={"10px"}>
              <FridgeItemAddButton />
            </Flex>
          </Box>
        </Flex>

        {/* Item List */}
        {error ? (
          <Text>Somethng went wrong!</Text>
        ) : loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="lg"
            mx={"auto"}
            display={"block"}
            mt={"100px"}
          />
        ) : items?.length === 0 ? (
          <Text>You have no items yet!</Text>
        ) : (
          items?.map((item) => {
            return <FridgeItem key={item.id} item={item} />;
          })
        )}
        {/* /Item List End */}
      </Box>
    </>
  );
};
