import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './Components/Sidebar';
import AdminNavbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

// Import other pages...

import AdminSkill from './pages/skill/AdminSkil';
import AdminCreateSkill from './pages/skill/AdminCreateSkill';
import AdminUpdateSkill from './pages/skill/AdminUpdateSkill';


import AdminTestimonial from './pages/testimonial/AdminTestimonial';
import AdminCreateTestimonial from './pages/testimonial/AdminCreateTestimonial';
import AdminUpdateTestimonial from './pages/testimonial/AdminUpdateTestimonial';


import AdminUser from './pages/user/AdminUser';
import AdminCreateUser from './pages/user/AdminCreateUser';
import AdminUpdateUser from './pages/user/AdminUpdateUser';



import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import ForgetPasswordPage1 from './pages/ForgetPasswordPage1';
import ForgetPasswordPage2 from './pages/ForgetPasswordPage2';
import ForgetPasswordPage3 from './pages/ForgetPasswordPage3';
import AdminContactUs from './pages/contactus/AdminContactUs';
import AdminContactUsShow from './pages/contactus/AdminContactUsShow';


import AdminExperience from './pages/experience/AdminExperience';
import AdminCreateExperience from './pages/experience/AdminCreateExperience';
import AdminUpdateExperience from './pages/experience/AdminUpdateExperience';
import AdminUpdateEducation from './pages/education/AdminUpdateEducation';
import AdminCreateEducation from './pages/education/AdminCreateEducation';
import AdminEducation from './pages/education/AdminExperience';
import AdminCertificate from './pages/certificate/AdminCertificate';
import AdminCreateCertificate from './pages/certificate/AdminCreateCertificate';
import AdminUpdateCertificate from './pages/certificate/AdminUpdateCertificate';
import AdminService from './pages/service/AdminService';
import AdminCreateService from './pages/service/AdminCreateService';
import AdminUpdateService from './pages/service/AdminUpdateService';
import AdminPortfolio from './pages/portfolio/AdminProduct';
import AdminCreatePortfolio from './pages/portfolio/AdminCreatePortfolio';
import AdminUpdatePortfolio from './pages/portfolio/AdminUpdatePortfolio';


export default function App() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(window.innerWidth > 992);

    // Function to check login status
    const checkLoginStatus = () => {
        return localStorage.getItem("login") === "true";
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarExpanded(window.innerWidth > 992);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <BrowserRouter>
            <MainContent isSidebarExpanded={isSidebarExpanded} toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} checkLoginStatus={checkLoginStatus} />
        </BrowserRouter>
    );
}

function MainContent({ isSidebarExpanded, toggleSidebar, checkLoginStatus }) {
    const location = useLocation();
    const navigate = useNavigate();

    const publicRoutes = ["/login", "/forgetPassword-1", "/forgetPassword-2", "/forgetPassword-3"];

    // Redirect to login if not logged in (except for public routes)
    useEffect(() => {
        if (!checkLoginStatus() && !publicRoutes.includes(location.pathname)) {
            navigate("/login");
        }
    }, [location, checkLoginStatus, navigate]);

    // Apply background color for login and forget password pages
    useEffect(() => {
        if (publicRoutes.includes(location.pathname)) {
            document.body.style.backgroundColor = "#f4f6f9"; // Light background for login & forget password pages
        } else {
            document.body.style.backgroundColor = ""; // Reset background for other pages
        }
    }, [location.pathname]);

    return (
        <div className={`app-container ${isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
            {/* Show Navbar and Sidebar except on login & forget password pages */}
            {!publicRoutes.includes(location.pathname) && <AdminNavbar toggleSidebar={toggleSidebar} />}
            {!publicRoutes.includes(location.pathname) && <AdminSidebar isExpanded={isSidebarExpanded} />}

            <div className="content">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgetPassword-1" element={<ForgetPasswordPage1 />} />
                    <Route path="/forgetPassword-2" element={<ForgetPasswordPage2 />} />
                    <Route path="/forgetPassword-3" element={<ForgetPasswordPage3 />} />
                    <Route path="/" element={<Home />} />

                   
                    {/* Brand Routes */}
                    <Route path="/skill" element={<AdminSkill/>} />
                    <Route path="/skill/create" element={<AdminCreateSkill/>} />
                    <Route path="/skill/update/:_id" element={<AdminUpdateSkill />} />

                    <Route path="/education" element={<AdminEducation/>} />
                    <Route path="/education/create" element={<AdminCreateEducation/>} />
                    <Route path="/education/update/:_id" element={<AdminUpdateEducation />} />

                    <Route path="/experience" element={<AdminExperience/>} />
                    <Route path="/experience/create" element={<AdminCreateExperience/>} />
                    <Route path="/experience/update/:_id" element={<AdminUpdateExperience />} />

                    <Route path="/certificate" element={<AdminCertificate/>} />
                    <Route path="/certificate/create" element={<AdminCreateCertificate/>} />
                    <Route path="/certificate/update/:_id" element={<AdminUpdateCertificate />} />

                    <Route path="/portfolio" element={<AdminPortfolio/>} />
                    <Route path="/portfolio/create" element={<AdminCreatePortfolio/>} />
                    <Route path="/portfolio/update/:_id" element={<AdminUpdatePortfolio />} />

                    <Route path="/service" element={<AdminService />} />
                    <Route path="/service/create" element={<AdminCreateService />} />
                    <Route path="/service/update/:_id" element={<AdminUpdateService />} />


                    {/* Testimonial Routes */}
                    <Route path="/testimonial" element={<AdminTestimonial />} />
                    <Route path="/testimonial/create" element={<AdminCreateTestimonial />} />
                    <Route path="/testimonial/update/:_id" element={<AdminUpdateTestimonial />} />


                    {/* User Routes */}
                    <Route path="/user" element={<AdminUser />} />
                    <Route path="/user/create" element={<AdminCreateUser />} />
                    <Route path="/user/update/:_id" element={<AdminUpdateUser />} />

                    {/* ContactUS Routes */}
                    <Route path="/contactus" element={<AdminContactUs />} />
                    <Route path="/contactus/view/:_id" element={<AdminContactUsShow />} />

                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/update-profile' element={<UpdateProfilePage />} />

                </Routes>

                {/* Show Footer except on login & forget password pages */}
                {!publicRoutes.includes(location.pathname) && <Footer />}
            </div>
        </div>
    );
}

