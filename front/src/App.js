import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboardLayout from './Components/Admin/DashboardLayout/DashboardLayout';
import TrainerDashboardLayout from './Components/Trainer/DashboardLayout/DashboardLayout';
import MemberDashboardLayout from './Components/Member/DashboardLayout/DashboardLayout';
import AdminProfile from './Components/Admin/AdminProfile';
import TrainerProfile from './Components/Trainer/TrainerProfile';
import MemberProfile from './Components/Member/MemberProfile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import TrainerDashboard from './Components/Trainer/TrainerDashboard';
import MemberDashboard from './Components/Member/MemberDashboard';
import ManageMembers from './Components/Admin/Member/ManageMembers';
import TrainerManageMembers from './Components/Trainer/Member/ManageMembers';
import ManageTrainers from './Components/Admin/Trainer/ManageTrainers';
import ManageMemberships from './Components/Admin/Membership/ManageMemberships';
import ManageSupplements from './Components/Admin/Supplement/ManageSupplements';
import ManageInvoices from './Components/Admin/Invoice/ManageInvoices';
import AddMember from './Components/Admin/Member/AddMember';
import HomeLayout from './Components/Home/HomeLayout/HomeLayout';
import Login from './Components/Home/Login';
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeLayout />}>
            <Route path='Login' element={<Login />} />
            <Route path='ForgotPassword' element={<ForgotPassword />} />
          </Route>
          <Route path='/Dashboard/Admin/' element={<AdminDashboardLayout />}>
            <Route path='' index element={<AdminDashboard />} />
            <Route path='AdminProfile' element={<AdminProfile />} />
            <Route path='AddMember' element={<AddMember />} />
            <Route path='ManageMembers' element={<ManageMembers />} />
            <Route path='ManageTrainers' element={<ManageTrainers />} />
            <Route path='ManageMemberships' element={<ManageMemberships />} />
            <Route path='ManageSupplements' element={<ManageSupplements />} />
            <Route path='ManageInvoices' element={<ManageInvoices />} />
          </Route>
          <Route path='/Dashboard/Trainer/' element={<TrainerDashboardLayout />}>
            <Route path='' index element={<TrainerDashboard />} />
            <Route path='TrainerProfile' element={<TrainerProfile />} />
            <Route path='ManageMembers' element={<TrainerManageMembers />} />
          </Route>
          <Route path='/Dashboard/Member/' element={<MemberDashboardLayout />}>
            <Route path='' index element={<MemberDashboard />} />
            <Route path='MemberProfile' element={<MemberProfile />} />
          </Route>
          <Route path='*' element={<h1>Error 404 Page not Found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
