import React from "react";
import Sidebar from "../components/layout/SideBar/SideBar";
import "../App.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout" style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#f8f9fa91",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  content: {
    flex: 1,
  
    overflowY: "auto",
  },
};

export default AdminLayout;

