<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";
import {
  deleteService,
  getService,
} from "../../Redux/ActionCreartors/ServiceActionCreators";

export default function AdminService() {
  const ServiceStateData = useSelector((state) => state.ServiceStateData);
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  // ✅ Fetch Services
  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  // ✅ Initialize DataTable safely
  useEffect(() => {
    if (ServiceStateData.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      const timer = setTimeout(() => {
        $(tableRef.current).DataTable({
          responsive: true,
          autoWidth: false,
          pageLength: 8,
          language: {
            searchPlaceholder: "Search services...",
            search: "",
          },
          columnDefs: [{ orderable: false, targets: [9, 10] }],
        });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [ServiceStateData]);

  // 🗑 Delete Service
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService({ _id }));
      setTimeout(() => dispatch(getService()), 400);
    }
  };

  return (
    <>
      {/* 📱 Scoped Mobile CSS */}
      <style>{`
        @media (max-width: 768px) {
          /* Hide less important columns */
          td[data-label="ID"],
          td[data-label="Icon"],
          td[data-label="Duration"],
          td[data-label="Category"],
          td[data-label="Technology"] {
            display: none !important;
          }

          /* Make short description fully visible */
          td[data-label="Short Description"] {
            white-space: normal !important;
            text-align: left !important;
            line-height: 1.4;
          }

          /* Center actions and badges */
          td[data-label="Status"],
          td[data-label="Edit"],
          td[data-label="Delete"] {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }

          /* Prevent horizontal scroll */
          .table-responsive {
            overflow-x: hidden !important;
          }

          html, body {
            overflow-x: hidden !important;
          }

          /* Compact container */
          .admin-skill-container {
            padding: 12px !important;
          }

          /* Adjust table layout */
          .responsive-table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
        }
      `}</style>

      <div className="admin-skill-container p-3">
        {/* 🔹 Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
          <h5 className="mb-2 mb-md-0 fw-semibold text-light">
            <i className="fa fa-cogs me-2"></i> Service Management
          </h5>
          <Link
            to="/service/create"
            className="btn btn-light text-primary fw-semibold shadow-sm"
          >
            <i className="fa fa-plus me-1"></i> Add Service
          </Link>
        </div>

        {/* 🔹 Table Section */}
        <div className="table-responsive mt-4">
          <table
            ref={tableRef}
            id="ServiceTable"
            className="table table-striped table-bordered align-middle shadow-sm responsive-table"
          >
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Icon</th>
                <th>Short Description</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Category</th>
                <th>Technology</th>
                <th>Status</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {ServiceStateData && ServiceStateData.length > 0 ? (
                ServiceStateData.map((item, i) => (
                  <tr key={item._id || i}>
                    <td data-label="ID" className="text-muted small">
                      {item._id}
                    </td>
                    <td data-label="Name" className="fw-semibold">
                      {item.name}
                    </td>
                    <td data-label="Icon">
                      <i className={`${item.icon} fs-4 text-primary`}></i>
                    </td>
                    <td
                      data-label="Short Description"
                      className="description-cell text-wrap"
                    >
                      {item.shortDescription || "—"}
                    </td>
                    <td
                      data-label="Price"
                      className="fw-semibold text-success text-nowrap"
                    >
                      ₹{item.price}
                    </td>
                    <td data-label="Duration">{item.duration} Weeks</td>
                    <td data-label="Category">{item.category}</td>
                    <td data-label="Technology">{item.technology}</td>
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
                        to={`/service/update/${item._id}`}
                        className="table-action-btn edit"
                        title="Edit Service"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </td>
                    <td data-label="Delete" className="text-center">
                      <button
                        className="table-action-btn delete"
                        title="Delete Service"
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
                    services...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
=======
import React, { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';                                         // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css';   // Import DataTables styles
import 'datatables.net';

import { deleteService, getService } from "../../Redux/ActionCreartors/ServiceActionCreators"

export default function AdminService() {
    let ServiceStateData = useSelector(state => state.ServiceStateData)
    let dispatch = useDispatch()

    // function deleteRecord(id) {
    //     if (window.confirm("Are You Sure to Delete that Item : ")) {
    //         dispatch(deleteService({ id: id }))
    //         getAPIData()
    //     }
    // }

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteService({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getService())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [ServiceStateData.length])


    return (
        <>
            <div className="container-fluid">
                {/* Header */}
                <h5 className="text-center text-light bg-primary p-3">Service <Link to="/service/create"><i className="fa fa-plus text-light float-end pt-1"></i></Link></h5>
                {/* Table */}
                <div className="table-responsive mt-3">
                    <table id='DataTable' className="table table-striped table-hover table-bordered text-center">
                        <thead className="text-light" style={{ backgroundColor: "#1F2A40" }}>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Short Description</th>
                                <th>Icon</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Category</th>
                                <th>Technology</th>
                                <th>Active</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ServiceStateData.map((item) => {
                                    return <tr key={item._id}>
                                        {/* return <tr key={item._id}> */}
                                        <td>{item._id}</td>
                                        {/* <td>{item.id}</td> */}
                                        <td>{item.name}</td>
                                        <td>{item.shortDescription}</td>
                                        <td>{item.icon}</td>
                                        <td>&#8377; {item.price}</td>
                                        <td>{item.duration} Weeks</td>
                                        <td>{item.category}</td>
                                        <td>{item.technology}</td>
                                        <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                        <td><Link to={`/service/update/${item._id}`} className='btn btn-primary text-light'><i className='fa fa-edit fs-4'></i></Link></td>
                                        <td><button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='fa fa-trash fs-4'></i></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
}
