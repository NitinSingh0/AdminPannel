import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Report = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.GET_ALL);
      if (response.data.success) {
        setReports(response.data.reports);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(API_PATHS.REPORTS.DELETE_POST(postId));
      setReports(reports.filter(report => report.postId._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <DashboardLayout activeMenu="Report">
      <div className="bg-gray-100 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Reported Posts</h2>
        <div className="mt-3 space-y-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div key={report._id} className="bg-white p-4 rounded-lg shadow-md">
                <p><strong>Reported By:</strong> {report.reportedBy.username} ({report.reportedBy.email})</p>
                <p><strong>Reason:</strong> {report.reason}</p>
                <p><strong>Status:</strong> <span className={`px-2 py-1 rounded ${report.report_status === "checked" ? "bg-green-300" : "bg-red-300"}`}>{report.report_status}</span></p>
                <p><strong>Post:</strong> {report.postId?.content || "Deleted Post"}</p>
                <div className="flex gap-4 mt-3">
                  {report.postId && (
                    <button onClick={() => deletePost(report.postId._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete Post
                    </button>
                  )}
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Mark as Checked
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No reports available.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Report;
