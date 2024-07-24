import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Login from './Pages/login';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './Pages/Layout/MainLayout';
import CategoryList from './Pages/Category/Category_List';
import ProductList from './Pages/Product/product_list';
import AddProduct from './Pages/Product/add-product';
import UpdateProduct from './Pages/Product/update_product';

class App extends Component {
  render() {
    return (
      <Router basename='/'>
      <Routes>
        {/* Public routes */}
        <Route path='auth/login' element={<Login />} />
        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
        
        {/* Protected routes */}
        <Route path="/home" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path='category-list' element={< CategoryList />}></Route>
          <Route path='product-list' element={< ProductList />}></Route>
          <Route path="product-list/add-product" element={<AddProduct />}></Route>
                {/* <Route path="update-product" element={<UpdateProduct />}></Route> */}
        </Route>
      </Routes>
    </Router>

    );
  }
}

export default App;
