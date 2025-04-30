import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonial } from "../Redux/ActionCreartors/TestimonialActionCreators";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonial() {
  const testimonials = useSelector(state => state.TestimonialStateData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestimonial());
  }, [dispatch]);

  return (
    <section id="testimonials" className="testimonials-section py-5" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <div className="container text-center">
        <h2 className="section-title" style={{ color: "var(--text-color)" }}>Testimonials</h2>
        <div className="title-shape">
          <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </div>
        <p className="section-description mb-3" style={{ color: "var(--text-color)" }}>
          Hear what our satisfied clients have to say about their experiences with us.
        </p>

        <div className="testimonial-slider">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}   // Only one testimonial at a time
            loop={true}
            speed={800}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            className="swiper-container"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p className="testimonial-message">"{testimonial.message}"</p>
                    <div className="profile d-flex align-items-center justify-content-center">
                      <img 
                        src={`${process.env.REACT_APP_BACKEND_SERVER}/${testimonial.pic}`} 
                        className="profile-img rounded-circle"
                        alt={testimonial.name}
                      />
                      <div className="profile-info ms-3">
                        <h4 className="testimonial-name" style={{color: "var(--text-color)" }}>{testimonial.name}</h4>
                        <span className="testimonial-role">Verified Client</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
