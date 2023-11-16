import { createContext, useContext, useState } from "react";
import { ReactChildren } from "../types/types";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { useShowToast } from "../hooks/useShowToast";
import { AuthContext } from "./AuthContext";

export type FavoriteRecipe = {
  recipeId: number;
  title: string;
  image: string;
  userId: string;
};

const initialContext = {
  favRecipes: [
    {
      recipeId: 0,
      userId: "",
      title: "",
      image: "",
    },
  ],
  error: "",
  loading: false,
  getFavRecipes: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  getFavRecipesIdArr: () => {
    return [];
  },
  deleteFavRecipe: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  favUpdated: false,
  setFavUpdated: () => {},
  addToFavorite: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
};

// 初期値を設定
export const FavoriteRecipeContext = createContext<{
  favRecipes: FavoriteRecipe[];
  error: string;
  loading: boolean;
  getFavRecipes: () => Promise<void>;
  getFavRecipesIdArr: () => number[];
  deleteFavRecipe: (recipeId: number) => Promise<void>;
  favUpdated: boolean;
  setFavUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  addToFavorite: (recipe: {
    recipeId: number;
    title: string;
    image: string;
  }) => Promise<void>;
}>(initialContext);

export const FavoriteRecipeContextProvider = ({ children }: ReactChildren) => {
  const { user } = useContext(AuthContext);
  const [favRecipes, setFavRecipes] = useState<FavoriteRecipe[]>([
    {
      recipeId: 0,
      title: "",
      image: "",
      userId: "",
    },
  ]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [favUpdated, setFavUpdated] = useState<boolean>(false);
  const showToast = useShowToast();

  const getFavRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Favorite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
      });
      if (!res.ok) {
        setError("Something went wrong!");
      }
      const data = await res.json();
      //   dataの中からuserIDが一致するものだけを抽出する
      const filteredData = data.records.filter(
        (record: { fields: FavoriteRecipe }) =>
          record.fields.userId === user?.uid
      );
      setFavRecipes(
        filteredData.map((record: { fields: FavoriteRecipe }) => record.fields)
      );
    } catch (err: unknown) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const getFavRecipesIdArr = () => {
    return favRecipes.map((recipe) => recipe.recipeId);
  };

  const deleteFavRecipe = async (recipeId: number) => {
    try {
      // getAllFavRecipeData
      const getRes = await fetch(`${airTableRoot}${airTableBaseId}/Favorite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
      });
      if (!getRes.ok) throw new Error("Something went wrong!");
      const getData = await getRes.json();

      //   dataの中からuserIDが一致するものだけを抽出する
      //   const filteredGetData = getData.records.filter(
      //     (record) => record.fields.recipeId === recipeId
      //   );
      const filteredGetData = getData.records.find(
        (record: { fields: FavoriteRecipe }) =>
          record.fields.recipeId === recipeId
      );

      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Favorite/${filteredGetData.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
        }
      );
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      showToast("success", "Removed from Favorite!");
      setFavUpdated((prev) => !prev);
      return data;
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong!");
    }
  };

  const addToFavorite = async (recipe: {
    recipeId: number;
    title: string;
    image: string;
  }) => {
    const { recipeId, title, image } = recipe;
    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },

        body: JSON.stringify({
          fields: {
            recipeId,
            title,
            image,
            userId: user?.uid,
          },
        }),
      });
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      showToast("success", "Added to Favorite!");
      setFavUpdated((prev) => !prev);
      return data;
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong!");
    }
  };

  return (
    <FavoriteRecipeContext.Provider
      value={{
        favRecipes,
        error,
        loading,
        getFavRecipes,
        getFavRecipesIdArr,
        deleteFavRecipe,
        favUpdated,
        setFavUpdated,
        addToFavorite,
      }}
    >
      {children}
    </FavoriteRecipeContext.Provider>
  );
};
