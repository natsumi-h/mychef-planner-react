import { createContext, useContext, useEffect, useState } from "react";
import { ReactChildren } from "../types/types";
import { AuthContext } from "./AuthContext";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { useShowToast } from "../hooks/useShowToast";
import { DishList, DishType } from "../components/List/Dish/types";
import { useFetchDish } from "../hooks/useFetchDish";

type DishListContextType = {
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
};

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
export const DishListContext =
  createContext<DishListContextType>(initialContext);

export const DishListContextProvider = ({ children }: ReactChildren) => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;
  const [dishList, setDishList] = useState<DishList>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useShowToast();

  const { fetchDish } = useFetchDish();

  useEffect(() => {
    getDishList();
  }, [uid]);

  //  取得
  const getDishList = async () => {
    setLoading(true);
    try {
      const data = await fetchDish("GET");

      // Fridgeのアイテムを取得*
      const getItemIsInFridge = async () => {
        try {
          const res = await fetch(
            `${airTableRoot}${airTableBaseId}/Fridge?filterByFormula=%7BuserId%7D+%3D+%22${uid}%22`,
            {
              headers: {
                Authorization: `Bearer ${airTableApiKey}`,
              },
            }
          );
          const data = await res.json();
          return data.records;
        } catch (error) {
          console.log(error);
        }
      };

      const fridgeItems = await getItemIsInFridge();

      const newDishList = data.records.map((dish: DishType) => {
        const ingredientsArr = dish?.fields?.ingredients.split(", ");
        return {
          ...dish,
          ingredients: ingredientsArr?.map((ingredient: string) => {
            return {
              ingredient: ingredient,
              isInFridge: fridgeItems.some(
                (fridgeItem: {
                  fields: {
                    ingredient: string;
                    recipeId: number;
                  };
                }) =>
                  fridgeItem?.fields?.ingredient === ingredient &&
                  fridgeItem?.fields?.recipeId === dish?.fields?.recipeId
              ),
            };
          }),
        };
      });
      setDishList(newDishList);
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Dish削除
  const handleDeleteDish = async (dish: DishType) => {
    try {
      await fetchDish("DELETE", undefined, dish.id);
      showToast("success", "Item deleted!");
      setDishList((prev) => prev.filter((i) => i.id !== dish.id));
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
      showToast("error", "Something went wrong!");
    }
  };

  // アイテム作成
  const clickCreateSaveHandler = async (ingredient: string, dish: DishType) => {
    const ingredientsArr = dish.fields.ingredients.split(", ");
    const newIngredientsArr = [ingredient, ...ingredientsArr];
    const newIngredients = newIngredientsArr.join(", ");
    try {
      const body = JSON.stringify({
        fields: { ...dish.fields, ingredients: newIngredients },
      });
      await fetchDish("PUT", body, dish.id);

      // 作成したアイテムが所属するdishのidと、mapのidが一致したら、そのdishのingredientsを更新する
      setDishList((prev) =>
        prev.map((i) => {
          if (i.id === dish.id) {
            return {
              ...i,
              fields: { ...i.fields, ingredients: newIngredients },
              ingredients: [
                {
                  ingredient,
                  isInFridge: false,
                },
                ...i.ingredients,
              ],
            };
          }
          return i;
        })
      );
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
      const body = JSON.stringify({
        fields: { ...dish.fields, ingredients: newIngredients },
      });
      await fetchDish("PUT", body, dish.id);

      // 編集したアイテムが所属するdishのidと、mapのidが一致したら、そのdishのingredientsを更新する
      setDishList((prev) =>
        prev.map((i) => {
          if (i.id === dish.id) {
            return {
              ...i,
              fields: { ...i.fields, ingredients: newIngredients },
              ingredients: i.ingredients.map((item) => {
                if (item.ingredient === ingredient) {
                  return {
                    ingredient: value,
                    isInFridge: item.isInFridge,
                  };
                }
                return item;
              }),
            };
          }
          return i;
        })
      );
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
    const newIngredientsStr = newIngredientsArr.join(", ");
    // もし、ingredientsArrが空になったら、Itemごと削除する
    // DELETE
    if (newIngredientsArr.length === 0) {
      try {
        await fetchDish("DELETE", undefined, dish.id);
        showToast("success", "Item deleted!");
        // idが一致しないものだけを残す
        setDishList((prev) => prev.filter((i) => i.id !== dish.id));
      } catch (error) {
        showToast("error", "Something went wrong!");
      }
      return;
    }

    // PUT
    try {
      const body = JSON.stringify({
        fields: { ...dish.fields, ingredients: newIngredientsStr },
      });
      await fetchDish("PUT", body, dish.id);
      setDishList((prev) =>
        prev.map((i) => {
          if (i.id === dish.id) {
            return {
              ...i,
              fields: { ...i.fields, ingredients: newIngredientsStr },
              ingredients: i.ingredients.filter(
                (item) => item.ingredient !== ingredient
              ),
            };
          }
          return i;
        })
      );
      showToast("success", "Item deleted!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  // Add to Fridge*
  const handleAddToFridge = async (dish: DishType, ingredient: string) => {
    // POST to Fridge API
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
            recipeId: dish.fields.recipeId,
            recipeTitle: dish.fields.dish,
          },
        }),
      });
      setDishList((prev) =>
        prev.map((i) => {
          if (i.id === dish.id) {
            return {
              ...i,
              ingredients: i.ingredients.map((item) => {
                if (item.ingredient === ingredient) {
                  return {
                    ingredient,
                    isInFridge: true,
                  };
                }
                return item;
              }),
            };
          }
          return i;
        })
      );
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
