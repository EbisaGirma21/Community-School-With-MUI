import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AcademicSession from "./pages/AcademicSession/AcademicSession";
import Curriculum from "./pages/Curriculum/Curriculum";
import Student from "./pages/Student/Student";
import Registration from "./pages/Registration/Registration";
import Teacher from "./pages/Teacher/Teacher";
import Module from "./pages/Module/Module";
import Department from "./pages/Department/Department";
import AssignTeacher from "./pages/AssignTeacher/AssignTeacher";
import { CurriculumProvider } from "./context/CurriculumContext";
import { ModuleProvider } from "./context/ModuleContext";
import { AcademicSessionProvider } from "./context/AcademicSessionContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import AcademicCurriculum from "./pages/AcademicCurriculum/AcademicCurriculum";
import { AcademicCurriculumProvider } from "./context/AcademicCurriculumContext";
import { GradeProvider } from "./context/GradeContext";
import { SubjectProvider } from "./context/SubjectContext";
import Layout from "./components/Layout";
import { DepartmentProvider } from "./context/DepartmentContext";
import { TeacherProvider } from "./context/TeacherContext";
import { NewStudentProvider } from "./context/NewStudentContext";
import axios from "axios";
import { Box } from "@mui/material";
import Login from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import Result from "./pages/Result/Result";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
function App() {
  axios.defaults.baseURL = "http://localhost:8000/api";
  const { user } = useContext(AuthContext);

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/dashboard"
            element={user !== null ? <Layout /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="academicSession">
              <Route
                index
                element={
                  <AcademicSessionProvider>
                    <AcademicSession />
                  </AcademicSessionProvider>
                }
              />
            </Route>
            <Route path="curriculum">
              <Route
                index
                element={
                  <CurriculumProvider>
                    <GradeProvider>
                      <SubjectProvider>
                        <ModuleProvider>
                          <Curriculum />
                        </ModuleProvider>
                      </SubjectProvider>
                    </GradeProvider>
                  </CurriculumProvider>
                }
              />
            </Route>
            <Route path="academicCurriculum">
              <Route
                index
                element={
                  <AcademicSessionProvider>
                    <CurriculumProvider>
                      <AcademicCurriculumProvider>
                        <AcademicCurriculum />
                      </AcademicCurriculumProvider>
                    </CurriculumProvider>
                  </AcademicSessionProvider>
                }
              />
            </Route>
            <Route path="students">
              <Route index element={<Student />} />
            </Route>
            <Route path="teachers">
              <Route
                index
                element={
                  <TeacherProvider>
                    <Teacher />
                  </TeacherProvider>
                }
              />
            </Route>
            <Route path="modules">
              <Route
                index
                element={
                  <ModuleProvider>
                    <Module />
                  </ModuleProvider>
                }
              />
            </Route>
            <Route path="departments">
              <Route
                index
                element={
                  <DepartmentProvider>
                    <Department />
                  </DepartmentProvider>
                }
              />
            </Route>
            <Route path="assignTeacher">
              <Route
                index
                element={
                  <AcademicCurriculumProvider>
                    <CurriculumProvider>
                      <GradeProvider>
                        <AssignTeacher />
                      </GradeProvider>
                    </CurriculumProvider>
                  </AcademicCurriculumProvider>
                }
              />
            </Route>
            <Route path="registration">
              <Route
                index
                element={
                  <AcademicCurriculumProvider>
                    <CurriculumProvider>
                      <GradeProvider>
                        <SubjectProvider>
                          <NewStudentProvider>
                            <Registration />
                          </NewStudentProvider>
                        </SubjectProvider>
                      </GradeProvider>
                    </CurriculumProvider>
                  </AcademicCurriculumProvider>
                }
              />
            </Route>
            <Route path="result">
              <Route index element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
