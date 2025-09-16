import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { createTestimonial, getTestimonial } from "../Redux/ActionCreartors/TestimonialActionCreators";

import formValidator from '../FormValidators/formValidator';
import imageValidator from '../FormValidators/imageValidator';

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonial() {
  const testimonials = useSelector(state => state.TestimonialStateData);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: "",
    pic: "",
    message: "",
    active: true
  });

  const [error, setError] = useState({
    name: "Name Field is Mandatory",
    pic: "Pic Field is Mandatory",
    message: "Message Field is Mandatory"
  });

  useEffect(() => {
    dispatch(getTestimonial());
  }, [dispatch]);

  const getInputData = (e) => {
    const { name } = e.target;
    const value = e.target.files ? e.target.files[0] : e.target.value;

    if (name !== "active") {
      setError(prev => ({
        ...prev,
        [name]: e.target.files ? imageValidator(e) : formValidator(e)
      }));
    }

    setData(prev => ({
      ...prev,
      [name]: name === "active" ? (value === "1") : value
    }));
  };

  const postSubmit = (e) => {
    e.preventDefault();
    const errorItem = Object.values(error).find(x => x !== "");
    if (errorItem) {
      setShow(true);
    } else {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("pic", data.pic);
      formData.append("active", data.active);
      formData.append("message", data.message);

      dispatch(createTestimonial(formData));
      setShowModal(false);
      setShow(false);
      setData({ name: "", pic: "", message: "", active: true });
    }
  };

  return (
    <section id="testimonials" className="testimonials-section py-5" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <div className="container text-center">
        <h2 className="section-title" style={{ color: "var(--text-color)" }}>
          Testimonials
          <button className="btn btn-primary mb-4 float-end" onClick={() => setShowModal(true)}>
            <i className='fa fa-plus fs-5  text-light'></i>
          </button>
        </h2>
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
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            className="swiper-container"
          >
            {testimonials.filter(x=>x.active).map((testimonial) => (
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
                        <h4 className="testimonial-name" style={{ color: "var(--text-color)" }}>{testimonial.name}</h4>
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

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
              <div className="modal-header">
                <h5 className="modal-title">Add Testimonial</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={postSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      onChange={getInputData}
                      placeholder="Your Name"
                      value={data.name}
                      className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`}
                    />
                    {show && error.name && <p className='text-danger text-capitalize'>{error.name}</p>}
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="message"
                      onChange={getInputData}
                      value={data.message}
                      className={`form-control border-3 ${show && error.message ? 'border-danger' : 'border-primary'}`}
                      placeholder="Message..."
                      rows={5}
                    ></textarea>
                    {show && error.message && <p className='text-danger text-capitalize'>{error.message}</p>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="file"
                      name="pic"
                      onChange={getInputData}
                      className={`form-control border-3 ${show && error.pic ? 'border-danger' : 'border-primary'}`}
                    />
                    {show && error.pic && <p className='text-danger text-capitalize'>{error.pic}</p>}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
