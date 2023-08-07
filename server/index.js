require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const CurriculumRoutes = require("./routes/CurriculumRoutes");
const ModuleRoutes = require("./routes/ModuleRoutes");
const DepartmentRoutes = require("./routes/DepartmentRoutes");
const TeacherRoutes = require("./routes/TeacherRoutes");
const StudentRoutes = require("./routes/StudentRoutes");
const AcademicSessionRoutes = require("./routes/AcademicSessionRoutes");
const AcademicCurriculumRoutes = require("./routes/AcademicCurriculumRoutes");
const GradeRoutes = require("./routes/GradeRoutes");
const SubjectRoutes = require("./routes/SubjectRoutes");
const SectionRoutes = require("./routes/SectionRoutes");
const UserRoutes = require("./routes/UserRoutes");
const MarkRoutes = require("./routes/MarkRoutes");
const AssessmentWeighRoutes = require("./routes/AssessmentWeightRoutes");

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
app.use("/api/department", DepartmentRoutes);
app.use("/api/teacher", TeacherRoutes);
app.use("/api/student", StudentRoutes);
app.use("/api/grade", GradeRoutes);
app.use("/api/academicSession", AcademicSessionRoutes);
app.use("/api/academicCurriculum", AcademicCurriculumRoutes);
app.use("/api/subject", SubjectRoutes);
app.use("/api/section", SectionRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/mark", MarkRoutes);
app.use("/api/assessmentWeight", AssessmentWeighRoutes);

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
