import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";
import { useContext, FC } from "react";

export const ProtectedRoute = ({ component: Component }: { component: FC }) => {
  const { isLoggedIn } = useContext(AuthContext);

  console.log("IS Logged In", isLoggedIn);
  return isLoggedIn ? <Component /> : <Navigate to="/" />;
};
