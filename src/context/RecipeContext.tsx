import { createContext, useState } from "react";
import { spoonacularApiKey, spoonacularRoot } from "../config/config";
import { ReactChildren } from "../types/types";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

type RecipeContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  recipes: Recipe[];
  error: string;
  loading: boolean;
  handleSearchRecipe: (value: string) => Promise<void>;
  getRecipes: (value: string) => Promise<void>;
};

const initialContext = {
  searchValue: "",
  setSearchValue: () => {
    throw new Error("setSearchValue is not defined");
  },
  recipes: [
    {
      id: 0,
      title: "",
      image: "",
    },
  ],
  error: "",
  loading: false,
  handleSearchRecipe: () => {
    throw new Error("handleSearchRecipe is not defined");
  },
  getRecipes: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
};

// 初期値を設定
export const RecipeContext = createContext<RecipeContextType>(initialContext);

export const RecipeContextProvider = ({ children }: ReactChildren) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 0,
      title: "",
      image: "",
    },
  ]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getRecipes = async (value: string) => {
    setRecipes([]);
    if (value.includes(" ")) {
      value = value.replace(/ /g, ",");
    }
    setLoading(true);
    try {
      const res = await fetch(
        value === ""
          ? `${spoonacularRoot}recipes/random?apiKey=${spoonacularApiKey}&number=100`
          : `${spoonacularRoot}recipes/random?apiKey=${spoonacularApiKey}&tags=${value}&number=100`
      );
      if (!res.ok) {
        setError("Something went wrong!");
      }
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (err: unknown) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchRecipe = async (value: string) => {
    setLoading(true);
    await getRecipes(value);
    setLoading(false);
  };

  return (
    <RecipeContext.Provider
      value={{
        searchValue,
        setSearchValue,
        recipes,
        error,
        loading,
        handleSearchRecipe,
        getRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
