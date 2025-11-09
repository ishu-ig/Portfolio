import React from "react";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar({ isExpanded }) {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: "fa-home", label: "Dashboard" },
    { path: "/skill", icon: "fa-lightbulb", label: "Skills" },
    { path: "/education", icon: "fa-graduation-cap", label: "Education" },
    { path: "/experience", icon: "fa-briefcase", label: "Experience" },
    { path: "/certificate", icon: "fa-certificate", label: "Certificates" },
    { path: "/portfolio", icon: "fa-image", label: "Portfolio" },
    { path: "/service", icon: "fa-concierge-bell", label: "Services" },
    { path: "/testimonial", icon: "fa-comments", label: "Testimonials" },
    { path: "/user", icon: "fa-users", label: "Users" },
    { path: "/contactus", icon: "fa-phone", label: "Contact Us" },
    { path: "/settings", icon: "fa-cog", label: "Settings" },
  ];

  return (
    <aside className={`admin-sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Header */}
      <div className="sidebar-header d-flex align-items-center justify-content-center flex-column py-4">
        <img
          src="https://i.pravatar.cc/100"
          alt="Admin"
          className="admin-avatar mb-2"
        />
        {isExpanded && <span className="admin-name">John Doe</span>}
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={
                location.pathname === item.path ? "active nav-link" : "nav-link"
              }
            >
              <i className={`fa ${item.icon}`}></i>
              {isExpanded && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
=======
import { Link } from "react-router-dom";

export default function AdminSidebar({ isExpanded }) {
    return (
        <div id="sidebar" className={isExpanded ? "expanded" : ""}>
            <div className="sidebar-header">
                <img src="https://i.pravatar.cc/100" alt="Admin" className="admin-avatar" />
                <span className="admin-name">John Doe</span>
            </div>

            <ul className="nav flex-column mt-3  sidebar-nav">
                <li><Link to="/dashboard" className="nav-link"><i className="fa fa-home"></i> <span>Dashboard</span></Link></li>
                <li><Link to="/skill" className="nav-link"><i className="fa fa-list"></i> <span>Skill</span></Link></li>
                <li><Link to="/education" className="nav-link"><i className="fa fa-list"></i> <span>Education</span></Link></li>
                <li><Link to="/experience" className="nav-link"><i className="fa fa-list"></i> <span>Experiences</span></Link></li>
                <li><Link to="/certificate" className="nav-link"><i className="fa fa-list"></i> <span>Certificate</span></Link></li>
                <li><Link to="/portfolio" className="nav-link"><i className="fa fa-star"></i> <span>Portfolio</span></Link></li>
                <li><Link to="/service" className="nav-link"><i className="fa fa-envelope"></i> <span>Service</span></Link></li>
                <li><Link to="/testimonial" className="nav-link"><i className="fa fa-shopping-cart"></i> <span>Testimonial</span></Link></li>
                <li><Link to="/user" className="nav-link"><i className="fa fa-users"></i> <span>User</span></Link></li>
                <li><Link to="/contactus" className="nav-link"><i className="fa fa-phone"></i> <span>ContactUs</span></Link></li>
                <li><Link to="/settings" className="nav-link"><i className="fa fa-cog"></i> <span>Settings</span></Link></li>
            </ul>
        </div>
    );
>>>>>>> 7c8c6d34840fb83ec2a1bf99a7bf8b648771c9aa
}
