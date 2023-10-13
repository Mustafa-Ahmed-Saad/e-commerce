import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routers } from "./components/Routes/Routes";

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
