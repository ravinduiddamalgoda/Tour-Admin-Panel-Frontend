import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../api';
import Chat from '../../Components/staff/Chat';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Components/customer/Navbar';

const InquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedInquiryID, setSelectedInquiryID] = useState(null);
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserID(decoded.id);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      fetchInquiries();
    }
  }, [userID]);

  const fetchInquiries = async () => {
    try {
      const response = await instance.get(`/inquiry/getInquiryByUserID/${userID}`);
      if (response.data.length === 0) {
        toast.info('No inquiries found');
      } else {
        setInquiries(response.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch inquiries');
    }
  };

  const handleChatClick = (inquiryID) => {
    setSelectedInquiryID(inquiryID);
    setShowChatModal(true);
  };

  return (
    <>
      <ToastContainer />
      <div className='flex flex-row'>
        <div className="w-[25%]">
          <Navbar activeItem={"inquiry"} />
        </div>
        <div className="w-[2px] bg-[#F69412]"></div>
        <div className='bg-[#EFEFEF] w-full overflow-auto h-screen'>
          <div className='bg-[#D9D9D9] flex items-center h-[8%]  pl-5'>
            <h1 className="text-2xl font-semibold">Inquiries</h1>
          </div>
          <div className='mb-5 p-4'>
            <div className='flex-col mt-10 px-5'>
              {inquiries.length === 0 ? (
                <div className="text-center text-gray-500">No inquiries found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-fit bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Inquiry Date</th>
                        <th className="py-2 px-4 border-b">Arrival Date</th>
                        <th className="py-2 px-4 border-b">Departure Date</th>
                        <th className="py-2 px-4 border-b">Message</th>
                        <th className="py-2 px-4 border-b">Adults Count</th>
                        <th className="py-2 px-4 border-b">Children Count</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry.InquiryID}>
                          <td className="py-2 px-4 border-b">{inquiry.InquiryDate.split('T')[0]}</td>
                          <td className="py-2 px-4 border-b">{inquiry.ArrivalDate.split('T')[0]}</td>
                          <td className="py-2 px-4 border-b">{inquiry.DepartureDate.split('T')[0]}</td>
                          <td className="py-2 px-4 border-b">{inquiry.Message}</td>
                          <td className="py-2 px-4 border-b">{inquiry.AdultsCount}</td>
                          <td className="py-2 px-4 border-b">{inquiry.ChildrenCount}</td>
                          <td className="py-2 px-4 border-b">{inquiry.Status}</td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleChatClick(inquiry.InquiryID)}
                              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                            >
                              Chat
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {showChatModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-md p-4 w-full max-w-lg h-3/4 overflow-y-auto">
                  <button className="absolute top-4 right-4 text-red-700 text-3xl font-bold" onClick={() => setShowChatModal(false)}>
                    X
                  </button>
                  <Chat inquiryID={selectedInquiryID} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryPage;
