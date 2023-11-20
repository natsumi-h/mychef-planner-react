import { spoonacularApiKey, spoonacularRoot } from "../config/config";

export const useFetchRecipe = () => {
  const fetchRecipes = async (value: string) => {
    value = value.toLowerCase();
    if (value.includes(" ")) {
      value = value.replace(/ /g, ",");
    }

    try {
      const res = await fetch(
        value === ""
          ? `${spoonacularRoot}recipes/random?apiKey=${spoonacularApiKey}&number=60`
          : `${spoonacularRoot}recipes/random?apiKey=${spoonacularApiKey}&tags=${value}&number=60`
      );
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      return data;
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const fetchSingleRecipe = async (id: string) => {
    try {
      const res = await fetch(
        `${spoonacularRoot}recipes/${id}/information?apiKey=${spoonacularApiKey}&includeNutrition=false`
      );
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      return data;
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return { fetchRecipes, fetchSingleRecipe };
};
