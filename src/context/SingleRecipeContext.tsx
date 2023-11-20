import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  airTableRoot,
  airTableBaseId,
  airTableApiKey,
} from "../config/config.js";
import { useShowToast } from "../hooks/useShowToast.js";
import { ReactChildren, Recipe } from "../types/types.js";
import { DishFields, DishType } from "../components/List/Dish/types.js";
import { useFetchRecipe } from "../hooks/useFetchRecipe.js";

type SingleRecipeContextType = {
  recipe: Recipe;
  error: string;
  isLoading: boolean;
  handleSaveIngredients: () => Promise<void>;
  isRecipeInDishList: boolean;
  dishList: DishType[];
  checkIfRecipeIsInDishList: () => Promise<void>;
};

const initialContext = {
  recipe: {
    id: 0,
    image: "",
    title: "",
    servings: 0,
    readyInMinutes: 0,
    extendedIngredients: [],
    analyzedInstructions: [],
  },
  error: "",
  isLoading: true,
  handleSaveIngredients: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  isRecipeInDishList: false,
  dishList: [],
  checkIfRecipeIsInDishList: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
};

// 初期値を設定
export const SingleRecipeContext =
  createContext<SingleRecipeContextType>(initialContext);

export const SingleRecipeContextProvider = ({ children }: ReactChildren) => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const pathIdNum = parseInt(pathId);

  const showToast = useShowToast();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    image: "",
    title: "",
    servings: 0,
    readyInMinutes: 0,
    extendedIngredients: [],
    analyzedInstructions: [],
  });
  const { title, extendedIngredients } = recipe;
  const [dishList, setDishList] = useState<DishType[]>([]);
  const [isRecipeInDishList, setIsRecipeInDishList] = useState<boolean>(false);
  const { fetchSingleRecipe } = useFetchRecipe();

  const getRecipe = async () => {
    setError("");
    setIsLoading(true);
    try {
      const data = await fetchSingleRecipe(pathId);
      setRecipe(data);
    } catch (err: unknown) {
      console.log(err);
      setError("Somwthing went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  //  getDishList
  const getDishList = async () => {
    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Dish`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
      });
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      const filteredData = data.records.filter(
        (record: { fields: DishFields }) => record.fields.userId === user?.uid
      );
      setDishList(filteredData);
      return filteredData;
    } catch (error) {
      console.log(error);
    }
  };

  // Duplicate check
  const checkIfRecipeIsInDishList = async () => {
    const res = await getDishList();
    const recipeIdArr = res.map((item: DishType) => item.fields.recipeId);
    if (recipeIdArr.includes(pathIdNum)) {
      setIsRecipeInDishList(true);
    }
  };

  const handleSaveIngredients = async () => {
    const ingredientNamesStr = extendedIngredients
      .map((ingredient) => ingredient.name)
      .join(", ");

    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Dish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
        body: JSON.stringify({
          fields: {
            recipeId: pathIdNum,
            ingredients: ingredientNamesStr,
            userId: user?.uid,
            dish: title,
          },
        }),
      });
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      setIsRecipeInDishList(true);
      showToast("success", "Item added to your shopping list!");
      setDishList((prev) => [...prev, data]);
      return;
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    getRecipe();
    checkIfRecipeIsInDishList();
  }, [user]);

  return (
    <SingleRecipeContext.Provider
      value={{
        recipe,
        error,
        isLoading,
        handleSaveIngredients,
        isRecipeInDishList,
        dishList,
        checkIfRecipeIsInDishList,
      }}
    >
      {children}
    </SingleRecipeContext.Provider>
  );
};
