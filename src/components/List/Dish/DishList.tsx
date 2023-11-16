import { useContext } from "react";
import { Dish } from "./Dish";
import { DishListContext } from "../../../context/DishListContext";
import { Text } from "@chakra-ui/react";

export const DishList = () => {
  const { dishList, error, loading } = useContext(DishListContext);

  return (
    <>
      {error ? (
        <Text>Somethng went wrong!</Text>
      ) : loading ? (
        <></>
      ) : dishList?.length === 0 ? (
        // <Text>You have no items yet!</Text>
        <></>
      ) : (
        dishList?.map((item) => {
          return <Dish key={item.id} dish={item} />;
        })
      )}
    </>
  );
};
