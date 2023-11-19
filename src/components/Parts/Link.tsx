import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FC } from "react";

type Link = {
  children: React.ReactNode;
  to: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | undefined;
  underline?: boolean;
};

export const Link: FC<Link> = ({ children, to, target, underline }) => {
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
      textDecor={underline ? "underline" : "none"}
      noOfLines={1}
    >
      {children}
    </ChakraLink>
  );
};
