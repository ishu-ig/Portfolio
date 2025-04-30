import React from "react";

export default function Footer() {
    return (
        <footer id="footer" className="footer py-4">
            <div className="container text-center">
                {/* Copyright */}
                <p className="copyright mb-2">
                    © <span>Copyright</span> <strong className="sitename px-1">EasyFolio</strong> <span>All Rights Reserved</span>
                </p>

                {/* Social Links */}
                <div className="social-links d-flex justify-content-center gap-3">
                    <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                </div>

                {/* Credits */}
                <p className="credits mt-2">
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </p>
            </div>
        </footer>
    );
}
