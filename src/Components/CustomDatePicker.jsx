import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ field, form, startDate, ...props }) => {
  const handleChange = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`; // Format date as YYYY-MM-DD
      form.setFieldValue(field.name, formattedDate);
    } else {
      form.setFieldValue(field.name, '');
    }
  };

  return (
    <DatePicker
      {...field}
      {...props}
      selected={field.value ? new Date(field.value) : null}
      onChange={handleChange}
      minDate={new Date()} // Set minimum selectable date to today
      startDate={startDate ? new Date(startDate) : null} // Convert startDate prop to Date object if provided
      className="border-black bg-white border w-full p-2 rounded-md"
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default CustomDatePicker;
