// /src/App.tsx
import { RouterProvider } from "react-router-dom";
import router from "./assets/routers/router";


const App = () => {
 return <RouterProvider router={router} />;
};


export default App;