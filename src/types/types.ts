export type ReactChildren = {
  children: React.ReactNode;
};

export type RecipeCardType = {
  id: number;
  image: string;
  title: string;
};

export type Recipe = RecipeCardType & {
  servings?: number;
  readyInMinutes?: number;
  extendedIngredients: {
    name: string;
    original: string;
  }[];
  instructions: string;
};
