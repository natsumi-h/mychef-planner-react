import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SigninScreen } from "../pages/SigninScreen";

type Props = {
  children: React.ReactNode;
  redirectTo: string;
};

export const ProtectedRoute = ({ children, redirectTo }: Props) => {
  const { user } = useContext(AuthContext);

  return <>{user ? children : <SigninScreen redirectTo={redirectTo} />}</>;
};
