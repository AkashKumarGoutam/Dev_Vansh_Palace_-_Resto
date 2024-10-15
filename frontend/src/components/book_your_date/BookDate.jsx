import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns"; // Helper from date-fns for date manipulation

function BookDate() {
  // Track form field values in state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    selectedDate: null,
    purpose: "",
    selectedServices: {
      catering: false,
      musicSystem: false,
      makeUpServices: false,
    },
  });
  const navigate = useNavigate()

  // Example list of booked dates (can be fetched from the backend)
  const bookedDates = [
    new Date(2024, 9, 20), // Example date: 20th October 2024
    new Date(2024, 9, 21), // Example date: 21st October 2024
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes for services
  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      selectedServices: {
        ...formData.selectedServices,
        [name]: checked,
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/booking/bookDate", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Booking saved successfully!");
        navigate("/")
      } else {
        alert("Failed to save booking.");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("An error occurred while saving the booking.");
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://t4.ftcdn.net/jpg/05/00/46/55/360_F_500465525_3ZnkH07UGyAEasz7LpPCnnP0gw4GIVNH.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
          zIndex: -1,
        }}
      ></div>

      <div className="flex justify-between px-6 py-2 bg-gray-900 text-white">
        <Link
          to="/"
          className="bg-blue-800 text-white p-2 rounded-lg hover:bg-black transition duration-300"
        >
          Home
        </Link>
        <h1 className="text-4xl font-semibold">
          Dev Vansh <span className="text-yellow-400">Palace</span>{" "}
          <span className="text-blue-300">&</span>{" "}
          <span className="text-yellow-400">Restaurant</span>
        </h1>
      </div>

      <marquee>
        <h1 className="text-red-900">
          <span className="uppercase cursor-pointer bg-red-600 text-white rounded-xl px-3">
            🪔 Diwali Offer!
          </span>
          <span className="text-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
            dicta earum tempore repellendus fugiat nesciunt officia nam
            assumenda expedita repudiandae!
          </span>
        </h1>
      </marquee>

      <div className="flex justify-center items-center">
        <form className="lg:w-[40%] flex justify-center bg-gray-700 items-center border-2 border-gray-300 rounded-lg my-6" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-lg font-semibold underline uppercase text-blue-300 flex justify-center items-center">
              Book Your Dates
            </h1>

            <div className="flex flex-col py-2">
              <label className="text-lg font-semibold text-white">Name:</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name..."
                className="px-2 w-96 py-1 border-2 hover:border-blue-400 transition duration-300 border-gray-100 rounded-lg bg-gray-100"
              />
            </div>

            <div className="flex flex-col py-2">
              <label className="text-lg font-semibold text-white">Address:</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address..."
                className="px-2 w-96 py-1 border-2 hover:border-blue-400 transition duration-300 border-gray-100 rounded-lg bg-gray-100"
              />
            </div>

            <div className="flex flex-col py-2">
              <label className="text-lg font-semibold text-white">Mob No:</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter mob no..."
                className="px-2 w-96 py-1 border-2 hover:border-blue-400 transition duration-300 border-gray-100 rounded-lg bg-gray-100"
              />
            </div>

            <div className="flex flex-col py-2">
              <label className="text-lg font-semibold text-white">Your Date:</label>
              <DatePicker
                selected={formData.selectedDate}
                onChange={(date) => setFormData({ ...formData, selectedDate: date })}
                minDate={new Date()}
                highlightDates={bookedDates}
                placeholderText="Select a date"
                className="px-2 w-96 py-1 border-2 hover:border-blue-400 transition duration-300 border-gray-100 rounded-lg bg-gray-100"
              />
              <p className="text-white mt-1">
                {bookedDates.some((d) => d.getTime() === formData.selectedDate?.getTime())
                  ? "This date is already booked."
                  : formData.selectedDate
                  ? "This date is available!"
                  : ""}
              </p>
            </div>

            <div className="flex flex-col py-2">
              <label className="text-lg font-semibold text-white">Purpose for Booking Hall:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purpose"
                  value="wedding"
                  checked={formData.purpose === "wedding"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-white">Wedding</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purpose"
                  value="party"
                  checked={formData.purpose === "party"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-white">Party</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purpose"
                  value="meeting"
                  checked={formData.purpose === "meeting"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-white">Meeting</label>
              </div>
            </div>

            <div className="flex flex-col py-2">
              <label className="text-lg font-semibold text-white">Choose your services:</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="catering"
                  checked={formData.selectedServices.catering}
                  onChange={handleServiceChange}
                  className="mr-2"
                />
                <label className="text-white">Catering</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="musicSystem"
                  checked={formData.selectedServices.musicSystem}
                  onChange={handleServiceChange}
                  className="mr-2"
                />
                <label className="text-white">Music System</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="makeUpServices"
                  checked={formData.selectedServices.makeUpServices}
                  onChange={handleServiceChange}
                  className="mr-2"
                />
                <label className="text-white">Make-up Services</label>
              </div>
            </div>

            <div className="flex justify-center py-2">
              <button type="submit" className="text-white bg-blue-600 p-2 rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookDate;
