<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";
import {
  deleteTestimonial,
  getTestimonial,
} from "../../Redux/ActionCreartors/TestimonialActionCreators";

export default function AdminTestimonial() {
  const TestimonialStateData = useSelector((state) => state.TestimonialStateData);
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  // ✅ Fetch testimonials
  useEffect(() => {
    dispatch(getTestimonial());
  }, [dispatch]);

  // ✅ Initialize DataTable safely
  useEffect(() => {
    if (TestimonialStateData.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      const timer = setTimeout(() => {
        $(tableRef.current).DataTable({
          responsive: true,
          autoWidth: false,
          pageLength: 8,
          language: {
            searchPlaceholder: "Search testimonials...",
            search: "",
          },
          columnDefs: [{ orderable: false, targets: [5, 6] }],
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [TestimonialStateData]);

  // 🗑 Delete Testimonial
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      dispatch(deleteTestimonial({ _id }));
      setTimeout(() => dispatch(getTestimonial()), 400);
    }
  };

  return (
    <>
      {/* 📱 Scoped Mobile CSS */}
      <style>{`
        @media (max-width: 768px) {
          /* Hide less important columns */
          td[data-label="ID"],
          td[data-label="Message"] {
            display: none !important;
          }

          /* Image center + size */
          td[data-label="Pic"] img {
            display: block;
            margin: 0 auto;
            border-radius: 10px;
            width: 70px;
            height: 70px;
            object-fit: cover;
          }

          /* Center all content */
          td {
            text-align: center !important;
            vertical-align: middle !important;
          }

          /* Center badges and buttons */
          td[data-label="Active"],
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

          .admin-skill-container {
            padding: 10px !important;
          }
        }
      `}</style>

      <div className="admin-skill-container p-3">
        {/* 🔹 Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
          <h5 className="mb-2 mb-md-0 fw-semibold text-light">
            <i className="fa fa-comment-dots me-2"></i> Testimonial Management
          </h5>
          <Link
            to="/testimonial/create"
            className="btn btn-light text-primary fw-semibold shadow-sm"
          >
            <i className="fa fa-plus me-1"></i> Add Testimonial
          </Link>
        </div>

        {/* 🔹 Table Section */}
        <div className="table-responsive mt-4">
          <table
            ref={tableRef}
            id="TestimonialTable"
            className="table table-striped table-bordered align-middle shadow-sm responsive-table"
          >
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Pic</th>
                <th>Active</th>
                <th>Message</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {TestimonialStateData && TestimonialStateData.length > 0 ? (
                TestimonialStateData.map((item, i) => (
                  <tr key={item._id || i}>
                    {/* ID */}
                    <td data-label="ID" className="text-muted small">
                      {item._id}
                    </td>

                    {/* Name */}
                    <td data-label="Name" className="fw-semibold">
                      {item.name}
                    </td>

                    {/* Pic */}
                    <td data-label="Pic">
                      <Link
                        to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                          alt={item.name}
                          className="rounded shadow-sm border"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                      </Link>
                    </td>

                    {/* Active Status */}
                    <td data-label="Active">
                      <span
                        className={`badge px-3 py-2 ${
                          item.active ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Message */}
                    <td
                      data-label="Message"
                      className="text-wrap text-muted"
                      style={{ maxWidth: "300px", whiteSpace: "normal" }}
                    >
                      {item.message}
                    </td>

                    {/* ✏️ Edit */}
                    <td data-label="Edit" className="text-center">
                      <Link
                        to={`/testimonial/update/${item._id}`}
                        className="table-action-btn edit"
                        title="Edit Testimonial"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </td>

                    {/* 🗑️ Delete */}
                    <td data-label="Delete" className="text-center">
                      <button
                        className="table-action-btn delete"
                        title="Delete Testimonial"
                        onClick={() => deleteRecord(item._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    <i className="fa fa-spinner fa-spin me-2"></i> Loading testimonials...
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
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';                                         // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css';   // Import DataTables styles
import 'datatables.net';

import { deleteTestimonial, getTestimonial } from "../../Redux/ActionCreartors/TestimonialActionCreators"
export default function AdminTestimonial() {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    // function deleteRecord(id) {
    //     if (window.confirm("Are You Sure to Delete that Item : ")) {
    //         dispatch(deleteTestimonial({ id: id }))
    //         getAPIData()
    //     }
    // }
    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteTestimonial({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getTestimonial())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [TestimonialStateData.length])
    return (
        <>

            <div>
                <h5 className='bg-primary text-light text-center p-3'>Testimonial <Link to="/testimonial/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                <div className="table-responsive">
                    <table id='DataTable' className="table table-striped table-hover table-bordered text-center">
                        <thead className="text-light" style={{ backgroundColor: "#1F2A40" }}>
                            <tr>
                                <th>Id</th>

                                <th>Name</th>
                                <th>Pic</th>
                                <th>Active</th>
                                <th>Message</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                TestimonialStateData.map((item) => {
                                    return <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} height={50} width={80} alt="" />
                                            </Link>
                                        </td>
                                        <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                        <td>
                                            <div className='testimonial-message'>{item.message}</div>
                                        </td>
                                        {/* <td><Link to={`/admin/testimonial/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit fs-4'></i></Link></td>
                                                <td>{localStorage.getItem("role")==="Super Admin"?<button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash fs-4'></i></button>:null}</td> */}
                                        <td><Link to={`/testimonial/update/${item._id}`} className='btn btn-primary text-light'><i className='fa fa-edit fs-4'></i></Link></td>
                                        <td><button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='fa fa-trash fs-4'></i></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
}
