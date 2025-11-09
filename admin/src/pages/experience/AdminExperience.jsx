import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

import {
  deleteEducation,
  getEducation,
} from "../../Redux/ActionCreartors/EducationActionCreators";

export default function AdminEducation() {
  const EducationStateData = useSelector((state) => state.EducationStateData);
  const dispatch = useDispatch();

  // 🗑️ Delete Education
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this education record?")) {
      dispatch(deleteEducation({ _id }));
      getAPIData();
    }
  };

  // 📊 Fetch & Initialize DataTable
  const getAPIData = () => {
    dispatch(getEducation());
    const timer = setTimeout(() => {
      if ($.fn.DataTable.isDataTable("#EducationTable")) {
        $("#EducationTable").DataTable().destroy();
      }
      $("#EducationTable").DataTable({
        responsive: true,
        autoWidth: false,
        pageLength: 8,
        language: {
          searchPlaceholder: "Search education...",
          search: "",
        },
      });
    }, 400);
    return timer;
  };

  // 🔁 Fetch on Mount
  useEffect(() => {
    const timer = getAPIData();
    return () => clearTimeout(timer);
  }, [EducationStateData.length]);

  return (
    <div className="admin-skill-container p-3">
      {/* 🔹 Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
        <h5 className="mb-2 mb-md-0 fw-semibold text-light">
          <i className="fa fa-graduation-cap me-2"></i> Education Management
        </h5>
        <Link
          to="/Education/create"
          className="btn btn-light text-primary fw-semibold shadow-sm"
        >
          <i className="fa fa-plus me-1"></i> Add Education
        </Link>
      </div>

      {/* 🔹 Table Section */}
      <div className="table-responsive mt-4">
        <table
          id="EducationTable"
          className="table table-striped table-bordered align-middle shadow-sm responsive-table"
        >
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Degree</th>
              <th>Institute</th>
              <th>Start</th>
              <th>End</th>
              <th>Description</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {EducationStateData.length > 0 ? (
              EducationStateData.map((item, i) => (
                <tr key={item._id || i}>
                  {/* ID */}
                  <td data-label="ID" className="text-muted small">
                    {item._id}
                  </td>

                  {/* Degree */}
                  <td data-label="Degree" className="fw-semibold text-primary">
                    {item.degreeName}
                  </td>

                  {/* Institute */}
                  <td data-label="Institute">{item.instituteName}</td>

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
                    style={{ maxWidth: "300px" }}
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

                  {/* ✏️ Edit */}
                  <td data-label="Edit" className="text-center">
                    <Link
                      to={`/Education/update/${item._id}`}
                      className="table-action-btn edit"
                      title="Edit Education"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                  </td>

                  {/* 🗑️ Delete */}
                  <td data-label="Delete" className="text-center">
                    <button
                      className="table-action-btn delete"
                      title="Delete Education"
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
                  <i className="fa fa-spinner fa-spin me-2"></i> Loading education records...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Scoped CSS */}
      <style>{`
        .table th, .table td {
          vertical-align: middle;
        }
        .table-action-btn {
          border: none;
          background: none;
          font-size: 18px;
          cursor: pointer;
          color: #007bff;
          transition: all 0.2s ease-in-out;
        }
        .table-action-btn.delete {
          color: #dc3545;
        }
        .table-action-btn:hover {
          transform: scale(1.1);
          opacity: 0.8;
        }
        .description-cell {
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          td[data-label="Description"] {
            white-space: normal !important;
          }
        }
      `}</style>
    </div>
  );
}
