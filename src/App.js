import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccCalendar from "./Pages/Basic/AcademinCalendar/AcademicCalendar";
import AccCurriculum from "./Pages/Basic/AcademicCurriculum/AcademicCurriculum";
import Curriculum from "./Pages/Basic/Curriculum/Curriculum";
import Student from "./Pages/List/Student/Student";
import Registration from './Pages/Operation/Registration/Registration'

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
              <Route index element={<Curriculum />} />
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
              <Route index element={<Student />} />
              <Route path=":teacherId" element={<Student />} />
            </Route>
            <Route path="modules">
              <Route index element={<Student />} />
              <Route path=":moduleId" element={<Student />} />
            </Route>
            <Route path="departments">
              <Route index element={<Student />} />
              <Route path=":departmentId" element={<Student />} />
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
