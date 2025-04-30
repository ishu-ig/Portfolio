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

                    <img
                        src={`${process.env.REACT_APP_BACKEND_SERVER}/${data.pic}`}
                        alt={data.name}
                        className="img-fluid rounded shadow-lg my-4"
                        style={{ maxWidth: "600px", borderRadius: "12px" }}
                    />
                    <p className="short-description ">{data.shortDescription}</p>
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
                            <strong className="fs-5">Tech Stack :</strong> {data.tech}
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
            <section className="portfolio-section py-5">
                <div className="container text-center">
                    <h2 className="section-title">Other Projects</h2>
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
                    <p className="section-subtitle">
                        Showcasing my best works in web development and design.
                    </p>
                </div>

                <div className="container">
                    <div className="row g-4">
                        {relatedData.length === 0 ? (
                            <p className="text-center">No other projects available.</p>
                        ) : (
                            relatedData.map((item, index) => (
                                <div key={index} className="col-lg-4 col-md-6">
                                    <div className="card portfolio-card shadow-lg border-0">
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                                            className="card-img-top img-fluid"
                                            alt={item.name}
                                            loading="lazy"
                                            style={{ borderRadius: "12px 12px 0 0" }}
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
