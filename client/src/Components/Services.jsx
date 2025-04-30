import React, { useEffect } from "react";
import { getService } from '../Redux/ActionCreartors/ServiceActionCreators';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Service() {
  let ServiceStateData = useSelector(state => state.ServiceStateData)
    let dispatch = useDispatch()

    useEffect(()=>{
        (()=>{
            dispatch(getService())
        })()
    })

  return (
    <section id="services" className="services-section py-5" >
      <div className="container text-center">
        <h2 className="section-title">Our Services</h2>
        <div className="title-shape">
          <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </div>
        <p className="section-description mb-3">
          Discover how our AI-driven solutions enhance your health and well-being.
        </p>

        <div className="row g-4 mt-5 justify-content-center">
          {ServiceStateData.map((service) => (
            <div className="col-md-6 col-lg-4" key={service._id}>
              <div className="service-card" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.shortDescription}</p>
                <Link to={`/serviceDetail/${service._id}`} className="btn btn-secondary py-2">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
