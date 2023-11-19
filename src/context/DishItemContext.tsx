import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { DishType } from "../components/List/Dish/types";

type DishItemContextProps = {
  children: React.ReactNode;
  ingredient: string;
  dish: DishType;
};

type DishItemContextType = {
  isInFridge: boolean;
  setIsInFridge: React.Dispatch<React.SetStateAction<boolean>>;
  dish: DishType;
  ingredient: string;
};

const initialContext = {
  isInFridge: false,
  setIsInFridge: () => {
    throw new Error("setIsInFridge is not defined");
  },
  dish: {
    id: "",
    fields: {
      dish: "",
      recipeId: 0,
      ingredients: "",
      userId: "",
    },
  },
  ingredient: "",
};

// 初期値を設定
export const DishItemContext =
  createContext<DishItemContextType>(initialContext);

export const DishItemContextProvider = ({
  children,
  ingredient,
  dish,
}: DishItemContextProps) => {
  const [isInFridge, setIsInFridge] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const uid = user?.uid;

  const checkIfItemIsInFridge = async () => {
    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Fridge`, {
        headers: {
          Authorization: `Bearer ${airTableApiKey}`,
        },
      });
      const data = await res.json();

      const filteredItems = data.records.filter(
        (item: {
          fields: {
            userId: string;
          };
        }) => item?.fields?.userId === uid
      );

      const isInFridge = filteredItems.some(
        (item: {
          fields: {
            ingredient: string;
            recipeId: number;
          };
        }) =>
          item?.fields?.ingredient === ingredient &&
          item?.fields?.recipeId === dish?.fields?.recipeId
      );
      setIsInFridge(isInFridge);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfItemIsInFridge();
  }, [user]);

  return (
    <DishItemContext.Provider
      value={{ isInFridge, setIsInFridge, dish, ingredient }}
    >
      {children}
    </DishItemContext.Provider>
  );
};
