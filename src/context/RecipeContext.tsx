import { createContext, useEffect, useState } from "react";
import { ReactChildren, RecipeCardType } from "../types/types";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

type RecipeContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  recipes: RecipeCardType[];
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
  const [recipes, setRecipes] = useState<RecipeCardType[]>([
    {
      id: 0,
      title: "",
      image: "",
    },
  ]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchRecipes } = useFetchRecipe();

  const getRecipes = async (value: string) => {
    setRecipes([]);
    setLoading(true);
    try {
      const data = await fetchRecipes(value);
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

  useEffect(() => {
    getRecipes("");
  }, []);

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
