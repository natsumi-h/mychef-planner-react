import { createContext } from "react";
import { DishType, Ingredient } from "../components/List/Dish/types";

type DishItemContextProps = {
  children: React.ReactNode;
  ingredient: Ingredient;
  dish: DishType;
};

type DishItemContextType = {
  dish: DishType;
  ingredient: Ingredient;
};

const initialContext = {
  dish: {
    id: "",
    fields: {
      dish: "",
      recipeId: 0,
      ingredients: "",
      userId: "",
    },
    ingredients: [],
  },
  ingredient: { ingredient: "", isInFridge: false },
};

// 初期値を設定
export const DishItemContext =
  createContext<DishItemContextType>(initialContext);

export const DishItemContextProvider = ({
  children,
  ingredient,
  dish,
}: DishItemContextProps) => {
  return (
    <DishItemContext.Provider value={{ dish, ingredient }}>
      {children}
    </DishItemContext.Provider>
  );
};
