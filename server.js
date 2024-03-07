require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const resourcesRouter = require("./routes/resources");
const { sequelize } = require("./config/database");

/*TODO: 
-SETUP CORS 
-SETUP firebase SDK
*/

app.use(express.json());

app.use("/api", resourcesRouter);

app.get("/", (req, res) => {
  res.send(
    `<a href="http://localhost:${PORT}/api/resources">/api/resources</a>`
  );
});

sequelize.sync().then(() => {
  console.log("Database synced successfully.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
