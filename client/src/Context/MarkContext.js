import { createContext, useState } from "react";
import axios from "axios";

const MarkContext = createContext();

function MarkProvider({ children }) {
  const [mark, setMark] = useState([]);

  //  function  used to fetch data from database
  const fetchMarks = async () => {
    const response = await axios.get("/mark");
    setMark(response.data);
  };

  // shared operation between components
  const markOperation = {
    mark,
    fetchMarks,
  };

  return (
    <MarkContext.Provider value={markOperation}>
      {children}
    </MarkContext.Provider>
  );
}

export { MarkProvider };
export default MarkContext;
