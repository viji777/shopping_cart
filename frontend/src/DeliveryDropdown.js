import React from 'react';

const DeliveryDropdown = ({ handleDeliveryChange }) => {
  const handleChange = (e) => {
    const selectedOption = e.target.value;
    handleDeliveryChange(selectedOption);
  };

  return (
    <div className="relative inline-block">
      <select
        className="block appearance-none text-lg w-full bg-white border border-none text-gray-500 py-2 px-3 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-black-400"
        onChange={handleChange}
      >
        <option value="standard">Standard Delivery - $5.00</option>
        <option value="fast">Fast Delivery - $10.00</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-500">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 12l-8-8 1.5-1.5L10 9.998 16.5 2.5 18 4l-8 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default DeliveryDropdown;
