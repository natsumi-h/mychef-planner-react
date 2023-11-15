import { createContext, useContext, useEffect, useState } from "react";
import { ReactChildren } from "../types/types";
import { AuthContext } from "./AuthContext";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { useShowToast } from "../hooks/useShowToast";
import { DishList, DishType } from "../components/List/Dish/types";

const initialContext = {
  error: "",
  loading: false,
  dishList: [],
  handleDeleteDish: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  clickCreateSaveHandler: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  clickEditSaveHandler: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  handleDeleteItem: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  handleAddToFridge: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
};

// 初期値を設定
export const DishListContext = createContext<{
  error: string;
  loading: boolean;
  dishList: DishList;
  handleDeleteDish: (dish: DishType) => Promise<void>;
  clickCreateSaveHandler: (ingredient: string, dish: DishType) => Promise<void>;
  clickEditSaveHandler: (
    value: string,
    dish: DishType,
    ingredient: string
  ) => Promise<void>;
  handleDeleteItem: (dish: DishType, ingredient: string) => Promise<void>;
  handleAddToFridge: (dish: DishType, ingredient: string) => Promise<void>;
}>(initialContext);

export const DishListContextProvider = ({ children }: ReactChildren) => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;
  const [dishList, setDishList] = useState<DishList>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useShowToast();

  useEffect(() => {
    getDishList();
  }, [uid]);

  //  取得
  const getDishList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Item`, {
        headers: {
          Authorization: `Bearer ${airTableApiKey}`,
        },
      });
      const data = await res.json();
      const filteredDishList = data.records.filter(
        (dish: DishType) => dish?.fields?.userId === uid
      );
      setDishList(filteredDishList);
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // 削除
  const handleDeleteDish = async (dish: DishType) => {
    try {
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Item/${dish.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${airTableApiKey}`,
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error(data.error);
      }
      showToast("success", "Item deleted!");
      setDishList((prev) => prev.filter((i) => i.id !== dish.id));
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  // アイテム作成
  const clickCreateSaveHandler = async (ingredient: string, dish: DishType) => {
    const ingredientsArr = dish.fields.ingredients.split(", ");
    const newIngredientsArr = [ingredient, ...ingredientsArr];
    const newIngredients = newIngredientsArr.join(", ");
    try {
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Item/${dish.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
          body: JSON.stringify({
            fields: { ...dish.fields, ingredients: newIngredients },
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error(data.error);
      }
      showToast("success", "Item created!");
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  // アイテム編集
  const clickEditSaveHandler = async (
    value: string,
    dish: DishType,
    ingredient: string
  ) => {
    const ingredientsArr = dish.fields.ingredients.split(", ");
    const newIngredientsArr = ingredientsArr.map((i) => {
      if (i === ingredient) {
        return value;
      }
      return i;
    });
    const newIngredients = newIngredientsArr.join(", ");

    try {
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Item/${dish.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
          body: JSON.stringify({
            fields: { ...dish.fields, ingredients: newIngredients },
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error(data.error);
      }
      showToast("success", "Item saved!");
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  // アイテム削除
  const handleDeleteItem = async (dish: DishType, ingredient: string) => {
    const ingredientsArr = dish.fields.ingredients.split(", ");
    const newIngredientsArr = ingredientsArr.filter(
      (item: string) => item !== ingredient
    );
    const newIngredients = newIngredientsArr.join(", ");
    // setIngredientsArr(newIngredientsArr);

    // もし、ingredientsArrが空になったら、Itemごと削除する
    // DELETE
    if (newIngredientsArr.length === 0) {

      try {
        await fetch(`${airTableRoot}${airTableBaseId}/Item/${dish.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
        });
        // setItemObj(null);
        showToast("success", "Item deleted!");
        setDishList((prev) => prev.filter((i) => i.id !== dish.id));
      } catch (error) {
        showToast("error", "Something went wrong!");
      }
      return;
    }

    // PATCH
    try {
      await fetch(`${airTableRoot}${airTableBaseId}/Item/${dish.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
        body: JSON.stringify({
          fields: { ...dish.fields, ingredients: newIngredients },
        }),
      });
      showToast("success", "Item deleted!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  // Add to Fridge
  const handleAddToFridge = async (dish: DishType, ingredient: string) => {
    const ingredientsArr = dish.fields.ingredients.split(", ");
    const newIngredientsArr = ingredientsArr.filter(
      (item: string) => item !== ingredient
    );
    const newIngredients = newIngredientsArr.join(", ");
    // setIngredientsArr(newIngredientsArr);

    // もし、ingredientsArrが空になったら、Itemごと削除する
    // DELETE
    if (newIngredientsArr.length === 0) {
      try {
        await fetch(`${airTableRoot}${airTableBaseId}/Item/${dish.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
        });
        // setItemObj(null);
        // showToast("success", "Item deleted!");
      } catch (error) {
        showToast("error", "Something went wrong!");
      }
    } else {
      // Item API PATCH
      try {
        await fetch(`${airTableRoot}${airTableBaseId}/Item/${dish.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
          body: JSON.stringify({
            fields: { ...dish.fields, ingredients: newIngredients },
          }),
        });
        // showToast("success", "Item deleted!");
      } catch (error) {
        showToast("error", "Something went wrong!");
      }
    }

    // Fridge API POST
    try {
      await fetch(`${airTableRoot}${airTableBaseId}/Fridge/`, {
        // POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
        body: JSON.stringify({
          fields: {
            ingredient,
            userId: uid,
          },
        }),
      });
      showToast("success", "Item added to your fridge!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  return (
    <DishListContext.Provider
      value={{
        error,
        loading,
        dishList,
        handleDeleteDish,
        clickCreateSaveHandler,
        clickEditSaveHandler,
        handleDeleteItem,
        handleAddToFridge,
      }}
    >
      {children}
    </DishListContext.Provider>
  );
};
