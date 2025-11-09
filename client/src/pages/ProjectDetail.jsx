import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPortfolio } from "../Redux/ActionCreartors/PortfolioActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectDetails() {
    let { _id } = useParams();
    let [data, setData] = useState(null);
    let [relatedData, setRelatedData] = useState([]);
    let PortfolioStateData = useSelector((state) => state.PortfolioStateData);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPortfolio());
    }, [dispatch]);

    useEffect(() => {
        if (PortfolioStateData.length) {
            let selectedProject = PortfolioStateData.find((x) => x._id === _id);
            setData(selectedProject || null);
            let otherProjects = PortfolioStateData.filter((x) => x._id !== _id);
            setRelatedData(otherProjects);
        }
    }, [PortfolioStateData, _id]);

    if (!data) return <div className="text-center py-5">Loading project details...</div>;

    return (
        <>
            {/* Project Details */}
            <section className="project-details py-5">
                <div className="container text-center">
                    <h2 className="section-title" style={{ color: "var(--text-color)" }}>{data.name}</h2>
                    <div className="title-shape">
                        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="text-center">
                        <img
                            src={`${process.env.REACT_APP_BACKEND_SERVER}/${data.pic}`}
                            alt={data.name}
                            className="img-fluid rounded shadow-lg my-4"
                            style={{ maxWidth: "100%", borderRadius: "12px" }}
                        />
                    </div>

                    <p className="short-description fs-5 px-3">{data.shortDescription}</p>
                    <hr className="my-4" />

                    <div
                        className="long-description text-start mx-auto px-3"
                        dangerouslySetInnerHTML={{ __html: data.longDescription }}
                        style={{ maxWidth: "900px", wordWrap: "break-word" }}
                    ></div>

                    <div className="project-meta mt-4 px-3">
                        <p><strong className="fs-5">Category:</strong> {data.category}</p>
                        <p><strong className="fs-5">Tech Stack:</strong> {data.tech}</p>
                    </div>

                    <div className="btn-group gap-3">
                        {data.githubRepo && (
                        <div className="buttons mt-4">
                            <a
                                href={data.githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ padding: "10px 20px", borderRadius: "8px", fontWeight: "600" }}
                            >
                                View on GitHub
                            </a>
                        </div>
                    )}
                    <div className="buttons mt-4">
                            <Link
                                to = {`/`}
                                className="btn btn-primary px-5"
                                style={{ padding: "10px 20px", borderRadius: "8px", fontWeight: "600" }}
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            <section className="portfolio-section py-5">
                <div className="container text-center">
                    <h2 className="section-title">Other Projects</h2>
                    <div className="title-shape">
                        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="section-subtitle">Showcasing my best works in web development and design.</p>
                </div>

                <div className="container">
                    <div className="row g-4">
                        {relatedData.length === 0 ? (
                            <p className="text-center">No other projects available.</p>
                        ) : (
                            relatedData.map((item, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card portfolio-card shadow-sm h-100 border-0">
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                                            className="card-img-top img-fluid"
                                            alt={item.name}
                                            loading="lazy"
                                            style={{ borderRadius: "12px 12px 0 0", height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="category">{item.category}</p>
                                            <Link to={`/projectDetail/${item._id}`} className="btn btn-outline-primary mt-2">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
