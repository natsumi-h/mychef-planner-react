import { RecipeList } from "../components/Home/RecipeList.js";
import { MainBox } from "../components/Layout/MainBox.js";
import { FilterButtons } from "../components/Home/FilterButtons.js";
import { SearchInput } from "../components/Home/SearchInput.js";
import { RecipeContextProvider } from "../context/RecipeContext.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { SearchInputSchema, SearchInputType } from "../types/types.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { SigninScreen } from "./SigninScreen.js";

export const HomeScreen = () => {
  const methods = useForm<SearchInputType>({
    resolver: yupResolver(SearchInputSchema),
  });
  const { signInMode } = useContext(AuthContext);

  return (
    <MainBox>
      {signInMode && <SigninScreen redirectTo={"/"} />}
      {!signInMode && (
        <RecipeContextProvider>
          <FormProvider {...methods}>
            <SearchInput />
            <FilterButtons />
          </FormProvider>

          <RecipeList />
        </RecipeContextProvider>
      )}
    </MainBox>
  );
};
