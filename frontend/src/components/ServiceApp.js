import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceForm from "./ServiceForm";
import ServiceList from "./ServiceList";

const ServiceApp = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const response = await axios.get("http://localhost:5000/api/services");
    setServices(response.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container">

           
     
      {/* <h5>Service Management</h5> */}
        <ServiceForm fetchServices={fetchServices} />
      
      
      <ServiceList services={services} fetchServices={fetchServices} />
    </div>
  );
};

export default ServiceApp;
