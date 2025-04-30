import React, { useState, useEffect } from "react";

export default function Achievement() {
    const [counters, setCounters] = useState([
        { icon: "fa fa-users", label: "Happy Customers", target: 5000, value: 0 },
        { icon: "fa fa-code", label: "Projects Completed", target: 1200, value: 0 },
        { icon: "fa fa-clock", label: "Hours Worked", target: 15000, value: 0 },
        { icon: "fa fa-award", label: "Awards Won", target: 25, value: 0 },
    ]);

    // Counter Animation Effect
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
        <section className="py-5 text-light text-center">
            <div className="container">
                <div className="row g-4">
                    {counters.map((counter, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                            <div className="p-4 border rounded shadow-lg card achievement-card">
                                {/* <i className={`${counter.icon} fa-3x mb-3 text-primary`}></i> */}
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
