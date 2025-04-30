import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getService } from "../Redux/ActionCreartors/ServiceActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function ServiceDetails() {
    let { _id } = useParams();
    let [data, setData] = useState(null);
    let [relatedData, setRelatedData] = useState([]);
    let ServiceStateData = useSelector((state) => state.ServiceStateData);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getService());
    }, [dispatch]);

    useEffect(() => {
        if (ServiceStateData.length) {
            let selectedProject = ServiceStateData.find((x) => x._id === _id);
            setData(selectedProject || null);

            let otherProjects = ServiceStateData.filter((x) => x._id !== _id);
            setRelatedData(otherProjects);
        }
    }, [ServiceStateData, _id]);

    if (!data) {
        return <div className="text-center py-5">Loading project details...</div>;
    }

    return (
        <>
            {/* Project Details Section */}
            <section className="project-details py-5">
                <div className="container text-center">
                    <h2 className="section-title" style={{ color: "var(--text-color)" }}>{data.name}</h2>
                    <div className="title-shape">
                        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </div>

                    <p className="short-description mt-5">{data.shortDescription}</p>
                    <hr />

                    <div
                        className="long-description"
                        dangerouslySetInnerHTML={{ __html: data.longDescription }}
                        style={{ maxWidth: "800px", margin: "0 auto" }}
                    ></div>

                    <div className="project-meta mt-4">
                        <p>
                            <strong className="fs-5">Category : </strong> {data.category}
                        </p>
                        <p>
                            <strong className="fs-5">Price : </strong> {data.price}
                        </p>
                        <p>
                            <strong className="fs-5">Duration : </strong> {data.duration} Weeks
                        </p>
                        <p>
                            <strong className="fs-5">Tech Stack :</strong> {data.technology}
                        </p>
                    </div>

                    <div className="buttons mt-4">
                        {data.githubRepo && (
                            <a
                                href={data.githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary me-3"
                                style={{ padding: "10px 20px", borderRadius: "8px", fontWeight: "600" }}
                            >
                                View on GitHub
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Projects Section */}
            <section id="services" className="services-section py-5" >
                  <div className="container text-center">
                    <h2 className="section-title">Other Services</h2>
                    <div className="title-shape">
                      <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                      </svg>
                    </div>
                    <p className="section-description mb-3">
                      Discover how our AI-driven solutions enhance your health and well-being.
                    </p>
            
                    <div className="row g-4 mt-5 justify-content-center">
                      {relatedData.map((service) => (
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
        </>
    );
}
