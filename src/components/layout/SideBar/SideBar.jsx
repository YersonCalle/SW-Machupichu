import "./SideBar.css"
import { useNavigate } from "react-router-dom"
import logo from '../../../assets/images/logo-machuu.png'


const Sidebar = ({ activeItem = "punto-venta", onItemClick }) => {


  const navigate = useNavigate();

  // Rutas de navegación
  const routes = {
  "ventas": "/point-of-sale",
  "mesas" : "/tables",
  "productos": "/load-products",
  "informes": "/report",
  "usuarios": "/users",
  "impresoras": "/printers",
  };

  const handleItemClick = (itemId) => {
    const path = routes[itemId];
    if (path) {
      navigate(path);
    }
  };

  const navItems = [
  {
    id: "ventas",
    label: "Ventas",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24">
        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
      </svg>
    ),
  },
  {//modificacion
    id: "mesas",
    label: "Mesas",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24">
        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
      </svg>
    ),
  },
  {
    id: "productos",
    label: "Productos",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24">
        <path d="M19 7H16V6A4 4 0 0 0 8 6V7H5A1 1 0 0 0 4 8V19A3 3 0 0 0 7 22H17A3 3 0 0 0 20 19V8A1 1 0 0 0 19 7ZM10 6A2 2 0 0 1 14 6V7H10V6ZM18 19A1 1 0 0 1 17 20H7A1 1 0 0 1 6 19V9H8V10A1 1 0 0 0 10 10A1 1 0 0 0 10 10V9H14V10A1 1 0 0 0 16 10A1 1 0 0 0 16 10V9H18V19Z" />
      </svg>
    ),
  },
  {
    id: "informes",
    label: "Informes",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM13 16H7V14H13V16ZM17 8H7V6H17V8Z" />
      </svg>
    ),
  },
  {
    id: "usuarios",
    label: "Usuarios",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24">
        <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
      </svg>
    ),
  },
  {
    id: "impresoras",
    label: "Impresoras",
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24">
        <path d="M18 3H6V7H18V3ZM19 12C19.55 12 20 11.55 20 11S19.55 10 19 10 18 10.45 18 11 18.45 12 19 12ZM16 19H8V14H16V19ZM19 8H5C3.35 8 2 9.35 2 11V17H6V21H18V17H22V11C22 9.35 20.65 8 19 8Z" />
      </svg>
    ),
  }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="restaurant-name">
          <img src={logo} alt="Logo de machipucchu" />
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.icon}
            <span className="nav-text">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
