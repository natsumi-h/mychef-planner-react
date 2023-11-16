import { MainBox } from "../components/Layout/MainBox";
import { SingleRecipe } from "../components/SingleRecipe/SingleRecipe";
import { SingleRecipeContextProvider } from "../context/SingleRecipeContext";

export const SingleRecipeScreen = () => {
  return (
    <MainBox>
      <SingleRecipeContextProvider>
        <SingleRecipe />
      </SingleRecipeContextProvider>
    </MainBox>
  );
};
