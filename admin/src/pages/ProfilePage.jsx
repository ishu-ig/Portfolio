<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage({ title }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/user/${localStorage.getItem(
            "userid"
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        response = await response.json();
        if (response.data) setData(response.data);
        else navigate("/login");
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    })();
  }, [navigate]);

  if (!data)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container my-5">
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{
          maxWidth: "600px",
          borderRadius: "12px",
        }}
      >
        <div className="card-body text-center p-4">
          {/* Profile Image */}
          <img
            src={
              data.pic
                ? `${process.env.REACT_APP_BACKEND_SERVER}/${data.pic}`
                : "/img/noimage.jpg"
            }
            alt="Profile"
            className="rounded-circle shadow-sm mb-3"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "3px solid #dee2e6",
            }}
          />

          {/* Basic Info */}
          <h5 className="fw-bold text-dark mb-1">{data.name}</h5>
          <p className="text-muted small mb-1">{data.email}</p>
          <p className="text-muted small">{data.phone}</p>

          <hr />

          {/* Profile Details */}
          <div className="text-start px-3 mt-3 text-center">
            <p className="mb-2">
              <strong className="text-secondary">Username:</strong> {data.username}
            </p>
            <p className="mb-2">
              <strong className="text-secondary">Address:</strong> {data.address}
            </p>
            <p className="mb-2">
              <strong className="text-secondary">City:</strong> {data.city}
            </p>
            <p className="mb-2">
              <strong className="text-secondary">State:</strong> {data.state}
            </p>
            <p className="mb-2">
              <strong className="text-secondary">Pin Code:</strong> {data.pin}
            </p>
            <p className="mb-0">
              <strong className="text-secondary">Role:</strong> {data.role}
            </p>
          </div>

          {/* Update Button */}
          <Link
            to="/update-profile"
            className="btn btn-primary text-light fw-semibold w-100 mt-4"
          >
            <i className="fa fa-edit me-2"></i> Update Profile
          </Link>

          {/* Back to Dashboard */}
          <div className="mt-3">
            <Link
              to="/"
              className="text-decoration-none text-primary fw-semibold"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
=======
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfilePage({ title }) {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                });
                response = await response.json();
                if (response.data) setData(response.data);
                else navigate("/login");
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login");
            }
        })();
    }, [navigate]);

    if (!data) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="container mt-4">
            <h5 className="bg-primary text-light text-center p-3 rounded">{data.role} Profile</h5>
            <div className="row align-items-center">
                {title !== "Checkout" && (
                    <div className="col-md-5 text-center">
                        <img
                            src={data.pic ? `${process.env.REACT_APP_BACKEND_SERVER}/${data.pic}` : "/img/noimage.jpg"}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                            alt="Profile"
                        />
                    </div>
                )}
                <div className={title !== "Checkout" ? "col-md-7" : "col-md-12"}>
                    <div className="card shadow-sm p-3">
                        <table className="table table-striped">
                            <tbody>
                                <tr><th>Name</th><td>{data.name}</td></tr>
                                <tr><th>Username</th><td>{data.username}</td></tr>
                                <tr><th>Email Address</th><td>{data.email}</td></tr>
                                <tr><th>Phone</th><td>{data.phone}</td></tr>
                                <tr><th>Address</th><td>{data.address}</td></tr>
                                <tr><th>State</th><td>{data.state}</td></tr>
                                <tr><th>City</th><td>{data.city}</td></tr>
                                <tr><th>Pin</th><td>{data.pin}</td></tr>
                            </tbody>
                        </table>
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-2 text-light ">Update Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
}
