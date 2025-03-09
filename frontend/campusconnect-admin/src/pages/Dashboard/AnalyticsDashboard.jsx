import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsDashboard = () => {
  const [userData, setUserData] = useState([]); // Default value as empty array
  const [postData, setPostData] = useState([]); // Default value as empty array
  const [pollData, setPollData] = useState([]); // Default value as empty array
  const [reportData, setReportData] = useState([]); // Default value as empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from backend
        const userRes = await axiosInstance.get(API_PATHS.ANALYTICS.USER);
        const postRes = await axiosInstance.get(API_PATHS.ANALYTICS.POST);
        const pollRes = await axiosInstance.get(API_PATHS.ANALYTICS.POLL);
        const reportRes = await axiosInstance.get(API_PATHS.ANALYTICS.REPORT);

        console.log("User Data:", userRes.data);
        console.log("Post Data:", postRes.data);
        console.log("Poll Data:", pollRes.data);
        console.log("Report Data:", reportRes.data);

        // Helper function to format month and year
        const formatMonthYear = (month, year) => {
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return `${months[month - 1]} ${year}`; // e.g., "January 2023"
        };

        // Format user data
        setUserData(
          userRes.data.usersByMonth.map((item) => ({
            _id: formatMonthYear(item._id.month, item._id.year), // Format month and year
            count: item.count,
          }))
        );

        // Format post data
        setPostData(
          postRes.data.postsByMonth.map((item) => ({
            _id: formatMonthYear(item._id.month, item._id.year), // Format month and year
            count: item.count,
          }))
        );

        // Format poll data
        setPollData(
          pollRes.data.pollsByMonth.map((item) => ({
            _id: formatMonthYear(item._id.month, item._id.year), // Format month and year
            count: item.count,
          }))
        );

        // Format report data
        setReportData(
          reportRes.data.reportsByMonth.map((item) => ({
            _id: formatMonthYear(item._id.month, item._id.year), // Format month and year
            count: item.count,
          }))
        );
      } catch (error) {
        // In case of error, set default values to avoid breaking the UI
        console.error("Error fetching data:", error);
        setUserData([{ _id: "No data", count: 0 }]); // Example default value
        setPostData([{ _id: "No data", count: 0 }]);
        setPollData([{ _id: "No data", count: 0 }]);
        setReportData([{ _id: "No data", count: 0 }]);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout activeMenu="Analytics">
      <div>
        <h2>User Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userData}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <h2>Post Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={postData}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <h2>Poll Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pollData}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>

        <h2>Report Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#d32f2f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;
