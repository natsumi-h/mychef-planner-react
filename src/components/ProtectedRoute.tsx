import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Signin } from "../pages/Signin";

type Props = {
  children: React.ReactNode;
  redirectTo: string;
};

export const ProtectedRoute = ({ children, redirectTo }: Props) => {
  const { user } = useContext(AuthContext);

  return <>{user ? children : <Signin redirectTo={redirectTo} />}</>;
};
