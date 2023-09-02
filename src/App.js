
import {Router, RouterProvider, createBrowserRouter} from "react-router-dom" 
import Crypto from "./pages/crypto";
const router = createBrowserRouter([

      {
        path:'/',
        element:<Crypto/>
      },
      // {
      //   path:"/menu",
      //   element:<Menu/>,
      //   loader: menuLoader,
      //   errorElement: <Error/>,

      // },
     
 
])
function App() {
  return <RouterProvider router={router}/>
}

export default App;
