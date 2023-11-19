export type DishList = DishType[];

export type DishType = {
  id: string;
  fields: DishFields;
  ingredients: Ingredient[];
};

export type DishFields = {
  ingredients: string;
  userId: string;
  recipeId: number;
  dish: string;
};

export type Ingredient = {
  ingredient: string;
  isInFridge: boolean;
};

