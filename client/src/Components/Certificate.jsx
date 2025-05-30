import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCertificate } from '../Redux/ActionCreartors/CertificateActionCreators';
import { Link } from "react-router-dom";

const certificates = [
    {
        title: "Full-Stack Web Development",
        organization: "Coursera | Meta",
        issueDate: "March 2024",
        credentialURL: "https://example.com",
        image: "/img/certificates/fullstack.jpg",
    },
    {
        title: "AI & ML Specialization",
        organization: "Google AI",
        issueDate: "Jan 2024",
        credentialURL: "https://example.com",
        image: "/img/certificates/ai-ml.jpg",
    },
    {
        title: "UI/UX Design Mastery",
        organization: "Udemy",
        issueDate: "Feb 2024",
        credentialURL: "https://example.com",
        image: "/img/certificates/uiux.jpg",
    },
];

export default function Certificates() {
    let CertificateStateData = useSelector(state => state.CertificateStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getCertificate())
        })()
    })
    return (
        <section id="certificate" className="container mt-5">
            <div className="container">
                {/* Section Title */}
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className="section-title" style={{ color: "var(--text-color)" }}>Certificates</h2>
                    <div className="title-shape">
                        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                    </div>
                    <p className="section-subtitle" style={{ color: "var(--text-color)" }}>
                        Showcasing my professional certifications that validate my skills and expertise in various domains.
                    </p>
                </div>
            </div>
            <div className="row justify-content-center" >
                {CertificateStateData.map((cert) => (
                    <div key={cert._id} className="col-lg-4 col-md-6 col-sm-8 mb-4" >
                        <div className="card certificate-card shadow-sm" >
                            <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${cert.pic}`} target='_blank' rel='noreferrer'>
                                <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${cert.pic}`} className="card-img-top" height={100} style={{ backgroundColor: "var(--bg-color)" }} alt={cert.title} />
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
