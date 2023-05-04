import "./Featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "2009",
    male: 4000,
    female: 2400,
    total: 2400,
  },
  {
    name: "2010",
    male: 3000,
    female: 1398,
    total: 2210,
  },
  {
    name: "2011",
    male: 2000,
    female: 9800,
    total: 2290,
  },
  {
    name: "2012",
    male: 2780,
    female: 3908,
    total: 2000,
  },
  {
    name: "2013",
    male: 1890,
    female: 4800,
    total: 2181,
  },
  {
    name: "2014",
    male: 2390,
    female: 3800,
    total: 2500,
  },
  {
    name: "2015",
    male: 3490,
    female: 4300,
    total: 2100,
  },
];

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Withdrawl Rate</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="chart">
        <ResponsiveContainer width={"100%"} height={250}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            backgroundColor={"#fff"}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="female" stackId="a" fill="#673ab7" />
            <Bar dataKey="total" stackId="a" fill="#1E88E5" />
            <Bar dataKey="male" stackId="a" fill="#EDE7F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bottom">
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Student</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">10%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">1000</div>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Male Student</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">7%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">700</div>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Male Student</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">7%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">700</div>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Male Student</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">7%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">700</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
