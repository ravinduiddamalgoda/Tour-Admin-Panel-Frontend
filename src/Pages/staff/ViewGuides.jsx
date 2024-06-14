import React, { useEffect, useState } from 'react';
import StaffSideBar from '../../Components/staff/StaffSideBar';
import instance from '../../api'; // Adjust the path as needed
import CustomDatePicker from '../../Components/CustomDatePicker'; // Import your custom date picker component
import { Formik, Field, Form } from 'formik';

const ViewGuides = () => {
    const [guides, setGuides] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
<<<<<<< Updated upstream
    const [filteredGuides, setFilteredGuides] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
=======
>>>>>>> Stashed changes

    useEffect(() => {
        fetchGuides();
    }, []);

    useEffect(() => {
        filterGuides();
    }, [searchTerm, dateRange]);

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

<<<<<<< Updated upstream
    const handleDateSubmit = (values) => {
        setDateRange(values);
        filterGuides();
    };

    const filterGuides = () => {
        const filtered = guides.filter(guide => {
            const matchesName = guide.FirstName && guide.FirstName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDateRange = dateRange.startDate && dateRange.endDate ?
                (new Date(guide.StartDate) <= new Date(dateRange.startDate) && new Date(dateRange.endDate) <= new Date(guide.EndDate)) :
                true;
                // console.log(guide.StartDate, dateRange.startDate, guide.EndDate, dateRange.endDate, matchesDateRange);
            return matchesDateRange && matchesName;
            // return matchesDateRange;
        });
        setFilteredGuides(filtered);
    };
=======
    const filteredGuides = guides.filter(guide =>
        guide.EndDate && guide.EndDate.toLowerCase().includes(searchTerm.toLowerCase())
    );
>>>>>>> Stashed changes

    return (
        <div className='flex flex-row'>
            <StaffSideBar activeItem="guides" />
            <div className='flex-grow p-4'>
                <h1 className="text-2xl font-semibold mb-4">Guides</h1>
<<<<<<< Updated upstream
                <Formik
                    initialValues={{ startDate: '', endDate: '' }}
                    onSubmit={handleDateSubmit}
                >
                    {() => (
                        <Form className="mb-4">
                            <div className="flex space-x-4">
                                <Field
                                    name="startDate"
                                    component={CustomDatePicker}
                                    placeholderText="Start Date"
                                />
                                <Field
                                    name="endDate"
                                    component={CustomDatePicker}
                                    placeholderText="End Date"
                                />
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Set Date Range
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Name"
=======
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by End Date"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                                <th className="py-2 px-4 border">Vehicle Model</th>
=======
                                {/* <th className="py-2 px-4 border">Vehicle Model</th>
                                <th className="py-2 px-4 border">Registration Number</th>
                                <th className="py-2 px-4 border">Languages</th>
                                <th className="py-2 px-4 border">Guide Type</th> */}
                                <th className="py-2 px-4 border">Qualifications</th>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
                                    {/* <td className="py-2 px-4 border">{guide.RegistrationNumber}</td>
                                    <td className="py-2 px-4 border">{guide.Languages}</td>
                                    <td className="py-2 px-4 border">{guide.GuiType}</td>
                                    <td className="py-2 px-4 border">{guide.Qualifications}</td> */}
>>>>>>> Stashed changes
                                    <td className="py-2 px-4 border">{guide.StartDate.split('T')[0]}</td>
                                    <td className="py-2 px-4 border">{guide.EndDate.split('T')[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
            </div>
        </div>
    );
};

export default ViewGuides;
