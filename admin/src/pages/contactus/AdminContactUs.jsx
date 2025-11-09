<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

import {
    deleteContactUs,
    getContactUs,
    updateContactUs,
} from "../../Redux/ActionCreartors/ContactUsActionCreators";

export default function AdminContactUs() {
    const [flag, setFlag] = useState(false);
    const ContactUsStateData = useSelector((state) => state.ContactUsStateData);
    const dispatch = useDispatch();
    const tableRef = useRef(null);

    // 🗑 Delete Record
    const deleteRecord = (_id) => {
        if (window.confirm("Are you sure you want to delete this query?")) {
            dispatch(deleteContactUs({ _id }));
            getAPIData();
        }
    };

    // 🔄 Update Active Status
    const updateRecord = (_id) => {
        if (window.confirm("Are you sure you want to update the status?")) {
            const item = ContactUsStateData.find((x) => x._id === _id);
            const index = ContactUsStateData.findIndex((x) => x._id === _id);
            dispatch(updateContactUs({ ...item, active: !item.active }));
            ContactUsStateData[index].active = !item.active;
            setFlag(!flag);
        }
    };

    // 🔁 Fetch Data and Initialize DataTable
    const getAPIData = () => {
        dispatch(getContactUs());
        const timer = setTimeout(() => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
            $(tableRef.current).DataTable({
                responsive: true,
                autoWidth: false,
                pageLength: 8,
                language: {
                    searchPlaceholder: "Search queries...",
                    search: "",
                },
            });
        }, 400);
        return timer;
    };

    useEffect(() => {
        const timer = getAPIData();
        return () => clearTimeout(timer);
    }, [ContactUsStateData.length]);

    return (
        <>
            {/* ✅ Scoped styling for centering and expanding View button */}
            <style>{`
        #ContactTable td[data-label="Phone"],
        #ContactTable td[data-label="View"] {
          text-align: center !important;
          vertical-align: middle !important;
        }

        /* Make the View button fill the entire cell width */
        #ContactTable td[data-label="View"] .table-action-btn {
          display: inline-flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          height: 40px !important;
          border-radius: 8px !important;
          font-size: 18px !important;
          background-color: #e9f2ff !important;
          transition: all 0.2s ease-in-out;
        }

        #ContactTable td[data-label="View"] .table-action-btn:hover {
          background-color: #d0e3ff !important;
          transform: scale(1.03);
        }
      `}</style>

            <div className="admin-skill-container p-3">
                {/* 🔹 Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
                    <h5 className="mb-2 mb-md-0 fw-semibold text-light">
                        <i className="fa fa-envelope me-2"></i> Contact Queries
                    </h5>
                </div>

                {/* 🔹 Table Section */}
                <div className="table-responsive mt-4">
                    <table
                        ref={tableRef}
                        id="ContactTable"
                        className="table table-striped table-bordered align-middle shadow-sm responsive-table"
                    >
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
=======
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';                                         // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css';   // Import DataTables styles
import 'datatables.net';

import { deleteContactUs, getContactUs, updateContactUs } from "../../Redux/ActionCreartors/ContactUsActionCreators"
import { Link } from 'react-router-dom';
export default function AdminContactUs() {
    let [flag, setFlag] = useState(false)
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteContactUs({ _id: _id }))
            getAPIData()
        }
    }

    function updateRecord(_id) {
        if (window.confirm("Are You Sure to Update the Status : ")) {
            let item = ContactUsStateData.find(x => x._id === _id)
            let index = ContactUsStateData.findIndex(x => x._id === _id)
            dispatch(updateContactUs({ ...item, active: !item.active }))
            ContactUsStateData[index].active = !item.active
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getContactUs())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [ContactUsStateData.length])
    return (
        <>
            <div>
                <h5 className='bg-primary text-light text-center p-3'>Queries</h5>
                <div className="table-responsive">
                    <table id='DataTable' className="table table-striped table-hover table-bordered text-center">
                        <thead className="text-light" style={{ backgroundColor: "#1F2A40" }}>
                            <tr>
                                <th>Id</th>

>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Date</th>
<<<<<<< HEAD
                                <th>Status</th>
                                <th className="text-center">View</th>
                                <th className="text-center">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ContactUsStateData && ContactUsStateData.length > 0 ? (
                                ContactUsStateData.map((item, i) => (
                                    <tr key={item._id || i}>
                                        <td data-label="ID" className="text-muted small">
                                            {item._id}
                                        </td>
                                        <td data-label="Name" className="fw-semibold">
                                            {item.name}
                                        </td>
                                        <td data-label="Email">{item.email}</td>
                                        <td data-label="Phone">{item.phone}</td>
                                        <td data-label="Subject" className="text-wrap">
                                            {item.subject || "—"}
                                        </td>
                                        <td data-label="Date">
                                            {new Date(item.createdAt).toLocaleString()}
                                        </td>

                                        <td
                                            data-label="Active"
                                            onClick={() => updateRecord(item._id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <span
                                                className={`badge px-3 py-2 ${item.active ? "bg-success" : "bg-danger"
                                                    }`}
                                            >
                                                {item.active ? "Resolved" : "Pending"}
                                            </span>
                                        </td>

                                        {/* 👁️ View button full width */}
                                        <td data-label="Edit" className="text-center">
                                            <Link
                                                to={`/contactus/view/${item._id}`}
                                                className="table-action-btn edit"
                                                title="Edit Experience"
                                            >
                                                <i className="fa fa-eye"></i>
                                            </Link>
                                        </td>

                                        {/* 🗑️ Delete button */}
                                        <td data-label="Delete" className="text-center">
                                            {!item.active && (
                                                <button
                                                    className="table-action-btn delete"
                                                    title="Delete Query"
                                                    onClick={() => deleteRecord(item._id)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-4 text-muted">
                                        <i className="fa fa-spinner fa-spin me-2"></i> Loading queries...
                                    </td>
                                </tr>
                            )}
=======
                                <th>Active</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ContactUsStateData.map((item) => {
                                    return <tr key={item._id}>
                                        {/* return <tr key={item._id}> */}
                                        {/* <td>{item.id}</td> */}
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.subject}</td>
                                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                                        {/* <td className={`${item.active ? 'text-success' : 'text-danger'}`} onClick={() => updateRecord(item.id)} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td> */}
                                        <td className={`${item.active ? 'text-success' : 'text-danger'}`} onClick={() => updateRecord(item._id)} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td>
                                        {/* <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='fa fa-eye fs-4'></i></Link></td> */}
                                        <td><Link to={`/contactus/view/${item._id}`} className='btn btn-primary text-light'><i className='fa fa-eye fs-4'></i></Link></td>
                                        {/* <td>
                                                    {!item.active && localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash fs-4'></i></button> : null}
                                                </td> */}
                                        <td>
                                            {!item.active ? <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='fa fa-trash fs-4'></i></button> : null}
                                        </td>

                                    </tr>
                                })
                            }
>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
                        </tbody>
                    </table>
                </div>
            </div>
        </>
<<<<<<< HEAD
    );
=======
    )
>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
}
