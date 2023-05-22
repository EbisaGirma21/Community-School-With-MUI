import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcademicSession from "./pages/AcademicSession/AcademicSession";
import AccCurriculum from "./pages/AcademicCurriculum/AcademicCurriculum";
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

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Dashboard />} />
            <Route path="academicSession">
              <Route
                index
                element={
                  <AcademicSessionProvider>
                    <AcademicSession />
                  </AcademicSessionProvider>
                }
              />
              <Route path=":academicSessionId" element={<AcademicSession />} />
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
              <Route path=":curriculumId" element={<Curriculum />} />
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
              <Route path=":academicCurriculumId" element={<AccCurriculum />} />
            </Route>
            <Route path="students">
              <Route index element={<Student />} />
              <Route path=":studentId" element={<Student />} />
            </Route>
            <Route path="teachers">
              <Route index element={<Teacher />} />
              <Route path=":teacherId" element={<Teacher />} />
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
              <Route path=":moduleId" element={<Module />} />
            </Route>
            <Route path="departments">
              <Route index element={<Department />} />
              <Route path=":departmentId" element={<Department />} />
            </Route>
            <Route path="ass_teacher">
              <Route index element={<AssignTeacher />} />
            </Route>
            <Route path="registration">
              <Route
                index
                element={
                  <AcademicCurriculumProvider>
                    <CurriculumProvider>
                      <GradeProvider>
                        <Registration />
                      </GradeProvider>
                    </CurriculumProvider>
                  </AcademicCurriculumProvider>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
