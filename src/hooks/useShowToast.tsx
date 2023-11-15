import { useToast } from "@chakra-ui/react";

type Status = "success" | "error" | "warning" | "info";

export const useShowToast = () => {
  const toast = useToast();

  const showToast = (status: Status, description: string) => {
    return toast({
      description,
      status,
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
  };

  return showToast;
};
