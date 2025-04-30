import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";


export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header id="header" className={`header sticky-top mt-5 mx-4 animated-navbar navbar-light}`}style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }} >
            <nav className="navbar navbar-expand-lg container shadow px-3 py-3" style={{borderRadius:"50px"}} >
                {/* Dark Mode Button on Small Screens */}
                <button className="btn btn-sm btn-outline-secondary me-3 d-lg-none" onClick={toggleTheme}>
                    {theme === "light" ? <i className="bi bi-moon"></i> : <i className="bi bi-sun"></i>}
                </button>

                {/* Brand Name */}
                <Link to="/" className={`navbar-brand fw-bold fs-4 ms-lg-3`} style={{color: "var(--text-color)" }}>
                    Portfolio
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{color: "var(--text-color)",borderColor:" var(--border-color)",border:"20px" }}
                >
                    <i className="bi bi-list"></i>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {["Home", "About", "Resume", "Portfolio","Certificate", "Services", "Contact"].map((item, index) => (
                            <li className="nav-item" key={index}>
                                <a href={`#${item.toLowerCase()}`} className={`nav-link `}>
                                    {item}
                                </a>
                            </li>
                        ))}

                        {/* Dropdown */}
                        {/* <li className="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link to="#" className="dropdown-item">Dropdown 1</Link></li>
                                <li className="dropdown">
                                    <Link to="#" className="dropdown-item dropdown-toggle" id="deepDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Deep Dropdown
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="#" className="dropdown-item">Deep 1</Link></li>
                                        <li><Link to="#" className="dropdown-item">Deep 2</Link></li>
                                        <li><Link to="#" className="dropdown-item">Deep 3</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="#" className="dropdown-item">Dropdown 2</Link></li>
                                <li><Link to="#" className="dropdown-item">Dropdown 3</Link></li>
                            </ul>
                        </li> */}
                    </ul>

                    {/* Social Media Links - Hidden on Small Screens */}
                    <div className="d-none d-lg-inline-block ms-4 fs-5">
                        <Link to="#" className="me-3"><i className="bi bi-twitter"></i></Link>
                        <Link to="#" className="me-3"><i className="bi bi-facebook"></i></Link>
                        <Link to="#" className="me-3"><i className="bi bi-instagram"></i></Link>
                        <Link to="#" className="me-3"><i className="bi bi-linkedin"></i></Link>
                    </div>

                    {/* Dark Mode Button - Visible on Large Screens */}
                    <button className="btn btn-sm btn-outline-secondary ms-3 d-none d-lg-inline-block" onClick={toggleTheme}>
                    {theme === "light" ? <i className="bi bi-moon"></i> : <i className="bi bi-sun"></i>}
                    </button>
                </div>
            </nav>
        </header>
    );
}
