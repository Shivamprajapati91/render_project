import { createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/forgotPassword';
import SignUp from '../pages/signUp';
import Admin from '../pages/Admin';
import Allusers from '../pages/Allusers';
import Allproducts from '../pages/Allproducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';

const router=createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "signup",
                element: <SignUp/>
            },
            {
              path: "product-category",
              element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
              path: "cart",
              element: <Cart/>
            },
            {
            path: "success",
            element: <Success/>
            },
            {
              path: "cancel",
              element: <Cancel/>
            },
            {
               path: "search",
               element: <SearchProduct/>
            },
            {
              path: "order",
              element: <OrderPage/>
            },
            {
                path: "admin-panel",
                element: <Admin/>,
                children: [
                    {
                        path: "all-users",
                        element: <Allusers/>
                    },
                    {
                        path: "all-products",
                        element: <Allproducts/>
                    }
                ]
            }
        ]
    }
]);

export default router;