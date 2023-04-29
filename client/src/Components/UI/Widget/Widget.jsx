import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
const Widget = ({ type }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">Male Student</span>
        <span className="counter">1123</span>
        <span className="link">See detail of students</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20%
        </div>
        <PersonOutlinedIcon className="icon" />
      </div>
    </div>
  );
};

export default Widget;
