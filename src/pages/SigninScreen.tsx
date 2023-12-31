import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MainBox } from "../components/Layout/MainBox";
import { useShowToast } from "../hooks/useShowToast";
import { Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  redirectTo: string;
};

export const SigninScreen = ({ redirectTo }: Props) => {
  const { googleSignin, setSignInMode } = useContext(AuthContext);

  const navigate = useNavigate();

  const showToast = useShowToast();

  const onClick = async () => {
    try {
      await googleSignin();
      setSignInMode(false);
      showToast("success", "Signin Success");
      navigate(redirectTo);
    } catch (e) {
      showToast("error", "Something went wrong!");
    }
  };

  return (
    <MainBox>
      <Center p={8} pt={"150px"}>
        <Button
          w={"full"}
          maxW={"md"}
          variant={"outline"}
          leftIcon={<FcGoogle />}
          onClick={onClick}
          _hover={{ bg: "secondary" }}
        >
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
      </Center>
    </MainBox>
  );
};
