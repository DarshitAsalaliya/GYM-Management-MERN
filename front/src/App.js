import React from 'react'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import DashboardLayout from './Components/Admin/DashboardLayout/DashboardLayout';
import AdminProfile from './Components/Admin/AdminProfile';
import ManageMembers from './Components/Admin/Member/ManageMembers';
import AddMember from './Components/Admin/Member/AddMember';
import HomeLayout from './Components/Home/HomeLayout/HomeLayout';
import Login from './Components/Home/Login';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ForgotPassword from './Components/Home/ForgotPassword';

function App() {

  // Intercepter For Set Authorization
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const { token } = useSelector(state => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeLayout />}>
            <Route path='Login' element={<Login />} />
            <Route path='ForgotPassword' element={<ForgotPassword />} />
          </Route>
          <Route path='/Dashboard/Admin/' element={token ? <DashboardLayout /> : <Navigate to="/Login" replace />}>
            <Route path='AdminProfile' element={<AdminProfile />} />
            <Route path='AddMember' element={<AddMember />} />
            <Route path='ManageMembers' element={<ManageMembers />} />
          </Route>
          <Route path='*' element={<h1>Error 404 Page not Found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
