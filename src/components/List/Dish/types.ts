export type DishList = DishType[];

export type DishType = {
  id: string;
  fields: DishFields;
};

export type DishFields = {
  ingredients: string;
  userId: string;
  recipeId: number;
  dish: string;
};
