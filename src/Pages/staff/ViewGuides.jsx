import React, { useEffect, useState } from 'react';
import StaffSideBar from '../../Components/staff/StaffSideBar';
import instance from '../../api'; // Adjust the path as needed

const ViewGuides = () => {
    const [guides, setGuides] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchGuides();
    }, []);

    const fetchGuides = async () => {
        try {
            const response = await instance.get('user/getAllGuides');
            setGuides(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching guides:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGuides = guides.filter(guide =>
        guide.EndDate && guide.EndDate.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex flex-row'>
            <StaffSideBar activeItem="guides" />
            <div className='flex-grow p-4'>
                <h1 className="text-2xl font-semibold mb-4">Guides</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by End Date"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 bg-white p-2 rounded-md w-full"
                    />
                </div>
                {filteredGuides.length === 0 ? (
                    <p>No guides found.</p>
                ) : (
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">User ID</th>
                                <th className="py-2 px-4 border">First Name</th>
                                <th className="py-2 px-4 border">Last Name</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Phone Number</th>
                                <th className="py-2 px-4 border">Vehicle ID</th>
                                <th className="py-2 px-4 border">Vehicle Type</th>
                                {/* <th className="py-2 px-4 border">Vehicle Model</th>
                                <th className="py-2 px-4 border">Registration Number</th>
                                <th className="py-2 px-4 border">Languages</th>
                                <th className="py-2 px-4 border">Guide Type</th> */}
                                <th className="py-2 px-4 border">Qualifications</th>
                                <th className="py-2 px-4 border">Start Date</th>
                                <th className="py-2 px-4 border">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGuides.map(guide => (
                                <tr key={guide.UserID}>
                                    <td className="py-2 px-4 border">{guide.UserID}</td>
                                    <td className="py-2 px-4 border">{guide.FirstName}</td>
                                    <td className="py-2 px-4 border">{guide.LastName}</td>
                                    <td className="py-2 px-4 border">{guide.Email}</td>
                                    <td className="py-2 px-4 border">{guide.PhoneNumber}</td>
                                    <td className="py-2 px-4 border">{guide.VehicleID}</td>
                                    <td className="py-2 px-4 border">{guide.VehicleType}</td>
                                    <td className="py-2 px-4 border">{guide.VehicleModel}</td>
                                    {/* <td className="py-2 px-4 border">{guide.RegistrationNumber}</td>
                                    <td className="py-2 px-4 border">{guide.Languages}</td>
                                    <td className="py-2 px-4 border">{guide.GuiType}</td>
                                    <td className="py-2 px-4 border">{guide.Qualifications}</td> */}
                                    <td className="py-2 px-4 border">{guide.StartDate.split('T')[0]}</td>
                                    <td className="py-2 px-4 border">{guide.EndDate.split('T')[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ViewGuides;
