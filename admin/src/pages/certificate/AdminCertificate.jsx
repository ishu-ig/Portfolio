<<<<<<< HEAD
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";
import {
  deleteCertificate,
  getCertificate,
} from "../../Redux/ActionCreartors/CertificateActionCreators";

export default function AdminCertificate() {
  const CertificateStateData = useSelector(
    (state) => state.CertificateStateData
  );
  const dispatch = useDispatch();

  // ✅ Delete Certificate
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      dispatch(deleteCertificate({ _id }));
      getAPIData();
    }
  };

  // ✅ Fetch & Initialize DataTable
  const getAPIData = () => {
    dispatch(getCertificate());
    const timer = setTimeout(() => {
      if ($.fn.DataTable.isDataTable("#CertificateTable")) {
        $("#CertificateTable").DataTable().destroy();
      }
      $("#CertificateTable").DataTable({
        responsive: true,
        autoWidth: false,
        pageLength: 8,
        language: {
          searchPlaceholder: "Search certificates...",
          search: "",
        },
      });
    }, 400);
    return timer;
  };

  // ✅ Fetch on Mount
  useEffect(() => {
    const timer = getAPIData();
    return () => clearTimeout(timer);
  }, [CertificateStateData.length]);

  return (
    <div className="admin-skill-container p-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
        <h5 className="mb-2 mb-md-0 fw-semibold text-light">
          <i className="fa fa-certificate me-2"></i> Certificate Management
        </h5>
        <Link
          to="/certificate/create"
          className="btn btn-light text-primary fw-semibold shadow-sm"
        >
          <i className="fa fa-plus me-1"></i> Add Certificate
        </Link>
      </div>

      {/* Table */}
      <div className="table-responsive mt-4">
        <table
          id="CertificateTable"
          className="table table-striped table-bordered align-middle shadow-sm responsive-table"
        >
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Issued By</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {CertificateStateData.length > 0 ? (
              CertificateStateData.map((item, i) => (
                <tr key={item._id || i}>
                  {/* ID */}
                  <td data-label="ID" className="text-muted small">
                    {item._id}
                  </td>

                  {/* Name */}
                  <td data-label="Name" className="fw-semibold">
                    {item.name}
                  </td>

                  {/* Image */}
                  <td data-label="Image">
                    {item.pic ? (
                      <Link
                        to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                          alt={item.name}
                          className="rounded shadow-sm"
                          height={50}
                          width={80}
                          style={{ objectFit: "cover" }}
                        />
                      </Link>
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </td>

                  {/* Issued By */}
                  <td data-label="Issued By">{item.issuedBy || "N/A"}</td>

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

                  {/* Edit */}
                  <td data-label="Edit" className="text-center">
                    <Link
                      to={`/certificate/update/${item._id}`}
                      className="table-action-btn edit"
                      title="Edit Certificate"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                  </td>

                  {/* Delete */}
                  <td data-label="Delete" className="text-center">
                    <button
                      className="table-action-btn delete"
                      title="Delete Certificate"
                      onClick={() => deleteRecord(item._id)}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  <i className="fa fa-spinner fa-spin me-2"></i> Loading
                  certificates...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
=======
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';                                         // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css';   // Import DataTables styles
import 'datatables.net';

import { deleteCertificate, getCertificate } from "../../Redux/ActionCreartors/CertificateActionCreators"
export default function AdminCertificate() {
    let CertificateStateData = useSelector(state => state.CertificateStateData)
    let dispatch = useDispatch()

    // function deleteRecord(id) {
    //     if (window.confirm("Are You Sure to Delete that Item : ")) {
    //         dispatch(deleteCertificate({ id: id }))
    //         getAPIData()
    //     }
    // }
    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteCertificate({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getCertificate())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [CertificateStateData.length])


    return (
        <>
            <div className="container-fluid">
                {/* Header */}
                <h5 className="text-center text-light bg-primary p-3">Certificate <Link to="/Certificate/create"><i className="fa fa-plus text-light float-end pt-1"></i></Link></h5>
                {/* Table */}
                <div className="table-responsive mt-3">
                    <table id='DataTable' className="table table-striped table-hover table-bordered text-center">
                        <thead className="text-light" style={{ backgroundColor: "#1F2A40" }}>
                            <tr>
                                <th>Id</th>

                                <th>Name</th>
                                <th>Pic</th>
                                <th>Issued By</th>
                                <th>Active</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                CertificateStateData.map((item) => {
                                    return <tr key={item._id}>
                                        {/* return <tr key={item._id}> */}
                                        {/* <td>{item.id}</td> */}
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} height={50} width={80} alt="" />
                                            </Link>
                                        </td>
                                        
                                        <td>{item.issuedBy}</td>
                                        <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                        {/* <td><Link to={`/admin/Certificate/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit fs-4'></i></Link></td>
                                                <td>{localStorage.getItem("role")==="Super Admin"?<button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash fs-4'></i></button>:null}</td> */}
                                        <td><Link to={`/Certificate/update/${item._id}`} className='btn btn-primary text-light'><i className='fa fa-edit fs-4'></i></Link></td>
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
