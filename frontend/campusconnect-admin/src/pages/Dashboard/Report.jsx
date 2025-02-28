import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Report = () => {
  const [uncheckedReports, setUncheckedReports] = useState([]);
  const [checkedReports, setCheckedReports] = useState([]);
  const [activeTab, setActiveTab] = useState("unchecked");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.GET_ALL);
      if (response.data.success) {
        const reports = response.data.reports;
        setUncheckedReports(
          reports.filter((report) => report.report_status === "not-checked")
        );
        setCheckedReports(
          reports.filter((report) => report.report_status === "checked")
        );
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm(`Are you sure you want to delete this post ${postId}?`))
      return;
    try {
      await axiosInstance.delete(API_PATHS.REPORTS.DELETE_POST(postId));
      setUncheckedReports(
        uncheckedReports.filter((report) => report.postId._id !== postId)
      );
      setCheckedReports(
        checkedReports.filter((report) => report.postId._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const markAsChecked = async (reportId) => {
    try {
      await axiosInstance.put(API_PATHS.REPORTS.MARK_AS_CHECKED(reportId), {
        report_status: "checked",
      });
      const updatedReport = uncheckedReports.find(
        (report) => report._id === reportId
      );
      updatedReport.report_status = "checked";
      setUncheckedReports(
        uncheckedReports.filter((report) => report._id !== reportId)
      );
      setCheckedReports([...checkedReports, updatedReport]);
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };

  return (
    <DashboardLayout activeMenu="Report">
      <div className="bg-gray-100 p-5 rounded-lg mx-auto">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab("unchecked")}
            className={`px-4 py-2 rounded ${
              activeTab === "unchecked"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Unchecked Reports
          </button>
          <button
            onClick={() => setActiveTab("checked")}
            className={`px-4 py-2 rounded ${
              activeTab === "checked" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Checked Reports
          </button>
        </div>

        {activeTab === "unchecked" ? (
          <>
            <h2 className="text-lg text-black font-medium">
              Unchecked Reports
            </h2>
            <div className="mt-3 space-y-4">
              {uncheckedReports.length > 0 ? (
                uncheckedReports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <p>
                      <strong>Reported By:</strong> {report.reportedBy.username}{" "}
                      ({report.reportedBy.email})
                    </p>
                    <p>
                      <strong>Reason:</strong> {report.reason}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="bg-red-300 px-2 py-1 rounded">
                        {report.report_status}
                      </span>
                    </p>
                    <p>
                      <strong>Post:</strong>{" "}
                      {report.postId?.content || "Deleted Post"}
                    </p>
                    <div className="flex gap-4 mt-3">
                      {report.postId && (
                        <button
                          onClick={() => deletePost(report.postId._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete Post
                        </button>
                      )}
                      <button
                        onClick={() => markAsChecked(report._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Mark as Checked
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No unchecked reports available.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg text-black font-medium">Checked Reports</h2>
            <div className="mt-3 space-y-4">
              {checkedReports.length > 0 ? (
                checkedReports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <p>
                      <strong>Reported By:</strong> {report.reportedBy.username}{" "}
                      ({report.reportedBy.email})
                    </p>
                    <p>
                      <strong>Reason:</strong> {report.reason}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="bg-green-300 px-2 py-1 rounded">
                        {report.report_status}
                      </span>
                    </p>
                    <p>
                      <strong>Post:</strong>{" "}
                      {report.postId?.content || "Deleted Post"}
                    </p>
                  </div>
                ))
              ) : (
                <p>No checked reports available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Report;
