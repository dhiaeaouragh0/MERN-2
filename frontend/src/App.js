import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/navbar/Navbar';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

//User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

//Cart imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Paiment';

//Order imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

//Admin imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';



import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} exact />
          
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/shipping" element={<ProtectedRoute> <Shipping/></ProtectedRoute>}exact/>
          <Route path="/order/confirm" element={<ProtectedRoute> <ConfirmOrder/></ProtectedRoute>}exact/>
          <Route path="/order/paiment" element={<ProtectedRoute> <Payment/></ProtectedRoute>}exact/>

          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route path="/password/reset/:token" element={<NewPassword />} exact />

          <Route path="/me" element={<ProtectedRoute> <Profile /></ProtectedRoute>}exact/>
          <Route path="/me/update" element={<ProtectedRoute> <UpdateProfile /></ProtectedRoute>}exact/>
          <Route path="/password/update" element={<ProtectedRoute> <UpdatePassword /></ProtectedRoute>}exact/>
          
          <Route path="/orders/me" element={<ProtectedRoute> <ListOrders /></ProtectedRoute>}exact/>
          <Route path="/order/:id" element={<ProtectedRoute> <OrderDetails /></ProtectedRoute>}exact/>

          <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>} exact />
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}> <ProductsList /></ProtectedRoute>}exact/>


        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
