import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccCalendar from "./Pages/Basic/AcademinCalendar/AcademicCalendar";
import AccCurriculum from "./Pages/Basic/AcademicCurriculum/AcademicCurriculum";
import Curriculum from "./Pages/Basic/Curriculum/Curriculum";
import Student from "./Pages/List/Student/Student";
import Registration from "./Pages/Operation/Registration/Registration";
import Teacher from "./Pages/List/Teacher/Teacher";
import Module from "./Pages/List/Module/Module";
import Department from "./Pages/List/Department/Department";
import AssignTeacher from "./Pages/Operation/AssignTeacher/AssignTeacher";
import { CurriculumProvider } from "./Context/CurriculumContext";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Home />} />
            <Route path="academicCalendar">
              <Route index element={<AccCalendar />} />
              <Route path=":academicCalendarId" element={<AccCalendar />} />
            </Route>
            <Route path="curriculum">
              <Route
                index
                element={
                  <CurriculumProvider>
                    <Curriculum />
                  </CurriculumProvider>
                }
              />
              <Route path=":curriculumId" element={<Curriculum />} />
            </Route>
            <Route path="academicCurriculum">
              <Route index element={<AccCurriculum />} />
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
              <Route index element={<Module />} />
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
              <Route index element={<Registration />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
