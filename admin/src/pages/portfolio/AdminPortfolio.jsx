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

  // 🧾 Fetch data
  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  // ⚙️ Initialize DataTable safely
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

  // 🗑 Delete portfolio
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      dispatch(deletePortfolio({ _id }));
      setTimeout(() => dispatch(getPortfolio()), 400);
    }
  };

  return (
    <>
      {/* 📱 Scoped CSS for responsive view */}
      <style>{`
        /* Desktop / Laptop */
        .responsive-table td, .responsive-table th {
          font-size: 15px !important;
          padding: 10px 12px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          vertical-align: middle !important;
        }

        .responsive-table td img {
          height: 60px;
          width: 80px;
          border-radius: 6px;
          object-fit: cover;
        }

        /* ✅ Mobile Optimization */
        @media (max-width: 768px) {
          .table-responsive {
            overflow-x: hidden !important;
            width: 100% !important;
          }

          td[data-label="ID"],
          td[data-label="Live URL"],
          td[data-label="Github"] {
            display: none !important;
          }

          td[data-label="Name"],
          td[data-label="Image"],
          td[data-label="Category"],
          td[data-label="Tech"],
          td[data-label="Short Description"],
          td[data-label="Status"],
          td[data-label="Edit"],
          td[data-label="Delete"] {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            flex-wrap: wrap !important;
            white-space: normal !important;
            word-break: break-word !important;
            font-size: 14px !important;
          }

          td[data-label="Image"] img {
            display: block !important;
            margin: 0 auto !important;
            height: 70px;
            width: 100px;
            border-radius: 8px;
          }

          td[data-label="Tech"],
          td[data-label="Short Description"] {
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
            padding: 10px 12px !important;
            background: #f9fafb !important;
            border-radius: 6px;
            margin: 4px 0 !important;
            white-space: normal !important;
            word-wrap: break-word !important;
          }

          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }

          .admin-skill-container {
            padding: 10px !important;
          }
        }
      `}</style>

      <div className="admin-skill-container p-3">
        {/* 🔹 Header */}
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

        {/* 🔹 Table */}
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
