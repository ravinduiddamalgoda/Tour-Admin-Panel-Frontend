import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/customer/Navbar';
import instance from '../../api'; 
import CurrentTripsSection from '../../Components/customer/CurrentTripsSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';
function PreviousTrips() {
  const [previousTrips, setPreviousTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTripID, setSelectedTripID] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    fetchPreviousTrips();
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserID(decoded.id);
    }
  }, []);

  const fetchPreviousTrips = async () => {
    try {
      const response = await instance.get('/trip/get/getPreviousTrips');
      setPreviousTrips(response.data);
    } catch (error) {
      console.error('Failed to fetch previous trips:', error);
    }
  };

  const handleFeedbackClick = (tripID) => {
    setSelectedTripID(tripID);
    setShowModal(true);
  };

  const handleFeedbackSubmit = async () => {
    if (!rating || !comment) {
      toast.error('Please provide a rating and a comment');
      return;
    }

    try {
      await instance.post('/feedback/add', { UserID: userID, TripID: selectedTripID, Rating: rating, Comment: comment });
      setShowModal(false);
      setRating('');
      setComment('');
      toast.success('Feedback submitted successfully');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <div className='flex'>
      <div className= "w-[25%]">
        <Navbar activeItem={"previous-trip"}/>
      </div>
      <div className= "w-[2px] bg-[#F69412]">
      </div>
      <div className="bg-[#EFEFEF] pl-5 w-lvw">
        <h1 className="text-2xl font-semibold mb-4">Previous Trips</h1>
        {previousTrips.length === 0 ? (
          <p>No Data To Display</p>
        ) : (
          <CurrentTripsSection trips={previousTrips} handleFeedbackClick={handleFeedbackClick} />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-4 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add Feedback</h2>
            <div className="mb-4">
              <label className="block mb-1">Rating:</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border border-gray-300 bg-white p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border border-gray-300 bg-white p-2 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default PreviousTrips;
