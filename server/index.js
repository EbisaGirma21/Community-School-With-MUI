require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const CurriculumRoutes = require("./routes/CurriculumRoutes");
const ModuleRoutes = require("./routes/ModuleRoutes");
const AcademicSessionRoutes = require("./routes/AcademicSessionRoutes");
const AcademicCurriculumRoutes = require("./routes/AcademicCurriculumRoutes");


// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/curriculum", CurriculumRoutes);
app.use("/api/module", ModuleRoutes);
app.use("/api/academicSession",AcademicSessionRoutes)
app.use("/api/academicCurriculum",AcademicCurriculumRoutes)

// MONGOOSE CONFIGURATION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
