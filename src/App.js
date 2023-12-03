import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthorizedRoutes } from "./Routes/AuthorizedRoutes";
import { UnauthorizedRoutes } from "./Routes/UnauthorizedRoutes";
import { useAuth } from "./component/AuthContext";
import { CartProvider } from "./component/CartContext";

function App() {
  const { user } = useAuth();

  return (
    <CartProvider>
      <BrowserRouter>
        {user ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
        <ToastContainer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
