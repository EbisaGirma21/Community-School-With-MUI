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
import { Home } from "./pages/Landing/Landing";
import Result from "./pages/Result/Result";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import { SectionProvider } from "./context/SectionContext";
import { MarkProvider } from "./context/MarkContext";
import { AssessmentWeightProvider } from "./context/AssessmentWeightContext";
import Requests from "./pages/Requests/Requests";
import { RequestProvider } from "./context/RequestContext";
import { ClubProvider } from "./context/ClubContext";
import { StudentProvider } from "./context/StudentContext";
import ClubTab from "./pages/Clubs/ClubTab";
import { ClubMemberProvider } from "./context/ClubMemberContext";
import { StudentInfo } from "./pages/StudentInfo/StudentInfo";
import MyDocs from "./pages/StudentInfo/MyDocs";
import StudentHome from "./pages/StudentInfo/StudentHome";
import MyAccount from "./pages/Profile/MyAccount";
import { MyInfo } from "./pages/Profile/MyInfo";
import { UserProvider } from "./context/UserContext";
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
            path="/studentInfo"
            element={
              user !== null ? (
                <StudentProvider>
                  <SubjectProvider>
                    <StudentInfo />
                  </SubjectProvider>
                </StudentProvider>
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<StudentHome />} />
            <Route path="myAccount">
              <Route
                index
                element={
                  <StudentProvider>
                    <TeacherProvider>
                      <UserProvider>
                        <MyAccount />
                      </UserProvider>
                    </TeacherProvider>
                  </StudentProvider>
                }
              />
            </Route>
            <Route path="myDocs">
              <Route index element={<MyDocs />} />
            </Route>
          </Route>
          <Route
            path="/myaccount"
            element={
              user !== null ? <MyInfo></MyInfo> : <Navigate to="/login" />
            }
          >
            <Route path="/myaccount">
              <Route
                index
                element={
                  <StudentProvider>
                    <TeacherProvider>
                      <UserProvider>
                        <MyAccount />
                      </UserProvider>
                    </TeacherProvider>
                  </StudentProvider>
                }
              />
            </Route>
          </Route>

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
                            <StudentProvider>
                              <Student />
                            </StudentProvider>
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
            <Route path="clubs">
              <Route
                index
                element={
                  <StudentProvider>
                    <TeacherProvider>
                      <ClubProvider>
                        <ClubMemberProvider>
                          <ClubTab />
                        </ClubMemberProvider>
                      </ClubProvider>
                    </TeacherProvider>
                  </StudentProvider>
                }
              />
            </Route>
            <Route path="requests">
              <Route
                index
                element={
                  <RequestProvider>
                    <Requests />
                  </RequestProvider>
                }
              />
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
                                <RequestProvider>
                                  <Result />
                                </RequestProvider>
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
