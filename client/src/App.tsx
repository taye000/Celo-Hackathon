import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import Registerpage from "./components/Register-page/Register";
import Homepage from "./BuySellTransfer";
import { AuthProvider } from "./context";
import { ProtectedRoute } from "./components/routing/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/Home" element={<ProtectedRoute component={Homepage} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
