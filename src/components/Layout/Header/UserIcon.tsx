import {
  Avatar,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useSignOut } from "../../../hooks/useSignOut";

export const UserIcon = () => {
  const { user } = useContext(AuthContext);
  const { onClickSignout } = useSignOut();

  return (
    <>
      {user && (
        <Popover>
          <PopoverTrigger>
            <Avatar
              size="md"
              name={user?.displayName as string}
              src={user?.photoURL as string}
              _hover={{
                cursor: "pointer",
                opacity: "0.8",
                transition: "0.3s",
              }}
            />
          </PopoverTrigger>
          <PopoverContent
            maxW={"100px"}
            _hover={{
              cursor: "pointer",
            }}
          >
            <PopoverArrow />
            <PopoverBody onClick={onClickSignout}>Logout</PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
