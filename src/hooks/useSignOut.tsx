import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useShowToast } from "./useShowToast";

export const useSignOut = () => {
  const { googleSignout } = useContext(AuthContext);
  const navigate = useNavigate();
  const showToast = useShowToast();

  const onClickSignout = async () => {
    try {
      await googleSignout();
      showToast("success", "Signout Success");
      navigate("/");
    } catch (e) {
      showToast("error", "Something went wrong!");
    }
  };

  return { onClickSignout };
};
