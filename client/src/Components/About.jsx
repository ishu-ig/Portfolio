import React from 'react';

export default function About() {
    return (
        <section id="about" className="about-section py-5" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
            <div className="container">
                {/* Section Title */}
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className="section-title" style={{ color: "var(--text-color)" }}>About</h2>
                    <div className="title-shape">
                        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                    </div>
                    <p className="section-subtitle" style={{ color: "var(--text-color)" }}>
                        Passionate about building scalable web applications and exploring the latest technologies in full stack development.
                    </p>
                </div>

                <div className="row align-items-center">
                    {/* Profile Image */}
                    <div className="col-lg-6 text-center" data-aos="fade-right">
                        <div className="about-image">
                            <img src="/img/profile/profile-square-2.webp" alt="Profile" className="img-fluid rounded-4 shadow-lg" />
                        </div>
                    </div>

                    {/* About Content */}
                    <div className="col-lg-6" data-aos="fade-left">
                        <div className="about-content">
                            <h3 className="subtitle">About Me</h3>
                            <h2 className="about-heading" style={{ color: "var(--text-color)" }}>Full Stack Web Developer & Programmer</h2>
                            <p className="lead" style={{ color: "var(--text-color)" }}>
                                I specialize in building modern web applications using cutting-edge technologies like React, Node.js, MongoDB, and more. I enjoy solving complex problems and continuously improving my coding skills.
                            </p>
                            <p className='mb-5' style={{ color: "var(--text-color)" }}>
                                My goal is to develop innovative and efficient solutions that enhance user experience and drive business success.
                            </p>

                            {/* Personal Info */}
                            <div className="card pe-5" style={{ padding: "50px 50px", borderRadius:"20px"}}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="info-item">
                                            <p><strong>Name:</strong></p>
                                            <p>Ishaan Gupta</p>
                                        </div>
                                        <div className="info-item">
                                            <p><strong>Phone:</strong></p>
                                            <p>+91-8218635344</p>
                                        </div>
                                        <div className="info-item">
                                            <p><strong>Age:</strong></p>
                                            <p>23 Years</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="info-item">
                                            <p><strong>Email:</strong></p>
                                            <p>ishaanguptacse@gmail.com</p>
                                        </div>
                                        <div className="info-item">
                                            <p><strong>Occupation:</strong></p>
                                            <p>Full Stack Developer</p>
                                        </div>
                                        <div className="info-item">
                                            <p><strong>Nationality:</strong></p>
                                            <p>Indian</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Signature */}
                            <div className="signature mt-4">
                                <img src="/img/misc/signature-1.webp" alt="Signature" className="signature-img" style={{ color: "var(--text-color)" }} />
                                <div className="signature-info">
                                    <h4>Ishaan Gupta</h4>
                                    <p>Full Stack Developer & Programmer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}