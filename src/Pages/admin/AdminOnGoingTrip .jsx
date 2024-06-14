import React, { useEffect, useState } from 'react';
import StaffSideBar from '../../Components/staff/StaffSideBar';
import instance from '../../api'; // Adjust the path as needed
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Components/admin/Navbar';

const AdminOnGoingTrip = () => {
    const [ongoingTrips, setOngoingTrips] = useState([]);
    const [paidAmounts, setPaidAmounts] = useState({});

    useEffect(() => {
        fetchOngoingTrips();
    }, []);

    const fetchOngoingTrips = async () => {
        try {
            const response = await instance.get('/trip/get/onGoingTrips');
            setOngoingTrips(response.data);
            response.data.forEach(trip => fetchPaidAmount(trip.TripID));
        } catch (error) {
            console.error('Error fetching ongoing trips:', error);
        }
    };

    const fetchPaidAmount = async (tripId) => {
        try {
            const response = await instance.get(`/customerPayment/getTotalPaymentByTripID/${tripId}`);
            setPaidAmounts(prevState => ({
                ...prevState,
                [tripId]: response.data.TotalPayment
            }));
        } catch (error) {
            console.error('Error fetching paid amount:', error);
        }
    };

    return (
        <div className='flex flex-row'>
        <div className="w-[25%]">
            <Navbar activeItem="ongoingtrip" />
        </div>
            
            <div className='flex-grow p-4'>
                <ToastContainer />
                <h1 className="text-2xl font-semibold mb-4">Ongoing Trips</h1>
                {ongoingTrips.length === 0 ? (
                    <p>No ongoing trips found.</p>
                ) : (
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Trip ID</th>
                                <th className="py-2 px-4 border">Customer ID</th>
                                <th className="py-2 px-4 border">Guide ID</th>
                                <th className="py-2 px-4 border">Start Date</th>
                                <th className="py-2 px-4 border">End Date</th>
                                <th className="py-2 px-4 border">Status</th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Paid Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ongoingTrips.map(trip => (
                                <tr key={trip.TripID}>
                                    <td className="py-2 px-4 border">{trip.TripID}</td>
                                    <td className="py-2 px-4 border">{trip.CustomerID}</td>
                                    <td className="py-2 px-4 border">{trip.GuideID}</td>
                                    <td className="py-2 px-4 border">{trip.StartDate.split('T')[0]}</td>
                                    <td className="py-2 px-4 border">{trip.EndDate.split('T')[0]}</td>
                                    <td className="py-2 px-4 border">{trip.Status}</td>
                                    <td className="py-2 px-4 border">{trip.Price}</td>
                                    <td className="py-2 px-4 border">{paidAmounts[trip.TripID] || 'Loading...'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminOnGoingTrip;
