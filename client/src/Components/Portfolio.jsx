import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio } from '../Redux/ActionCreartors/PortfolioActionCreators';
import { Link } from 'react-router-dom';

export default function Portfolio() {
    let PortfolioStateData = useSelector(state => state.PortfolioStateData)
    let dispatch = useDispatch()

    useEffect(()=>{
        (()=>{
            dispatch(getPortfolio())
        })()
    })
    return (
        <section id="portfolio" className="portfolio-section py-5" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }} >
            <div className="container text-center" data-aos="fade-up">
                <h2 className="section-title" style={{ color: "var(--text-color)" }}>Portfolio</h2>
                <div className="title-shape">
                    <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    </svg>
                </div>
                <p className="section-subtitle" style={{ color: "var(--text-color)" }}>Showcasing my best works in web design, graphics, motion, and branding.</p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                {/* Portfolio Filters */}
                <div className="portfolio-filters text-center mb-4" data-aos="fade-up" data-aos-delay="200">
                    <button className="btn filter-active" data-filter="*">All</button>
                    <button className="btn" data-filter=".filter-web">Web Design</button>
                    <button className="btn" data-filter=".filter-graphics">Graphics</button>
                    <button className="btn" data-filter=".filter-motion">Motion</button>
                    <button className="btn" data-filter=".filter-brand">Branding</button>
                </div>

                {/* Portfolio Grid */}
                <div className="row g-4 justify-content-center">
                    {PortfolioStateData.map((item, index) => (
                        <div key={index} className={`col-lg-4 col-md-6 portfolio-item ${item.filter}`}>
                            <div className="card portfolio-card">
                                <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} className="card-img-top img-fluid" alt={item.title} loading="lazy" />
                                <div className="portfolio-overlay">
                                    <div className="portfolio-actions">
                                        <Link href={item.img} className="glightbox preview-link" data-gallery="portfolio-gallery"><i className="bi bi-eye"></i></Link>
                                        <Link to={`projectDetail/${item._id}`} className="details-link"><i className="bi bi-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="category">{item.category}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
