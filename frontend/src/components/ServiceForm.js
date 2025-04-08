import React, { useState } from "react";
import axios from "axios";

const ServiceForm = ({ fetchServices }) => {
  const [service, setService] = useState({
    servicename: "",
    serviceip: "",
    servicecheck: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/services", service);
    fetchServices();
    setService({ servicename: "", serviceip: "", servicecheck: "", status: "Active" });
    document.getElementById("closeModal").click(); // Close modal
  };

  return (
    <div className="container mt-4">
      {/* Add Service Button */}
      <div className="card p-3">
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="mb-0">Service Management</h3>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#serviceModal"
      >
        Add Service
      </button>
    </div>
  </div>
      {/* Bootstrap Modal */}
      <div className="modal fade" id="serviceModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Service</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="servicename"
                    placeholder="Enter service name"
                    value={service.servicename}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Service IP</label>
                  <input
                    type="text"
                    className="form-control"
                    name="serviceip"
                    placeholder="Enter service IP"
                    value={service.serviceip}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Service Check</label>
                  <input
                    type="text"
                    className="form-control"
                    name="servicecheck"
                    placeholder="Enter service check status"
                    value={service.servicecheck}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="status" value={service.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Save</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
