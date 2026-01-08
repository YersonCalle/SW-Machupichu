import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-machuu.png";
import "./SideBar.css";

const Sidebar = ({ rol = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = {
    //rutas de administrador
    dashboard: "/admin",
    tables: "/tables",
    categorias: "/categories",
    productos: "/products",
    empleados: "/users",
    reportes: "/report",
    categorias : "/category",

    //rutas de mesero 
    mesas: "mesas",
  };

  const handleNavigate = (path) => {
    if (path) navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const allNavItems = [
    {
      id: "dashboard",
      label: rol === "admin" ? "Ventas" : "Dashboard",
      path: routes.dashboard,
      roles: ["admin", "mesero"],
      icon: <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
    },
    {
      id: "Table",
      label: "Mesas",
      path: routes.tables,
      roles: ["admin"],
      icon: <svg viewBox="0 0 24 24"><path d="M3 9h18v2H3V9zm2 2h2v10H5V11zm12 0h2v10h-2V11z" /></svg>
    },
    {
      id: "Mesas",
      label: "Mesas",
      path: routes.mesas,
      roles: ["mesero"],
      icon: <svg viewBox="0 0 24 24"><path d="M3 9h18v2H3V9zm2 2h2v10H5V11zm12 0h2v10h-2V11z" /></svg>
    },
    {
      id: "categorias",
      label: "Categorías",
      path: routes.categorias,
      roles: ["admin"],
      icon: <svg viewBox="0 0 24 24"><path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5h5V3zm11 1h-2.58l-2.51 2.51 1.41 1.41L19.83 5.41V8h2V4z"/></svg>
    },
    {
      id: "productos",
      label: "Productos",
      path: routes.productos,
      roles: ["admin"],
      icon: <svg viewBox="0 0 24 24"><path d="M4 3h16v2H4V3zm2 4h12v14H6V7z" /></svg>
    },
    {
      id: "empleados",
      label: "Usuarios",
      path: routes.empleados,
      roles: ["admin"],
      icon: <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
    },
    {
      id: "reportes",
      label: "Reportes",
      path: routes.reportes,
      roles: ["admin"],
      icon: <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
    },
  ];

  const visibleItems = allNavItems.filter((item) => item.roles.includes(rol));

  return (
    <aside className={`sidebar ${rol === "admin" ? "sidebar-admin" : "sidebar-mesero"}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Logo Machu Picchu" id="sidebar-logo" />
      </div>

      <nav className="sidebar-nav">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleNavigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
          </div>
        ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <svg viewBox="0 0 24 24">
          <path d="M10 17l1.4-1.4-2.6-2.6H20v-2H8.8l2.6-2.6L10 7l-5 5 5 5z" />
        </svg>
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
};

export default Sidebar;