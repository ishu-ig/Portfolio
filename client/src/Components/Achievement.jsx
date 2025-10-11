import React, { useState, useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Achievement() {
    const [counters, setCounters] = useState([
        { icon: "fa fa-user-graduate", label: "Projects Built", target: 15, value: 0 },
        { icon: "fa fa-code", label: "Programming Challenges Solved", target: 120, value: 0 },
        { icon: "fa fa-lightbulb", label: "Innovative Ideas", target: 20, value: 0 },
        { icon: "fa fa-award", label: "Certifications Earned", target: 10, value: 0 },
    ]);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        AOS.refresh();
    }, []);

    // Counter Animation
    useEffect(() => {
        const intervals = counters.map((counter, index) => {
            let start = 0;
            const increment = Math.ceil(counter.target / 100);
            return setInterval(() => {
                start += increment;
                if (start >= counter.target) {
                    start = counter.target;
                    clearInterval(intervals[index]);
                }
                setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = { ...counter, value: start };
                    return newCounters;
                });
            }, 20);
        });

        return () => intervals.forEach(clearInterval);
    }, []);

    return (
        <section className="py-5 text-center" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
            <div className="container">
                <h2 className="mb-5" data-aos="fade-down">Achievements</h2>
                <div className="row g-4">
                    {counters.map((counter, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay={index * 200}>
                            <div className="achievement-card d-flex flex-column align-items-center justify-content-center text-center p-4 shadow-lg">
                                <i className={`${counter.icon} fa-3x mb-3 text-primary`}></i>
                                <h2 className="fw-bold display-6">{counter.value}+</h2>
                                <p className="fs-5">{counter.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
