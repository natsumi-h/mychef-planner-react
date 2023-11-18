import { createContext, useContext, useEffect, useState } from "react";
import { ReactChildren, RecipeCardType } from "../types/types";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { useShowToast } from "../hooks/useShowToast";
import { AuthContext } from "./AuthContext";

type FavoriteRecipe = {
  id: string;
  fields: {
    recipeId: number;
    title: string;
    image: string;
    userId: string;
  };
};

type FavoriteRecipeContextType = {
  favRecipes: FavoriteRecipe[];
  error: string;
  loading: boolean;
  getFavRecipes: () => Promise<void>;
  deleteFavRecipe: (recipeId: number) => Promise<void>;
  addToFavorite: (recipe: RecipeCardType) => Promise<void>;
};

const initialContext = {
  favRecipes: [
    {
      id: "",
      fields: {
        recipeId: 0,
        title: "",
        image: "",
        userId: "",
      },
    },
  ],
  error: "",
  loading: false,
  getFavRecipes: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
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
export const FavoriteRecipeContext =
  createContext<FavoriteRecipeContextType>(initialContext);

export const FavoriteRecipeContextProvider = ({ children }: ReactChildren) => {
  const { user } = useContext(AuthContext);
  const [favRecipes, setFavRecipes] = useState<FavoriteRecipe[]>([
    {
      id: "",
      fields: {
        recipeId: 0,
        title: "",
        image: "",
        userId: "",
      },
    },
  ]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
        (record: FavoriteRecipe) => record.fields.userId === user?.uid
      );

      // ここには素のデータを格納すべき
      setFavRecipes(filteredData);
    } catch (err: unknown) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const deleteFavRecipe = async (recipeId: number) => {
    const favRecipe = favRecipes.find(
      (recipe) => recipe.fields.recipeId === recipeId
    );
    if (!favRecipe) return;
    try {
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Favorite/${favRecipe.id}`,
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
      setFavRecipes((prev) =>
        prev.filter((recipe) => recipe.fields.recipeId !== recipeId)
      );
      // setFavUpdated((prev) => !prev);
      return data;
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong!");
    }
  };

  const addToFavorite = async (recipe: {
    id: number;
    title: string;
    image: string;
  }) => {
    const { id, title, image } = recipe;
    try {
      const res = await fetch(`${airTableRoot}${airTableBaseId}/Favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },

        body: JSON.stringify({
          fields: {
            recipeId: id,
            title,
            image,
            userId: user?.uid,
          },
        }),
      });
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      showToast("success", "Added to Favorite!");
      setFavRecipes((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    getFavRecipes();
  }, [user]);

  return (
    <FavoriteRecipeContext.Provider
      value={{
        favRecipes,
        error,
        loading,
        getFavRecipes,
        deleteFavRecipe,
        addToFavorite,
      }}
    >
      {children}
    </FavoriteRecipeContext.Provider>
  );
};
