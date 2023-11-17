import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useFormContext, SubmitHandler, FieldValues } from "react-hook-form";

export const SearchInput = () => {
  const { handleSearchRecipe } = useContext(RecipeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.input) return;
    handleSearchRecipe(data.input);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.input ? true : false}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon color="gray.300" as={FiSearch}></Icon>
          </InputLeftElement>
          <Input placeholder="Search Recipes..." {...register("input")} />
        </InputGroup>

        <FormErrorMessage>{errors?.input?.message as string}</FormErrorMessage>
      </FormControl>
    </form>
  );
};
