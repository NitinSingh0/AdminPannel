import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    profileImageUrl: "",
    bio: "",
    course: "",
    userRole: "",
    passingYear: "",
    user_type: "student", // Default
    account_status: "active", // Default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.POLLS.ADD_USER, formData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <DashboardLayout activeMenu="Add User">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add User
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="profileImageUrl"
            placeholder="Profile Image URL"
            value={formData.profileImageUrl}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="userRole"
            placeholder="User Role"
            value={formData.userRole}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="passingYear"
            placeholder="Passing Year / Year of joining"
            value={formData.passingYear}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
          <select
            name="account_status"
            value={formData.account_status}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="deactivate">Deactivate</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddUser;
