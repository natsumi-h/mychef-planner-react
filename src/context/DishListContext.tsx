import { createContext, useContext, useEffect, useState } from "react";
import { ReactChildren } from "../types/types";
import { AuthContext } from "./AuthContext";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { useShowToast } from "../hooks/useShowToast";
import { DishList, DishType } from "../components/List/Dish/types";

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

  useEffect(() => {
    getDishList();
  }, [uid]);

  //  取得
  const getDishList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Dish`, {
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

  // Dish削除
  const handleDeleteDish = async (dish: DishType) => {
    try {
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Dish/${dish.id}`,
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
        `${airTableRoot}${airTableBaseId}/Dish/${dish.id}`,
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
      // 作成したアイテムが所属するdishのidと、mapのidが一致したら、そのdishのingredientsを更新する
      setDishList((prev) =>
        prev.map((i) => {
          if (i.id === dish.id) {
            return {
              ...i,
              fields: { ...i.fields, ingredients: newIngredients },
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
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Dish/${dish.id}`,
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
      // 編集したアイテムが所属するdishのidと、mapのidが一致したら、そのdishのingredientsを更新する
      setDishList((prev) =>
        prev.map((i) => {
          if (i.id === dish.id) {
            return {
              ...i,
              fields: { ...i.fields, ingredients: newIngredients },
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
        await fetch(`${airTableRoot}${airTableBaseId}/Dish/${dish.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
        });
        showToast("success", "Item deleted!");
        setDishList((prev) => prev.filter((i) => i.id !== dish.id));
      } catch (error) {
        showToast("error", "Something went wrong!");
      }
      return;
    }

    // PUT
    try {
      await fetch(`${airTableRoot}${airTableBaseId}/Dish/${dish.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
        body: JSON.stringify({
          fields: { ...dish.fields, ingredients: newIngredientsStr },
        }),
      });
      setDishList((prev) =>
        prev.map((i) => {
          if (i.id === dish.id) {
            return {
              ...i,
              fields: { ...i.fields, ingredients: newIngredientsStr },
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

  // Add to Fridge
  const handleAddToFridge = async (dish: DishType, ingredient: string) => {
    // dish（パラメーター）のingredientsを配列にする
    // const ingredientsArr = dish.fields.ingredients.split(", ");

    // ingredientsArrから、クリックしたingredientを削除する
    // const newIngredientsArr = ingredientsArr.filter(
    //   (item: string) => item !== ingredient
    // );
    // newIngredientsArrを文字列にする
    // const newIngredientsStr = newIngredientsArr.join(", ");

    // もし、ingredientsArrが空になったら、Itemごと削除する=>不要
    // DELETE Dish API
    // if (newIngredientsArr.length === 0) {
    //   try {
    //     await fetch(`${airTableRoot}${airTableBaseId}/Dish/${dish.id}`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${airTableApiKey}`,
    //       },
    //     });
    //     setDishList((prev) => prev.filter((i) => i.id !== dish.id));
    //   } catch (error) {
    //     showToast("error", "Something went wrong!");
    //   }
    // } else {
    //   // PUT Dish API=>不要？
    //   try {
    //     await fetch(`${airTableRoot}${airTableBaseId}/Dish/${dish.id}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${airTableApiKey}`,
    //       },
    //       body: JSON.stringify({
    //         fields: { ...dish.fields, ingredients: newIngredientsStr },
    //       }),
    //     });
    //     setDishList((prev) =>
    //       prev.map((i) => {
    //         if (i.id === dish.id) {
    //           return {
    //             ...i,
    //             fields: { ...i.fields, ingredients: newIngredientsStr },
    //           };
    //         }
    //         return i;
    //       })
    //     );
    //   } catch (error) {
    //     showToast("error", "Something went wrong!");
    //   }
    // }

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
