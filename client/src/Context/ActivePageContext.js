import { createContext, useState } from "react";

const ActivePageContext = createContext();

function ActivePageProvider({ children }) {
  const [isActivePage, setIsActivePage] = useState(1);
  const toggleActivePage = (active) => {
    setIsActivePage(active);
  };
  // shared operation between components
  const valueToShare = {
    isActivePage,
    toggleActivePage,
  };

  return (
    <ActivePageContext.Provider value={valueToShare}>
      {children}
    </ActivePageContext.Provider>
  );
}

export { ActivePageProvider };
export default ActivePageContext;
