import React, { useState, useEffect } from 'react';
import Logout from '../../Assets/icons/logout.png';
import Profile from '../../Assets/icons/profile.png';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import PaidIcon from '@mui/icons-material/Paid';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LoopIcon from '@mui/icons-material/Loop';
import HistoryIcon from '@mui/icons-material/History';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ activeItem }) => {
  const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') || activeItem);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  const handleLinkClick = (link) => (event) => {
    event.preventDefault(); // Prevent default navigation behavior
    setActiveLink(link); // Update active link
    localStorage.setItem('activeLink', link);
    if (link === 'logout') {
      localStorage.removeItem("access_token");
      localStorage.removeItem("activeLink");
    }
    const targetLink = link === 'logout' ? 'login' : link === 'dashboard' ? 'admin-dashboard' : `admin/${link}`;
    navigate(targetLink === 'login' ? '/login' : `/${targetLink}`);
  };

  const checkUsername = async () => {
    const storedData = localStorage.getItem('access_token');
    if (storedData) {
      try {
        const decodedToken = jwtDecode(storedData);
        if (decodedToken) {
          setUserName(decodedToken.name);
        }
      } catch (error) {
        setUserName(null);
      }
    } else {
      setUserName(null);
    }
  };

  useEffect(() => {
    checkUsername();
  }, []);

  return (
    <nav className="h-screen overflow-y-auto bg-white text-black w-50 flex flex-col justify-between items-center">
      <div className='w-full'>
        <div className='mt-8 mb-[55px] flex px-[10%]'>
          <img src={Profile} alt="Profile" className={`w-[72px] h-[72px]`} />
          <div className='pl-5 flex items-center'>
            <div>
              <h1 className='font-semibold'>Hi,</h1>
              <h1 className=" font-bold text-xl">{userName}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col  items-center">

          <div className={`border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "dashboard" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('dashboard')} className='flex items-center w-full'>
              <div className='p-3'><DashboardIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Dashboard</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "user" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('user')} className='flex items-center w-full'>
              <div className='p-3'><PersonIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>User Management</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "tourpackage" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('tourpackage')} className='flex items-center w-full'>
              <div className='p-3'><ModeOfTravelIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Tour Package</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "hotel" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('hotel')} className='flex items-center w-full'>
              <div className='p-3'><HomeWorkIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Hotels</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "payment" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('payment')} className='flex items-center w-full'>
              <div className='p-3'><PaidIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Payment</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "feedback" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('feedback')} className='flex items-center w-full'>
              <div className='p-3'><RateReviewIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Feedback</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "ongoing-trip" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('ongoing-trip')} className='flex items-center w-full'>
              <div className='p-3'><LoopIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Ongoing Trip</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "previous-trip" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('previous-trip')} className='flex items-center w-full'>
              <div className='p-3'><HistoryIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Previous Trip</h1>
            </button>
          </div>

          <div className={`mt-6 border border-[#DADADA] w-[85%] h-[60px] flex items-center ${activeLink === "guide" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#FFEEEF]'} rounded-lg`}>
            <button onClick={handleLinkClick('guide')} className='flex items-center w-full'>
              <div className='p-3'><DirectionsRunIcon /></div>
              <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px]'>Guide</h1>
            </button>
          </div>

        </div>
      </div>
      <div className={`mt-6 mb-10 bg-[#820008] w-[85%] h-[60px] flex items-center ${activeLink === "logout" ? 'bg-[#FFEEEF] border-transparent' : 'hover:bg-[#820009e6]'} rounded-lg`}>
        <button onClick={handleLinkClick('logout')} className='flex items-center w-full'>
          <img src={Logout} alt="Logout" className="block p-3 w-14 h-14" />
          <h1 className='flex-1 text-center overflow-hidden whitespace-nowrap -ml-4 text-[18px] text-white'>Logout</h1>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
