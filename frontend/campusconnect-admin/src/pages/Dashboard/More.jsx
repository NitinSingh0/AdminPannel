import React, { useState, useEffect } from "react";
import {
  FaCog,
  FaUsers,
  FaChartLine,
  FaServer,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import DashboardLayout from "../../components/layout/DashboardLayout";

const More = () => {
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [activeUsers, setActiveUsers] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchServerStatus();
    fetchActiveUsers();
  }, []);

  const fetchServerStatus = async () => {
    try {
      // Simulate an API call
      setTimeout(() => setServerStatus("Online"), 1000);
    } catch (error) {
      setServerStatus("Offline");
    }
  };

  const fetchActiveUsers = async () => {
    try {
      // Simulate an API call
      setTimeout(() => setActiveUsers(127), 1000);
    } catch (error) {
      setActiveUsers(0);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <DashboardLayout activeMenu="More">
      <div className="bg-gray-100/80 my-5 p-6 rounded-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Admin Controls
        </h2>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3 hover:bg-gray-200 transition cursor-pointer">
            <FaCog className="text-blue-500 text-2xl" />
            <p className="text-gray-800 font-medium">Manage Settings</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3 hover:bg-gray-200 transition cursor-pointer">
            <FaUsers className="text-green-500 text-2xl" />
            <p className="text-gray-800 font-medium">User Management</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3 hover:bg-gray-200 transition cursor-pointer">
            <FaChartLine className="text-purple-500 text-2xl" />
            <p className="text-gray-800 font-medium">View Reports</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3 hover:bg-gray-200 transition cursor-pointer">
            <FaServer className="text-red-500 text-2xl" />
            <p className="text-gray-800 font-medium">Server Health</p>
          </div>
        </div>

        {/* System Info & Settings */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Server Status */}
          <div className="bg-white p-5 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">
              Server Status
            </h3>
            <p
              className={`text-xl font-bold mt-2 ${
                serverStatus === "Online" ? "text-green-500" : "text-red-500"
              }`}
            >
              {serverStatus}
            </p>
          </div>

          {/* Active Users */}
          <div className="bg-white p-5 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">
              Number of Active Users
            </h3>
            <p className="text-xl font-bold mt-2 text-blue-500">
              {activeUsers}
            </p>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-6 p-5 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Preferences
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">Enable Dark Mode</p>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-md text-white ${
                darkMode ? "bg-gray-900" : "bg-gray-400"
              }`}
            >
              {darkMode ? "Disable" : "Enable"}
            </button>
          </div>
        </div>

        {/* Help & Logout */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 shadow-lg rounded-lg flex items-center gap-3">
            <FaQuestionCircle className="text-yellow-500 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Help & Support
              </h3>
              <p className="text-gray-500 text-sm">
                Get assistance with admin tasks.
              </p>
            </div>
          </div>

          <div className="bg-red-500 text-white p-5 shadow-lg rounded-lg flex items-center gap-3 cursor-pointer hover:bg-red-600">
            <FaSignOutAlt className="text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Logout</h3>
              <p className="text-sm">Securely sign out from the admin panel.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default More;
