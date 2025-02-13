import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    profilePic: "",
    age: "",
    bio: "",
    mobile_no: "",
    dob: "",
    religion: "",
    maritalStatus: "",
    motherTongue: "",
    nationality: "",
    education: "",
    occupation: "",
    income: "",
    city: "",
    state: "",
    country: "",
    height: "",
    weight: "",
    hobbies: "",
    you_live_with_family: false,
    diet: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", formData);
      console.log("Signup successful:", response.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
          />
          <input
            type="text"
            name="mobile_no"
            placeholder="Mobile Number"
            value={formData.mobile_no}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          />
          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Religion</option>
            <option value="hindu">Hindu</option>
            <option value="muslim">Muslim</option>
            <option value="christian">Christian</option>
            <option value="sikh">Sikh</option>
            <option value="jain">Jain</option>
            <option value="buddhist">Buddhist</option>
            <option value="other">Other</option>
          </select>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          <select
            name="motherTongue"
            value={formData.motherTongue}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Mother Tongue</option>
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
            <option value="punjabi">Punjabi</option>
            <option value="bengali">Bengali</option>
            <option value="tamil">Tamil</option>
            <option value="telugu">Telugu</option>
            <option value="marathi">Marathi</option>
            <option value="urdu">Urdu</option>
            <option value="kannada">Kannada</option>
            <option value="gujarati">Gujarati</option>
            <option value="odisha">Odisha</option>
            <option value="malayalam">Malayalam</option>
            <option value="other">Other</option>
          </select>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Nationality</option>
            <option value="indian">Indian</option>
            <option value="american">American</option>
            <option value="british">British</option>
            <option value="australian">Australian</option>
            <option value="canadian">Canadian</option>
            <option value="other">Other</option>
          </select>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Education</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="diploma">Diploma</option>
            <option value="graduation">Graduation</option>
            <option value="post-graduation">Post Graduation</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </select>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Occupation</option>
            <option value="student">Student</option>
            <option value="business">Business</option>
            <option value="job">Job</option>
            <option value="self-employed">Self Employed</option>
            <option value="not-working">Not Working</option>
            <option value="other">Other</option>
          </select>
          <select
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Income</option>
            <option value="0-2.5L">0-2.5L</option>
            <option value="2.5-5L">2.5-5L</option>
            <option value="5-7.5L">5-7.5L</option>
            <option value="7.5-10L">7.5-10L</option>
            <option value="10-15L">10-15L</option>
            <option value="15-20L">15-20L</option>
            <option value="20-30L">20-30L</option>
            <option value="30-50L">30-50L</option>
            <option value="50L+">50L+</option>
          </select>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select City</option>
            <option value="surat">Surat</option>
            <option value="vadodara">Vadodara</option>
            <option value="rajkot">Rajkot</option>
            <option value="bhavnagar">Bhavnagar</option>
            <option value="jamnagar">Jamnagar</option>
            <option value="other">Other</option>
          </select>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select State</option>
            <option value="gujarat">Gujarat</option>
            <option value="punjab">Punjab</option>
            <option value="haryana">Haryana</option>
            <option value="delhi">Delhi</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="karnataka">Karnataka</option>
            <option value="tamil Nadu">Tamil Nadu</option>
            <option value="other">Other</option>
          </select>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Country</option>
            <option value="india">India</option>
            <option value="united States">United States</option>
            <option value="united Kingdom">United Kingdom</option>
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="other">Other</option>
          </select>
          <select
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Height</option>
            <option value="4'5">4'5</option>
            <option value="4'6">4'6</option>
            <option value="4'7">4'7</option>
            <option value="4'8">4'8</option>
            <option value="4'9">4'9</option>
            <option value="4'10">4'10</option>
            <option value="4'11">4'11</option>
            <option value="5'0">5'0</option>
            <option value="5'1">5'1</option>
            <option value="5'2">5'2</option>
            <option value="5'3">5'3</option>
            <option value="5'4">5'4</option>
            <option value="5'5">5'5</option>
            <option value="5'6">5'6</option>
            <option value="5'7">5'7</option>
            <option value="5'8">5'8</option>
            <option value="5'9">5'9</option>
            <option value="5'10">5'10</option>
            <option value="5'11">5'11</option>
            <option value="6'0">6'0</option>
            <option value="6'1">6'1</option>
            <option value="6'2">6'2</option>
            <option value="6'3">6'3</option>
            <option value="6'4">6'4</option>
            <option value="6'5">6'5</option>
            <option value="6'6">6'6</option>
            <option value="6'7">6'7</option>
            <option value="6'8">6'8</option>
            <option value="6'9">6'9</option>
            <option value="6'10">6'10</option>
            <option value="6'11">6'11</option>
            <option value="7'0">7'0</option>
          </select>
          <select
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Weight</option>
            <option value="40-45">40-45</option>
            <option value="45-50">45-50</option>
            <option value="50-55">50-55</option>
            <option value="55-60">55-60</option>
            <option value="60-65">60-65</option>
            <option value="65-70">65-70</option>
            <option value="70-75">70-75</option>
            <option value="75-80">75-80</option>
            <option value="80-85">80-85</option>
            <option value="85-90">85-90</option>
            <option value="90-95">90-95</option>
            <option value="95-100">95-100</option>
            <option value="100+">100+</option>
          </select>
          <select
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Hobbies</option>
            <option value="reading">Reading</option>
            <option value="writing">Writing</option>
            <option value="painting">Painting</option>
            <option value="singing">Singing</option>
            <option value="dancing">Dancing</option>
            <option value="cooking">Cooking</option>
            <option value="travelling">Travelling</option>
            <option value="photography">Photography</option>
            <option value="gardening">Gardening</option>
            <option value="other">Other</option>
          </select>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="you_live_with_family"
              checked={formData.you_live_with_family}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-white">You Live with Family</label>
          </div>
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            required
          >
            <option value="">Select Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="eggetarian">Eggetarian</option>
            <option value="vegan">Vegan</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account? <Link to="/" className="text-blue-400">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;