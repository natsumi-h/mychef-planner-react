import { RecipeList } from "../components/RecipeList.js";
import { MainBox } from "../components/Layout/MainBox.js";
import { FilterButtons } from "../components/Home/FilterButtons.js";
import { SearchInput } from "../components/Home/SearchInput.js";
import { RecipeContextProvider } from "../context/RecipeContext.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

export const SearchInputSchema = yup.object({
  input: yup
    .string()
    .min(3, "Minimum 3 characters are required.")
    .max(20, "The value can't be more than 20 characters.")
    .required("This field is required."),
});

export type SearchInputType = yup.InferType<typeof SearchInputSchema>;

export const HomeScreen = () => {
  const methods = useForm<SearchInputType>({
    resolver: yupResolver(SearchInputSchema),
  });
  

  return (
    <RecipeContextProvider>
      <MainBox>
        
        <FormProvider {...methods}>
          <SearchInput />
          <FilterButtons />
        </FormProvider>

        <RecipeList />
      </MainBox>
    </RecipeContextProvider>
  );
};
