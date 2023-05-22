import { createContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // shared operation between components
  const valueToShare = {
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={valueToShare}>
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarProvider };
export default SidebarContext;
