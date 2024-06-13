import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../api';
import Chat from '../../Components/staff/Chat';
import {jwtDecode} from 'jwt-decode';
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
    <div className="flex flex-row">
      <ToastContainer />
      <Navbar activeItem="inquiry" />
      <div className="flex flex-col min-w-fit max-w-fit p-6">
        <h1 className="text-2xl font-bold mb-6">Inquiries</h1>
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
            <button className="absolute top-10 right-56 text-black text-3xl font-bold" onClick={() => setShowChatModal(false)}>
              CLOSE X
            </button>
            <Chat inquiryID={selectedInquiryID} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryPage;
