import * as yup from "yup";

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

export type SearchInputType = yup.InferType<typeof SearchInputSchema>;

export const SearchInputSchema = yup.object({
  input: yup
    .string()
    .min(3, "Minimum 3 characters are required.")
    .max(20, "The value can't be more than 20 characters.")
    .required("This field is required."),
});

export const ItemInputSchema = yup.object({
  input: yup
    .string()
    .min(3, "Minimum 3 characters are required.")
    .max(20, "The value can't be more than 20 characters.")
    .required("This field is required."),
});

export type ItemInputType = yup.InferType<typeof ItemInputSchema>;
