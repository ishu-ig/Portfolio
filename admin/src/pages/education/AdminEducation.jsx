import React, { useEffect, useRef } from "react";
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
  const tableRef = useRef(null);

  // 🧾 Fetch Education Data
  const getAPIData = () => {
    dispatch(getEducation());
    const timer = setTimeout(() => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        responsive: true,
        autoWidth: false,
        pageLength: 8,
        language: {
          searchPlaceholder: "Search education records...",
          search: "",
        },
      });
    }, 400);
    return timer;
  };

  useEffect(() => {
    const timer = getAPIData();
    return () => clearTimeout(timer);
  }, [EducationStateData.length]);

  // 🗑 Delete Education Record
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(deleteEducation({ _id }));
      getAPIData();
    }
  };

  return (
    <div className="admin-skill-container p-3">
      {/* Header */}
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

      {/* Table Section */}
      <div className="card shadow-lg border-0 mt-4">
        <div className="card-body p-3">
          <div className="table-responsive">
            <table
              ref={tableRef}
              id="DataTable"
              className="table table-striped table-bordered align-middle responsive-table"
            >
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Degree</th>
                  <th>Institute Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className="text-center">Edit</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {EducationStateData && EducationStateData.length > 0 ? (
                  EducationStateData.map((item, i) => (
                    <tr key={item._id || i}>
                      <td data-label="ID" className="text-muted small">
                        {item._id}
                      </td>
                      <td
                        data-label="Degree"
                        className="fw-semibold text-primary"
                      >
                        {item.degreeName}
                      </td>
                      <td data-label="Institute">{item.instituteName}</td>
                      <td data-label="Start Date">{item.startDate}</td>
                      <td data-label="End Date">{item.endDate}</td>
                      <td
                        data-label="Description"
                        className="text-justified text-muted small "
                      >
                        {item.description || "—"}
                      </td>
                      <td data-label="Status" className="text-center">
                        <span
                          className={`badge px-3 py-2 ${
                            item.active ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {item.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td data-label="Edit" className="text-center">
                        <Link
                          to={`/Education/update/${item._id}`}
                          className="btn btn-outline-primary btn-sm rounded-pill"
                          title="Edit"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </td>
                      <td data-label="Delete" className="text-center">
                        <button
                          onClick={() => deleteRecord(item._id)}
                          className="btn btn-outline-danger btn-sm rounded-pill"
                          title="Delete"
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
                      records...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Styling */}
      <style>{`
        .btn-outline-primary:hover {
          background-color: #007bff !important;
          color: #fff !important;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545 !important;
          color: #fff !important;
        }
        .table th {
          white-space: nowrap;
        }
        .table td {
          vertical-align: middle;
        }
        .card {
          border-radius: 14px;
        }

        /* 📱 Mobile Vertical View - Centered */
        @media (max-width: 768px) {
          .responsive-table thead {
            display: none;
          }
          .responsive-table,
          .responsive-table tbody,
          .responsive-table tr,
          .responsive-table td {
            display: block;
            width: 100%;
          }

          .responsive-table tr {
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            background: #fff;
            padding: 16px 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            text-align: center; /* Center entire block */
          }

          .responsive-table td {
            border: none;
            position: relative;
            padding: 10px 0;
            text-align: center !important;
            vertical-align: middle !important;
          }

          .responsive-table td::before {
            content: attr(data-label);
            display: block;
            font-weight: 600;
            color: #0d6efd;
            margin-bottom: 6px;
            text-align: center;
          }

          /* ✅ Description fixes */
          .responsive-table td[data-label="Description"] {
            white-space: normal !important;
            word-wrap: break-word !important;
            line-height: 1.5;
            padding-top: 12px;
          }

          /* Center badges and buttons */
          .responsive-table td[data-label="Status"],
          .responsive-table td[data-label="Edit"],
          .responsive-table td[data-label="Delete"] {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .badge {
            font-size: 14px;
          }

          html, body {
            overflow-x: hidden !important;
          }
        }
      `}</style>
    </div>
  );
}
