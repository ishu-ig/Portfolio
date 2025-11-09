import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";
import {
  deletePortfolio,
  getPortfolio,
} from "../../Redux/ActionCreartors/PortfolioActionCreators";

export default function AdminPortfolio() {
  const PortfolioStateData = useSelector((state) => state.PortfolioStateData);
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  // Fetch data
  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  // Initialize DataTable
  useEffect(() => {
    if (PortfolioStateData.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      const timer = setTimeout(() => {
        $(tableRef.current).DataTable({
          responsive: true,
          autoWidth: false,
          pageLength: 8,
          language: {
            searchPlaceholder: "Search portfolio...",
            search: "",
          },
          columnDefs: [
            { orderable: false, targets: [9, 10] },
            { targets: "_all", className: "align-middle" },
          ],
        });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [PortfolioStateData]);

  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      dispatch(deletePortfolio({ _id }));
      setTimeout(() => dispatch(getPortfolio()), 400);
    }
  };

  return (
    <>
      {/* 📱 Scoped CSS for mobile & laptop balance */}
      <style>{`
        /* Default desktop/laptop styles */
        .responsive-table td,
        .responsive-table th {
          font-size: 15px !important;
          padding: 10px 12px !important;
          white-space: nowrap !important;
          text-overflow: ellipsis !important;
          overflow: hidden !important;
          vertical-align: middle !important;
        }

        .responsive-table td img {
          height: 60px;
          width: 80px;
          border-radius: 6px;
          object-fit: cover;
        }

        /* Compact alignment for laptop view */
        .table td,
        .table th {
          vertical-align: middle !important;
        }

        .table td a {
          font-size: 14px !important;
        }

        .table td span.badge {
          font-size: 13px !important;
        }

        /* ✅ Mobile Optimization */
        @media (max-width: 768px) {
          .table-responsive {
            overflow-x: hidden !important;
            width: 100% !important;
          }

          .responsive-table tbody td {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            padding: 8px 4px !important;
            border-bottom: 1px solid #e5e7eb !important;
            flex-wrap: wrap !important;
            white-space: normal !important;
            word-break: break-word !important;
            overflow: visible !important;
            max-width: 100% !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
          }

          /* Hide unnecessary columns */
          td[data-label="ID"],
          td[data-label="Live URL"],
          td[data-label="Github"] {
            display: none !important;
          }

          /* Keep visible */
          td[data-label="Name"],
          td[data-label="Image"],
          td[data-label="Category"],
          td[data-label="Tech"],
          td[data-label="Short Description"],
          td[data-label="Status"],
          td[data-label="Edit"],
          td[data-label="Delete"] {
            display: flex !important;
          }

          /* Image center + consistent size */
          td[data-label="Image"] img {
            display: block !important;
            margin: 0 auto !important;
            border-radius: 8px;
            height: 70px;
            width: 100px;
            object-fit: cover;
          }

          /* Make Tech & Description full width */
          td[data-label="Tech"],
          td[data-label="Short Description"] {
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            text-align: left !important;
            padding: 10px 12px !important;
            background: #f9fafb !important;
            border-radius: 6px;
            margin: 4px 0 !important;
            white-space: normal !important;
            word-wrap: break-word !important;
          }

          td[data-label="Status"] span,
          .table-action-btn {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 4px auto;
          }

          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }

          .admin-skill-container {
            padding: 10px !important;
          }

          .admin-skill-container h5,
          .bg-primary {
            text-align: center !important;
          }
        }
      `}</style>

      <div className="admin-skill-container p-3">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
          <h5 className="mb-2 mb-md-0 fw-semibold text-light">
            <i className="fa fa-folder-open me-2"></i> Portfolio Management
          </h5>
          <Link
            to="/portfolio/create"
            className="btn btn-light text-primary fw-semibold shadow-sm"
          >
            <i className="fa fa-plus me-1"></i> Add Project
          </Link>
        </div>

        {/* Table */}
        <div className="table-responsive mt-4">
          <table
            ref={tableRef}
            id="PortfolioTable"
            className="table table-striped table-bordered align-middle shadow-sm responsive-table"
          >
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Tech</th>
                <th>Short Description</th>
                <th>Live URL</th>
                <th>Github</th>
                <th>Status</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {PortfolioStateData.length > 0 ? (
                PortfolioStateData.map((item, i) => (
                  <tr key={item._id || i}>
                    <td data-label="ID" className="text-muted small">
                      {item._id}
                    </td>
                    <td data-label="Name" className="fw-semibold">
                      {item.name}
                    </td>
                    <td data-label="Image">
                      <Link
                        to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                          alt={item.name}
                          className="rounded shadow-sm"
                        />
                      </Link>
                    </td>
                    <td data-label="Category">{item.category}</td>
                    <td data-label="Tech">{item.tech}</td>
                    <td data-label="Short Description">
                      {item.shortDescription || "—"}
                    </td>
                    <td data-label="Live URL">
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-decoration-underline"
                      >
                        {item.liveUrl ? "Live" : "—"}
                      </a>
                    </td>
                    <td data-label="Github">
                      <a
                        href={item.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-dark text-decoration-underline"
                      >
                        {item.githubRepo ? "Repo" : "—"}
                      </a>
                    </td>
                    <td data-label="Status">
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
                        to={`/portfolio/update/${item._id}`}
                        className="table-action-btn edit"
                        title="Edit Portfolio"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </td>
                    <td data-label="Delete" className="text-center">
                      <button
                        className="table-action-btn delete"
                        title="Delete Portfolio"
                        onClick={() => deleteRecord(item._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-4 text-muted">
                    <i className="fa fa-spinner fa-spin me-2"></i> Loading
                    portfolio records...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
