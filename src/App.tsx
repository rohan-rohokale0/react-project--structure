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
        </Route>
      </Routes>
    </Router>

    );
  }
}

export default App;
