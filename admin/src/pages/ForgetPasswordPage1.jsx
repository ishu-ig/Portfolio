<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function ForgetPasswordPage1() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Apply fullscreen centered background
    document.body.classList.add("login-active");
    return () => document.body.classList.remove("login-active");
  }, []);

  function getInputData(e) {
    setErrorMessage("");
    setUsername(e.target.value);
  }

  async function postData(e) {
    e.preventDefault();
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/user/forgetPassword-1`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );

      response = await response.json();

      if (response.result === "Done") {
        localStorage.setItem("reset-password-username", username);
        navigate("/forgetPassword-2");
      } else {
        setErrorMessage("User not found. Please check your email or username.");
      }
    } catch (error) {
      setErrorMessage("Internal Server Error");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Forgot Password</h2>
        <form onSubmit={postData} className="login-form">
          {/* Username/Email Input */}
          <div className="login-field">
            <input
              type="text"
              name="username"
              placeholder="Enter your Email or Username"
              value={username}
              onChange={getInputData}
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          {/* Send OTP Button */}
          <div className="login-btn mt-3">
            <div className="login-btn-layer"></div>
            <input type="submit" value="Send OTP" />
          </div>
        </form>

        {/* Back to Login Option */}
        <div className="mt-3 text-center">
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.color = "#1748cc")}
            onMouseOut={(e) => (e.target.style.color = "#2563eb")}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
=======
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function ForgetPasswordPage1() {
    let navigate = useNavigate()
    let [username, setUsername] = useState("")
    let [errorMessage, setErrorMessage] = useState()

    function getInputData(e) {
        setUsername(e.target.value)
    }

    async function postData(e) {
        e.preventDefault()
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/forgetPassword-1`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username: username, })
            })
            response = await response.json()
            if (response.result === "Done") {
                localStorage.setItem("reset-password-username", username)
                navigate("/forgetPassword-2")
            }
            else
                setErrorMessage("User Not Found")

        } catch (error) {
            alert("Internal Server Error")
        }
    }
    return (
        <>
            <div className="container my-5 d-flex justify-content-center p-5">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
                    <h5 className="text-light bg-primary text-center py-2 rounded">Reset Passowrd</h5>
                    <form onSubmit={postData}>
                        {/* Username/Email Field */}
                        <div className="my-3">
                            <label className="fw-bold">Username/Email</label>
                            <input
                                type="text"
                                name="username"
                                onChange={getInputData}
                                placeholder="Enter Username/Email"
                                className={`form-control border-2 ${errorMessage ? "border-danger" : "border-primary"}`}
                            />
                            {errorMessage && <p className="text-danger small mt-1">{errorMessage}</p>}
                        </div>

                        
                        {/* Login Button - Centered */}
                        <div className="d-flex justify-content-center my-3">
                            <button type="submit" className="btn btn-primary text-light w-100">Send OTP</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
}
