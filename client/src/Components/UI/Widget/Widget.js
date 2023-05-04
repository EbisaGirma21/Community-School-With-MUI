import "./Widget.scss";
import SchoolIcon from "@mui/icons-material/School";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

export const Students = () => {
  return (
    <div className="student-card card">
      <div className="left">
        <div className="right">
          <SchoolIcon className="icon" />
        </div>
        <span className="counter">2323</span>
        <span className="title">Student</span>
      </div>

      <div className="backCircle"></div>
      <div className="frontCirle"></div>
    </div>
  );
};

export const Teachers = () => {
  return (
    <div className="teacher-card card">
      <div className="left">
        <div className="right">
          <CastForEducationIcon className="icon" />
        </div>
        <span className="counter">213</span>
        <span className="title">Teacher</span>
      </div>

      <div className="backCircle"></div>
      <div className="frontCirle"></div>
    </div>
  );
};

export const MaleStudents = () => {
  return (
    <div className="male-student-card card">
      <div className="left">
        <SchoolIcon className="icon" />
      </div>
      <div className="right">
        <span className="counter">1234</span>
        <span className="title">Male Students</span>
      </div>

      <div className="backCircle"></div>
      <div className="frontCirle"></div>
    </div>
  );
};

export const FemaleStudents = () => {
  return (
    <div className="female-student-card card">
      <div className="left">
        <SchoolIcon className="icon" />
      </div>
      <div className="right">
        <span className="counter">1234</span>
        <span className="title">Female Students</span>
      </div>
      <div className="backCircle"></div>
      <div className="frontCirle"></div>
    </div>
  );
};
