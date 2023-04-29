import "./Sidebar.scss";

function Sidebar(props) {
  return (
    <div className={`sidebar ${props.sidebarOpen ? "side-opened" : "closed"}`}>
      {props.children}
    </div>
  );
}

export default Sidebar;
