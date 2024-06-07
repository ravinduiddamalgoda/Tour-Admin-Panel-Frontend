import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import LoginPage from './Pages/Login';
import Tours from './Pages/Tours';
import AboutUs from './Pages/Aboutus';
import Testimonials from './Pages/Testimonials';
import Inquire from './Pages/Inquire';
import CustomerDashboard from './Pages/customer/customerDashboard';
import CustomerCurrent from './Pages/customer/currentTrips';
import CustomerPrevious from './Pages/customer/previousTrips';
import CustomerFeedback from './Pages/customer/feedback';
import AdminDashboard from './Pages/admin/AdminDashboard';
import StaffDashboard from './Pages/staff/StaffDashboard';
import UserManagement from './Pages/admin/UserManagement';
import FeedbackPage from './Pages/admin/FeedbackPage';
import GuideDashboard from './Pages/guide/GuideDashboard';
import HotelManagement from './Pages/admin/HotelManagement';
import TourPackage from './Pages/admin/TourPackage';
import ProtectedAdminRoute from './Routes/ProtectedAdminRoute';
import ProtectedGuideRoute from './Routes/ProtectedGuideRoute';
import ProtectedCustomertRoute from './Routes/ProtectedCustomerRoute';
import ProtectedStaffRoute from './Routes/ProtectedStaffRoute';
import TourManage from './Pages/staff/TourManage';
import ViewTours from './Components/guide/ViewTours';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/login" element={<LoginPage />}/>
        <Route exact path="/tours" element={<Tours />}/>
        <Route exact path="/about-us" element={<AboutUs />}/>
        <Route exact path="/testimonials" element={<Testimonials />}/>
        <Route exact path="/inquire" element={<Inquire />}/>
        <Route element={<ProtectedCustomertRoute/>}>
          <Route exact path="/Customer-Dashboard" element={<CustomerDashboard />}/>
          <Route exact path="/Customer-Dashboard/current-trip" element={<CustomerCurrent />}/>
          <Route exact path="/Customer-Dashboard/previous-trips" element={<CustomerPrevious />}/>
          <Route exact path="/Customer-Dashboard/feedback" element={<CustomerFeedback />}/>
        </Route>
        <Route element={<ProtectedAdminRoute/>}>
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path='/admin/user' element={<UserManagement/>}/>
          <Route path='/admin/feedback' element={<FeedbackPage/>}/>
          <Route path='/admin/hotel' element={<HotelManagement/>}/>
          <Route path='/admin/tourpackage' element={<TourPackage/>}/>
        </Route>
        
        <Route element={<ProtectedGuideRoute/>}>
        <Route path='/guide-dashboard' element={<GuideDashboard/>}/>
        <Route path='/guide-dashboard/tours' element={<ViewTours/>}/>
        </Route>

        <Route element={<ProtectedStaffRoute/>}>
        <Route path='/staff-dashboard' element={<StaffDashboard/>}/>
        <Route path='/staff/tour' element={<TourManage/>}/>
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
