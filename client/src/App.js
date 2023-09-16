import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { SectionProvider } from "./context/SectionContext";
import { MarkProvider } from "./context/MarkContext";
import { AssessmentWeightProvider } from "./context/AssessmentWeightContext";
import Requests from "./pages/Requests/Requests";
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
                          <AssessmentWeightProvider>
                            <Curriculum />
                          </AssessmentWeightProvider>
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
              <Route
                index
                element={
                  <AcademicSessionProvider>
                    <AcademicCurriculumProvider>
                      <CurriculumProvider>
                        <GradeProvider>
                          <SectionProvider>
                            <Student />
                          </SectionProvider>
                        </GradeProvider>
                      </CurriculumProvider>
                    </AcademicCurriculumProvider>
                  </AcademicSessionProvider>
                }
              />
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
            <Route path="requests">
              <Route index element={<Requests />} />
            </Route>
            <Route path="modules">
              <Route
                index
                element={
                  <DepartmentProvider>
                    <TeacherProvider>
                      <ModuleProvider>
                        <Module />
                      </ModuleProvider>
                    </TeacherProvider>
                  </DepartmentProvider>
                }
              />
            </Route>
            <Route path="departments">
              <Route
                index
                element={
                  <TeacherProvider>
                    <DepartmentProvider>
                      <Department />
                    </DepartmentProvider>
                  </TeacherProvider>
                }
              />
            </Route>
            <Route path="assignTeacher">
              <Route
                index
                element={
                  <AcademicSessionProvider>
                    <AcademicCurriculumProvider>
                      <CurriculumProvider>
                        <GradeProvider>
                          <SectionProvider>
                            <TeacherProvider>
                              <AssignTeacher />
                            </TeacherProvider>
                          </SectionProvider>
                        </GradeProvider>
                      </CurriculumProvider>
                    </AcademicCurriculumProvider>
                  </AcademicSessionProvider>
                }
              />
            </Route>
            <Route path="registration">
              <Route
                index
                element={
                  <AcademicSessionProvider>
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
                  </AcademicSessionProvider>
                }
              />
            </Route>
            <Route path="result">
              <Route
                index
                element={
                  <AcademicSessionProvider>
                    <AcademicCurriculumProvider>
                      <CurriculumProvider>
                        <GradeProvider>
                          <SectionProvider>
                            <MarkProvider>
                              <SubjectProvider>
                                <Result />
                              </SubjectProvider>
                            </MarkProvider>
                          </SectionProvider>
                        </GradeProvider>
                      </CurriculumProvider>
                    </AcademicCurriculumProvider>
                  </AcademicSessionProvider>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{ width: "450px", right: "120px" }}
      />
    </Box>
  );
}

export default App;
