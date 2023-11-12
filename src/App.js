import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routers } from "./components/Routes/Routes";
import "react-lazy-load-image-component/src/effects/blur.css";

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
