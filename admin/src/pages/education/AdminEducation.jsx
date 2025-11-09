import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

import {
  deleteExperience,
  getExperience,
} from "../../Redux/ActionCreartors/ExperienceActionCreators";

export default function AdminExperience() {
  const ExperienceStateData = useSelector((state) => state.ExperienceStateData);
  const dispatch = useDispatch();

  // ✅ Delete Experience
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      dispatch(deleteExperience({ _id }));
      getAPIData();
    }
  };

  // ✅ Fetch & Initialize DataTable
  const getAPIData = () => {
    dispatch(getExperience());
    const timer = setTimeout(() => {
      if ($.fn.DataTable.isDataTable("#ExperienceTable")) {
        $("#ExperienceTable").DataTable().destroy();
      }
      $("#ExperienceTable").DataTable({
        responsive: true,
        autoWidth: false,
        pageLength: 8,
        language: {
          searchPlaceholder: "Search experience...",
          search: "",
        },
      });
    }, 400);
    return timer;
  };

  // ✅ Load data on mount
  useEffect(() => {
    const timer = getAPIData();
    return () => clearTimeout(timer);
  }, [ExperienceStateData.length]);

  return (
    <div className="admin-skill-container p-3">
      {/* 🔹 Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
        <h5 className="mb-2 mb-md-0 fw-semibold text-light">
          <i className="fa fa-briefcase me-2"></i> Experience Management
        </h5>
        <Link
          to="/experience/create"
          className="btn btn-light text-primary fw-semibold shadow-sm"
        >
          <i className="fa fa-plus me-1"></i> Add Experience
        </Link>
      </div>

      {/* 🔹 Table Section */}
      <div className="table-responsive mt-4">
        <table
          id="ExperienceTable"
          className="table table-striped table-bordered align-middle shadow-sm responsive-table"
        >
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Start</th>
              <th>End</th>
              <th>Description</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {ExperienceStateData.length > 0 ? (
              ExperienceStateData.map((item, i) => (
                <tr key={item._id || i}>
                  {/* ID */}
                  <td data-label="ID" className="text-muted small">
                    {item._id}
                  </td>

                  {/* Job Title */}
                  <td data-label="Job Title" className="fw-semibold">
                    {item.jobTitle}
                  </td>

                  {/* Company */}
                  <td data-label="Company">{item.companyName}</td>

                  {/* Dates */}
                  <td data-label="Start" className="text-center">
                    {item.startDate}
                  </td>
                  <td data-label="End" className="text-center">
                    {item.endDate}
                  </td>

                  {/* Description */}
                  <td
                    data-label="Description"
                    className="text-truncate description-cell"
                  >
                    {item.description || "—"}
                  </td>

                  {/* Status */}
                  <td data-label="Status">
                    <span
                      className={`badge px-3 py-2 ${
                        item.active ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ✏️ Edit Button */}
                  <td data-label="Edit" className="text-center">
                    <Link
                      to={`/experience/update/${item._id}`}
                      className="table-action-btn edit"
                      title="Edit Experience"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                  </td>

                  {/* 🗑️ Delete Button */}
                  <td data-label="Delete" className="text-center">
                    <button
                      className="table-action-btn delete"
                      title="Delete Experience"
                      onClick={() => deleteRecord(item._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">
                  <i className="fa fa-spinner fa-spin me-2"></i> Loading
                  experience records...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
