import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCertificate } from '../Redux/ActionCreartors/CertificateActionCreators';
import { Link } from "react-router-dom";
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Certificates() {
    let CertificateStateData = useSelector(state => state.CertificateStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCertificate());

        // Initialize AOS
        AOS.init({ duration: 1000, once: false }); // triggers on scroll up and down
        AOS.refresh();
    }, [dispatch]);

    return (
        <section id="certificate" className="container mt-5">
            <div className="container">
                {/* Section Title */}
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className="section-title" style={{ color: "var(--text-color)" }}>Certificates</h2>
                    <div className="title-shape" data-aos="fade-up" data-aos-delay={100}>
                        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                    </div>
                    <p className="section-subtitle" style={{ color: "var(--text-color)" }} data-aos="fade-up" data-aos-delay={200}>
                        Showcasing my professional certifications that validate my skills and expertise in various domains.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center">
                {CertificateStateData.filter(x => x.active).map((cert, index) => (
                    <div
                        key={cert._id}
                        className="col-lg-4 col-md-6 col-sm-8 mb-4"
                        data-aos="fade-up"
                        data-aos-delay={index * 100} // stagger animation
                    >
                        <div className="card certificate-card shadow-sm">
                            <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${cert.pic}`} target='_blank' rel='noreferrer'>
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${cert.pic}`}
                                    className="card-img-top"
                                    height={100}
                                    style={{ backgroundColor: "var(--bg-color)" }}
                                    alt={cert.title}
                                />
                            </Link>
                            <div className="card-body text-center" style={{ backgroundColor: "var(--bg-color)" }}>
                                <h5 className="card-title">{cert.name}</h5>
                                <p className="card-text">{cert.issuedBy}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
