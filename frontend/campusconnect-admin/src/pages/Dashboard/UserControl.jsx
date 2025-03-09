import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const UserControl = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.USER_LIST);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
      try {
         if (!id || !newStatus) {
           console.error("Invalid ID or Status");
           return;
          }
          const apiUrl = API_PATHS.USERS.UPDATE_STATUS(id);
     const response = await axiosInstance.patch(apiUrl, {
       account_status: newStatus,
     });
           console.log("Status updated:", response.data);
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error(
        "Error updating status",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <DashboardLayout activeMenu="User Control">
      <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">User Type</th>
                  <th className="p-3 text-left">Account Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.user_type}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-white ${
                          user.account_status === "active"
                            ? "bg-green-500"
                            : user.account_status === "deactivate"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user.account_status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        className="p-2 border rounded"
                        value={user.account_status}
                        onChange={(e) =>
                          handleStatusChange(user._id, e.target.value)
                        }
                      >
                        <option value="active">Activate</option>
                        <option value="deactivate">Deactivate</option>
                        {/* <option value="suspended">Suspended</option> */}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserControl;
