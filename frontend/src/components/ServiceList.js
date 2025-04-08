import React, { useState } from "react";
import axios from "axios";


const ServiceList = ({ services, fetchServices }) => {
  const [editingService, setEditingService] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/services/${id}`);
    fetchServices();
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setUpdatedData(service);
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/services/${updatedData.id}`,
        updatedData
      );
      console.log("Update response:", response.data);
      fetchServices(); // Refresh data after update
      setEditingService(null);
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>id</th>
            <th>Service Name</th>
            <th>Service IP</th>
            <th>Service Check</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              {editingService?.id === service.id ? (
                <>
                <td>{service.id}</td>
                  <td>{service.servicename}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="serviceip"
                      value={updatedData.serviceip}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="servicecheck"
                      value={updatedData.servicecheck}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      className="form-select"
                      name="status"
                      value={updatedData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingService(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                <td>{service.id}</td>
                  <td>{service.servicename}</td>
                  <td>{service.serviceip}</td>
                  <td>{service.servicecheck}</td>
                  <td>{service.status}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(service)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(service.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
