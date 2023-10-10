import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routers } from "./components/Routes/Routes";
import WishListContextProvider from "./contexts/WishListContext";

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
