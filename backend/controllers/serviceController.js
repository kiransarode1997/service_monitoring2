const db = require("../db");

// Get all services
exports.getServices = (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Add a new service
exports.addService = (req, res) => {
  const { servicename, serviceip, servicecheck, status } = req.body;
  db.query(
    "INSERT INTO services (servicename, serviceip, servicecheck, status) VALUES (?, ?, ?, ?)",
    [servicename, serviceip, servicecheck, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Service added successfully" });
    }
  );
};

// Update a service
exports.updateService = (req, res) => {
    const { id } = req.params;
    const { serviceip, servicecheck, status } = req.body;
  
    if (!id) return res.status(400).json({ error: "Service ID is required" });
  
    db.query(
      "UPDATE services SET serviceip = ?, servicecheck = ?, status = ? WHERE id = ?",
      [serviceip, servicecheck, status, id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Service not found" });
        res.json({ message: "Service updated successfully" });
      }
    );
  };
  

// Delete a service
exports.deleteService = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM services WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service deleted successfully" });
  });
};
