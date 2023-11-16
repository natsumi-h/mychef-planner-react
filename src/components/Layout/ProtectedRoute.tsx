import { FC, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SigninScreen } from "../../pages/SigninScreen";

type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectTo: string;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  redirectTo,
}) => {
  const { user } = useContext(AuthContext);

  return <>{user ? children : <SigninScreen redirectTo={redirectTo} />}</>;
};
