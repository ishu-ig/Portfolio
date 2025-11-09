<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

export default function AdminUser() {
  const [UserStateData, setUserStateData] = useState([]);
  const tableRef = useRef(null);

  // 🧾 Fetch user data
  async function getAPIData() {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      response = await response.json();
      setUserStateData(response.data);

      // Initialize DataTable
      setTimeout(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }
        $(tableRef.current).DataTable({
          responsive: true,
          autoWidth: false,
          pageLength: 8,
          language: {
            searchPlaceholder: "Search user...",
            search: "",
          },
        });
      }, 300);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }

  // 🔁 Load data
  useEffect(() => {
    getAPIData();
  }, []);

  // 🗑 Delete User
  async function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      getAPIData();
    }
  }

  // ✅ Toggle Active Status
  async function updateRecord(_id) {
    if (window.confirm("Are you sure you want to update this user's status?")) {
      const user = UserStateData.find((x) => x._id === _id);
      await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ ...user, active: !user?.active }),
      });
      getAPIData();
    }
  }

  return (
    <>
      {/* 📱 Scoped Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          /* Hide less important fields */
          td[data-label="ID"],
          td[data-label="Username"],
          td[data-label="Email"] {
            display: none !important;
          }

          td {
            text-align: center !important;
            vertical-align: middle !important;
            padding: 10px 6px !important;
          }

          td[data-label="Active"] span {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: auto;
          }

          td[data-label="Edit"], td[data-label="Delete"] {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .table-responsive {
            overflow-x: hidden !important;
          }

          html, body {
            overflow-x: hidden !important;
          }
        }
      `}</style>

      <div className="admin-skill-container p-3">
        {/* 🔹 Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
          <h5 className="mb-2 mb-md-0 fw-semibold text-light">
            <i className="fa fa-users me-2"></i> User Management
          </h5>
          <Link
            to="/user/create"
            className="btn btn-light text-primary fw-semibold shadow-sm"
          >
            <i className="fa fa-plus me-1"></i> Add User
          </Link>
        </div>

        {/* 🔹 Table Section */}
        <div className="table-responsive mt-4">
          <table
            ref={tableRef}
            id="UserTable"
            className="table table-striped table-bordered align-middle shadow-sm responsive-table"
          >
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {UserStateData && UserStateData.length > 0 ? (
                UserStateData.map((item, i) => (
                  <tr key={item._id || i}>
                    {/* ID */}
                    <td data-label="ID" className="text-muted small">
                      {item._id}
                    </td>

                    {/* Name */}
                    <td data-label="Name" className="fw-semibold">
                      {item.name}
                    </td>

                    {/* Username */}
                    <td data-label="Username">{item.username}</td>

                    {/* Email */}
                    <td data-label="Email">{item.email}</td>

                    {/* Phone */}
                    <td data-label="Phone">{item.phone}</td>

                    {/* Role */}
                    <td data-label="Role">
                      <span
                        className={`badge px-3 py-2 ${
                          item.role === "Admin"
                            ? "bg-primary"
                            : item.role === "Super Admin"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {item.role}
                      </span>
                    </td>

                    {/* Active Status */}
                    <td data-label="Active" onClick={() => updateRecord(item._id)}>
                      <span
                        className={`badge px-3 py-2 ${
                          item.active ? "bg-success" : "bg-danger"
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* ✏️ Edit Button */}
                    <td data-label="Edit" className="text-center">
                      <Link
                        to={`/user/update/${item._id}`}
                        className="table-action-btn edit"
                        title="Edit User"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </td>

                    {/* 🗑️ Delete Button */}
                    <td data-label="Delete" className="text-center">
                      <button
                        className="table-action-btn delete"
                        title="Delete User"
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
                    <i className="fa fa-spinner fa-spin me-2"></i> Loading users...
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

import $ from 'jquery';                                         // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css';   // Import DataTables styles
import 'datatables.net';

export default function AdminUser() {
    let [UserStateData, setUserStateData] = useState([])

    // async function deleteRecord(_id) {
    async function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/${_id}`, {
                // let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            getAPIData()
        }
    }

    async function updateRecord(_id) {
        if (window.confirm("Are You Sure to Update the Status : ")) {
            let item = UserStateData.find(x => x._id === _id)
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/${_id}`, {
                // let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ ...item, active: !item?.active })
            })
            response = await response.json()
            getAPIData()
        }
    }
    async function getAPIData() {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        response = await response.json()
        setUserStateData(response.data)
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [])
    return (
        <>
            <div>
                <h5 className='bg-primary text-light text-center p-2'>User <Link to="/user/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                <div className="table-responsive">
                    <table id='DataTable' className="table table-striped table-hover table-bordered text-center">
                        <thead className="text-light" style={{ backgroundColor: "#1F2A40" }}>
                            <tr>
                                <th>Id</th>

                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Active</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                UserStateData.map((item) => {
                                    return <tr key={item?._id}>
                                        {/* return <tr key={item?._id}> */}
                                        {/* <td>{item?.id}</td> */}
                                        <td>{item?._id}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.username}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.role}</td>
                                        <td className={`${item?.active ? 'text-success' : 'text-danger'}`} onClick={() => updateRecord(item?.id)} style={{ cursor: "pointer" }}>{item?.active ? "Yes" : "No"}</td>
                                        {/* <td>{localStorage.getItem("role") === "Super Admin" && item?.role !== "Buyer" ? <Link to={`/admin/user/update/${item?.id}`} className='btn btn-primary'><i className='fa fa-edit fs-4'></i></Link> : null}</td>
                                                <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item?.id)}><i className='fa fa-trash fs-4'></i></button> : null}</td> */}
                                        <td><Link to={`/user/update/${item?._id}`} className='btn btn-primary text-light'><i className='fa fa-edit fs-4'></i></Link></td>
                                        <td><button className='btn btn-danger' onClick={() => deleteRecord(item?._id)}><i className='fa fa-trash fs-4'></i></button></td>
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
