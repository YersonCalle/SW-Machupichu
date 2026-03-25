import React, { useState } from "react";
import Sidebar from "../../ui/SideBar/SideBar";
import "../../App.css";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-layout" style={styles.container}>

      <button className="hamburger" onClick={() => setOpen(!open)}>
        {open ? "X" : "☰"}
      </button>

      <Sidebar rol="admin" open={open} setOpen={setOpen} />
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      
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
  padding: window.innerWidth < 768 ? "16px" :"30px",
  overflowY: "auto",
  },
};

export default AdminLayout;


