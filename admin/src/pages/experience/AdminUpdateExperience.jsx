import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'


import formValidator from '../../FormValidators/formValidator'


import { getExperience, updateExperience } from "../../Redux/ActionCreartors/ExperienceActionCreators"
export default function AdminUpdateExperience() {
    let { _id } = useParams()  //in case of real backend
    // let { id } = useParams()
    let [data, setData] = useState({
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        description: "",
        active: true
    })
    let [error, setError] = useState({
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        description: "",
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let ExperienceStateData = useSelector(state => state.ExperienceStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.value  //in case of real backend
        // let value = e.target.files ? "Experience/" + e.target.files[0].name : e.target.value

        if (name !== "active") {
            setError((old) => {
                return {
                    ...old,
                    [name]: formValidator(e)
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }
    function postSubmit(e) {
        e.preventDefault()
        let errorItem = Object.values(error).find(x => x !== "")
        if (errorItem)
            setShow(true)
        else {
            let item = ExperienceStateData.find(x => x._id !== _id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())  // in case of real backend
            // let item = ExperienceStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setError((old) => {
                    return {
                        ...old,
                        "name": "Experience Already Exist"
                    }
                })
            }
            else {
                dispatch(updateExperience({ ...data }))

                // //in case of real backend and form has a file field
                // let formData = new FormData()
                // formData.append("_id", data._id)  //use id in case of RDBMS and use _id in case of mongodb
                // formData.append("name", data.name)
                // formData.append("description", data.description)
                // formData.append("level", data.level)
                // formData.append("active", data.active)
                // dispatch(updateExperience(formData))
                navigate("/Experience")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getExperience())
            if (ExperienceStateData.length) {
                // let item = ExperienceStateData.find(x => x.id === id)
                let item = ExperienceStateData.find(x => x._id === _id) //in case of real backend
                if (item)
                    setData({ ...item })
            }
        })()
    }, [ExperienceStateData.length])

    return (
        <>
            <div className="container">
                <h5 className="text-center text-light bg-primary p-2">Update Experience <Link to="/Experience"><i className="fa fa-arrow-left text-light float-end pt-1"></i></Link></h5>
                {/* Form */}
                <div className="card mt-3 shadow-sm p-4">
                <form onSubmit={postSubmit}>
                        <div className="mb-3">
                            <label>Job Title*</label>
                            <input type="text" name="jobTitle" value={data.jobTitle} onChange={getInputData} placeholder='Experience Name' className={`form-control border-3 ${show && error.jobTitle ? 'border-danger' : 'border-primary'}`} />
                            {show && error.jobTitle ? <p className='text-danger text-capitalize'>{error.jobTitle}</p> : null}
                        </div>
                        <div className="mb-3">
                            <label>Description*</label>
                            <textarea name="description"   value={data.description} onChange={getInputData} className={`form-control border-3 ${show && error.description ? 'border-danger' : 'border-primary'}`} placeholder='Message...' rows={5}></textarea>
                            {show && error.description ? <p className='text-danger text-capitalize'>{error.description}</p> : null}
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Start*</label>
                                <input type="date" name="startDate" value={data.startDate} onChange={getInputData} className={`form-control border-3 ${show && error.startDate ? 'border-danger' : 'border-primary'}`} />
                                {show && error.startDate ? <p className='text-danger text-capitalize'>{error.startDate}</p> : null}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>End Date*</label>
                                <input type="text" name="endDate"  onChange={getInputData} value={data.endDate} className={`form-control border-3 ${show && error.endDate ? 'border-danger' : 'border-primary'}`} />
                                {show && error.endDate ? <p className='text-danger text-capitalize'>{error.endDate}</p> : null}
                            </div>
                            </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Company Name*</label>
                                <input type="text" name="companyName" value={data.companyName} onChange={getInputData} className={`form-control border-3 ${show && error.companyName ? 'border-danger' : 'border-primary'}`} />
                                {show && error.companyName ? <p className='text-danger text-capitalize'>{error.companyName}</p> : null}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Active*</label>
                                <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-primary'>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <button type="submit" className='btn btn-primary w-100 text-light'>Update</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
