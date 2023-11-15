import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { MyItem } from "./MyItem";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import { MyItemAddButton } from "./MyItemAddButton";

export const Miscellaneous = () => {
  const { items, error, loading } = useContext(MiscellaneousContext);

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
            Miscellaneous
          </Text>

          <Box>
            <Flex columnGap={"10px"}>
              <MyItemAddButton />
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
            return <MyItem key={item.id} item={item} />;
          })
        )}
        {/* /Item List End */}
      </Box>
    </>
  );
};
