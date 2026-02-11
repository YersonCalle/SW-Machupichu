import React from "react";
import Sidebar from "../../ui/SideBar/SideBar";
import "../../App.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout" style={styles.container}>
      <Sidebar rol="admin" />
      <main style={styles.content}>
        {children}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: "48px",
    overflowY: "auto",
  },
};

export default AdminLayout;


