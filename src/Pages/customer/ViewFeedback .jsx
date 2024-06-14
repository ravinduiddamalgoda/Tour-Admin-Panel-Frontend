import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../../Components/customer/Navbar';
import instance from '../../api';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken) {
            setUserID(decodedToken.UserID); // Assuming the token contains a UserID field
          }
        } catch (error) {
          setUserID(null);
          setError('Invalid token');
        }
      } else {
        setUserID(null);
        setError('No access token found');
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      const fetchFeedbacks = async () => {
        try {
          const response = await instance.get(`/feedback/getFeedbackByUser/${userID}`);
          setFeedbacks(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching feedbacks:', error);
          setError('Error fetching feedbacks');
          setLoading(false);
        }
      };

      fetchFeedbacks();
    }
  }, [userID]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

  return (
    <div className='flex flex-row'>
      <Navbar activeItem="view-feedback" />
      <div className='flex-grow p-4'>
        <h1 className="text-2xl font-semibold mb-4">Feedbacks</h1>
        {feedbacks.length === 0 ? (
          <p>No feedbacks found.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Trip ID</th>
                <th className="py-2 px-4 border">Rating</th>
                <th className="py-2 px-4 border">Comment</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback.FeedbackID}>
                  <td className="py-2 px-4 border">{feedback.TripID}</td>
                  <td className="py-2 px-4 border">{feedback.Rating}</td>
                  <td className="py-2 px-4 border">{feedback.Comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;
