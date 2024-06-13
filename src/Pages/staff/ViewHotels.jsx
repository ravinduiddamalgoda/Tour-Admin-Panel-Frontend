import React, { useEffect, useState } from 'react';
import StaffSideBar from '../../Components/staff/StaffSideBar';
import instance from '../../api'; // Adjust the path as needed

const ViewHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchHotels();
    }, []);

    useEffect(() => {
        filterAndPaginateHotels();
    }, [searchTerm, hotels, currentPage]);

    const fetchHotels = async () => {
        try {
            const response = await instance.get('/hotel/');
            setHotels(response.data.hotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const filterAndPaginateHotels = () => {
        const filtered = Array.isArray(hotels) ? hotels.filter(hotel =>
            hotel.Name.toLowerCase().includes(searchTerm.toLowerCase())
        ) : [];

        setFilteredHotels(filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredHotels.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='flex flex-row'>
            <StaffSideBar activeItem="hotels" />
            <div className='flex-grow p-4'>
                <h1 className="text-2xl font-semibold mb-4">Hotels</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by hotel name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border p-2 bg-white rounded w-full"
                    />
                </div>
                {filteredHotels.length === 0 ? (
                    <p>No hotels found.</p>
                ) : (
                    <div>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Hotel ID</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Type</th>
                                    <th className="py-2 px-4 border">Phone Number</th>
                                    <th className="py-2 px-4 border">Description</th>
                                    <th className="py-2 px-4 border">Packages</th>
                                    <th className="py-2 px-4 border">Address</th>
                                    <th className="py-2 px-4 border">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHotels.map(hotel => (
                                    <tr key={hotel.HotelID}>
                                        <td className="py-2 px-4 border">{hotel.HotelID}</td>
                                        <td className="py-2 px-4 border">{hotel.Name}</td>
                                        <td className="py-2 px-4 border">{hotel.HotType}</td>
                                        <td className="py-2 px-4 border">{hotel.PhoneNumber}</td>
                                        <td className="py-2 px-4 border">{hotel.HotDesc}</td>
                                        <td className="py-2 px-4 border">{hotel.Packages}</td>
                                        <td className="py-2 px-4 border">{hotel.Address}</td>
                                        <td className="py-2 px-4 border">{hotel.Email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {Math.ceil(hotels.length / itemsPerPage)}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === Math.ceil(hotels.length / itemsPerPage)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewHotels;
