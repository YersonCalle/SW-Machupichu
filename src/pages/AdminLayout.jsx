import React from "react";
import Sidebar from "../components/layout/SideBar/SideBar";
import "../App.css"; // Asegurate de que los estilos globales estén disponibles

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
    width: "250px", // ajustalo al ancho real de tu sidebar
    backgroundColor: "#f8f9fa",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
};

export default AdminLayout;

