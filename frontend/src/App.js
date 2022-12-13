import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Signin from "./pages/user/Signin";
import Signup from "./pages/user/Signup";
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from "./Auth/PrivateRoute";
import AdminDashboard from "./pages/user/AdminDashboard";
import AdminRoute from "./Auth/AdminRoute";
import AddCategory from "./Admin/AddCategory";
import Order from "./Admin/Order";
import UpdateProduct from "./Admin/UpdateProduct";
import ManageProduct from "./Admin/ManageProduct";
import AddProduct from './Admin/AddProduct'
  import Shop from "./component/Shop/Shop";
  import Product from "./component/Product/Product";
  import Cart from './component/cart/Cart'
  import Profile from "./pages/user/Profile";

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin/>} />

        <Route element={<PrivateRoute/>}>
              <Route path='/user/dashboard' element={<Dashboard/>} />
       </Route>
       <Route element={<PrivateRoute/>}>
              <Route path='/profile/:userId' element={<Profile/>} />
       </Route>
       <Route element={<AdminRoute/>}>
              <Route path='/admin/dashboard' element={<AdminDashboard/>} />
       </Route>
       <Route element={<AdminRoute/>}>
              <Route path='/category/create' element={<AddCategory/>} />
       </Route>
       <Route element={<AdminRoute/>}>
              <Route path='/product/create' element={<AddProduct/>} />
       </Route>

       <Route element={<AdminRoute/>}>
              <Route path='/admin/orders' element={<Order/>} />
       </Route>

       <Route element={<AdminRoute/>}>
              <Route path='/admin/products' element={<ManageProduct/>} />
       </Route>

       <Route element={<AdminRoute/>}>
              <Route path='/admin/product/update/:productId' element={<UpdateProduct/>} />
       </Route>

       <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
