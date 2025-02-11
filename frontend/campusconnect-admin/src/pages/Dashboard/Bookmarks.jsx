import React from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout";

const Bookmarks = () => {
  return (
    <DashboardLayout activeMenu="Add User">
      <div className="bg-gray-100/80 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Add User</h2>
        <div className="mt-3"></div>
      </div>
    </DashboardLayout>
  );
};

export default Bookmarks
