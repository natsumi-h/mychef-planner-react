import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

type Link = {
  children: React.ReactNode;
  to: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | undefined;
};

export const Link = ({ children, to, target }: Link) => {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      target={target}
      textDecoration={"none"}
      _hover={{
        textDecoration: "none",
        opacity: "0.8",
        transition: "all 0.3s ease",
      }}
      // colorScheme={"teal"}
      //   display="inline-block"
      //   w="30px"
      //   h="30px"
      // bg="secondary"
      //   borderRadius={"md"}
    >
      {children}
    </ChakraLink>
  );
};
