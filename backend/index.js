const express = require("express");
const cors = require("cors");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", serviceRoutes   );

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
