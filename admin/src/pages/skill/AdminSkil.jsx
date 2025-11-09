import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

import { deleteSkill, getSkill } from "../../Redux/ActionCreartors/SkillActionCreators";

export default function AdminSkill() {
  const SkillStateData = useSelector((state) => state.SkillStateData);
  const dispatch = useDispatch();

  // 🗑 Delete Skill
  const deleteRecord = (_id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      dispatch(deleteSkill({ _id }));
      getAPIData();
    }
  };

  // 🔄 Fetch + Initialize DataTable
  const getAPIData = () => {
    dispatch(getSkill());
    const timer = setTimeout(() => {
      if ($.fn.DataTable.isDataTable("#SkillTable")) {
        $("#SkillTable").DataTable().destroy();
      }
      $("#SkillTable").DataTable({
        responsive: true,
        autoWidth: false,
        pageLength: 8,
        language: {
          searchPlaceholder: "Search skills...",
          search: "",
        },
      });
    }, 400);
    return timer;
  };

  useEffect(() => {
    const timer = getAPIData();
    return () => clearTimeout(timer);
  }, [SkillStateData.length]);

  return (
    <div className="admin-skill-container p-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-light rounded p-3 shadow-sm">
        <h5 className="mb-2 mb-md-0 fw-semibold text-light">
          <i className="fa fa-lightbulb me-2"></i> Skill Management
        </h5>
        <Link
          to="/skill/create"
          className="btn btn-light text-primary fw-semibold shadow-sm"
        >
          <i className="fa fa-plus me-1"></i> Add Skill
        </Link>
      </div>

      {/* Table */}
      <div className="table-responsive mt-4">
        <table
          id="SkillTable"
          className="table table-striped table-bordered align-middle shadow-sm responsive-table"
        >
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th className="text-center">Level</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {SkillStateData.length > 0 ? (
              SkillStateData.map((item, i) => (
                <tr key={item._id || i}>
                  {/* ID */}
                  <td data-label="ID" className="text-muted small">
                    {item._id}
                  </td>

                  {/* Name */}
                  <td data-label="Name" className="fw-semibold">
                    {item.name}
                  </td>

                  {/* Description */}
                  <td data-label="Description" className="text-wrap">
                    {item.description || "—"}
                  </td>

                  {/* Level */}
                  <td data-label="Level" className="text-center">
                    <span className="badge bg-info text-dark px-3 py-2">
                      {item.level}
                    </span>
                  </td>

                  {/* Status */}
                  <td data-label="Status" className="text-center">
                    <span
                      className={`badge px-3 py-2 ${
                        item.active ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Edit */}
                  <td data-label="Edit" className="text-center">
                    <Link
                      to={`/skill/update/${item._id}`}
                      className="table-action-btn edit"
                      title="Edit Skill"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                  </td>

                  {/* Delete */}
                  <td data-label="Delete" className="text-center">
                    <button
                      className="table-action-btn delete"
                      title="Delete Skill"
                      onClick={() => deleteRecord(item._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  <i className="fa fa-spinner fa-spin me-2"></i> Loading skills...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
