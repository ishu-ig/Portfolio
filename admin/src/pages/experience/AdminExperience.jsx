import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import formValidator from "../../FormValidators/formValidator";
import { getExperience, updateExperience } from "../../Redux/ActionCreartors/ExperienceActionCreators";

export default function AdminUpdateExperience() {
  const { _id } = useParams(); // in case of real backend

  const [data, setData] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
    active: true,
  });

  const [error, setError] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const ExperienceStateData = useSelector((state) => state.ExperienceStateData);
  const dispatch = useDispatch();

  // ✅ Handle Input Change
  function getInputData(e) {
    const { name, value } = e.target;

    if (name !== "active") {
      setError((old) => ({
        ...old,
        [name]:
          typeof value === "string" && value.trim() !== ""
            ? formValidator(e)
            : "",
      }));
    }

    setData((old) => ({
      ...old,
      [name]: name === "active" ? value === "1" : value,
    }));
  }

  // ✅ Handle Submit
  function postSubmit(e) {
    e.preventDefault();
    const errorItem = Object.values(error).find((x) => x !== "");

    if (errorItem) {
      setShow(true);
    } else {
      // ✅ Fixed duplicate check safely
      const item = ExperienceStateData.find(
        (x) =>
          x._id !== _id &&
          x.jobTitle &&
          data.jobTitle &&
          x.jobTitle.toLocaleLowerCase() === data.jobTitle.toLocaleLowerCase()
      );

      if (item) {
        setShow(true);
        setError((old) => ({
          ...old,
          jobTitle: "Experience with this Job Title already exists",
        }));
      } else {
        dispatch(updateExperience({ ...data }));
        navigate("/experience");
      }
    }
  }

  // ✅ Fetch and Populate Data
  useEffect(() => {
    dispatch(getExperience());
  }, [dispatch]);

  useEffect(() => {
    if (ExperienceStateData.length > 0) {
      const item = ExperienceStateData.find((x) => x._id === _id);
      if (item) setData({ ...item });
    }
  }, [ExperienceStateData, _id]);

  return (
    <>
      <div className="container">
        <h5 className="text-center text-light bg-primary p-2">
          Update Experience{" "}
          <Link to="/experience">
            <i className="fa fa-arrow-left text-light float-end pt-1"></i>
          </Link>
        </h5>

        {/* Form */}
        <div className="card mt-3 shadow-sm p-4">
          <form onSubmit={postSubmit}>
            {/* Job Title */}
            <div className="mb-3">
              <label>Job Title*</label>
              <input
                type="text"
                name="jobTitle"
                value={data.jobTitle}
                onChange={getInputData}
                placeholder="Enter Job Title"
                className={`form-control border-3 ${
                  show && error.jobTitle ? "border-danger" : "border-primary"
                }`}
              />
              {show && error.jobTitle && (
                <p className="text-danger text-capitalize">{error.jobTitle}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label>Description*</label>
              <textarea
                name="description"
                value={data.description}
                onChange={getInputData}
                className={`form-control border-3 ${
                  show && error.description ? "border-danger" : "border-primary"
                }`}
                placeholder="Enter Description..."
                rows={5}
              ></textarea>
              {show && error.description && (
                <p className="text-danger text-capitalize">
                  {error.description}
                </p>
              )}
            </div>

            {/* Start / End Dates */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Start Date*</label>
                <input
                  type="date"
                  name="startDate"
                  value={data.startDate}
                  onChange={getInputData}
                  className={`form-control border-3 ${
                    show && error.startDate ? "border-danger" : "border-primary"
                  }`}
                />
                {show && error.startDate && (
                  <p className="text-danger text-capitalize">{error.startDate}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label>End Date*</label>
                <input
                  type="text"
                  name="endDate"
                  value={data.endDate}
                  onChange={getInputData}
                  className={`form-control border-3 ${
                    show && error.endDate ? "border-danger" : "border-primary"
                  }`}
                  placeholder="Enter End Date"
                />
                {show && error.endDate && (
                  <p className="text-danger text-capitalize">{error.endDate}</p>
                )}
              </div>
            </div>

            {/* Company + Active */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Company Name*</label>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={getInputData}
                  className={`form-control border-3 ${
                    show && error.companyName
                      ? "border-danger"
                      : "border-primary"
                  }`}
                  placeholder="Enter Company Name"
                />
                {show && error.companyName && (
                  <p className="text-danger text-capitalize">
                    {error.companyName}
                  </p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label>Active*</label>
                <select
                  name="active"
                  value={data.active ? "1" : "0"}
                  onChange={getInputData}
                  className="form-select border-3 border-primary"
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="mb-3">
              <button type="submit" className="btn btn-primary w-100 text-light">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
