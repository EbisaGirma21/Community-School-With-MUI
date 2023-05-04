import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Chart.scss";

const data = [
  {
    name: "September",
    male: 4234,
    female: 2323,
    amt: 2500,
  },
  {
    name: "October",
    male: 4300,
    female: 3490,
    amt: 2100,
  },
  {
    name: "November",
    male: 3490,
    female: 4300,
    amt: 2100,
  },
  {
    name: "December",
    male: 3490,
    female: 4300,
    amt: 2100,
  },
  {
    name: "January",
    male: 4000,
    female: 2400,
    amt: 2400,
  },
  {
    name: "February",
    male: 3000,
    female: 1398,
    amt: 2210,
  },
  {
    name: "March",
    male: 2000,
    female: 9800,
    amt: 2290,
  },
  {
    name: "April",
    male: 2780,
    female: 3908,
    amt: 2000,
  },
  {
    name: "May",
    male: 1890,
    female: 4800,
    amt: 2181,
  },
];

const Chart = () => {
  return (
    <div className="chart">
      <div className="title"> {"Total Registration Rate"}</div>
      <div className="chart-list">
        <ResponsiveContainer width={"100%"} height={575}>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            backgroundColor={"#fff"}
          >
            <defs>
              <linearGradient id="colormale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1e88e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorfemale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5e35b1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#5e35b1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="male"
              stroke="#1e88e5"
              fillOpacity={1}
              fill="url(#colormale)"
            />
            <Area
              type="monotone"
              dataKey="female"
              stroke="#5e35b1"
              fillOpacity={1}
              fill="url(#colorfemale)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
