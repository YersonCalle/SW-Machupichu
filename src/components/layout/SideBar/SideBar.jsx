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
                  <i class="fas fa-clipboard-list"></i>
    )
  },
  {//modificacion
    id: "mesas",
    label: "Mesas",
    icon: (
                 <i class="fas fa-chair"></i>
    ),
  },
  {
    id: "productos",
    label: "Productos",
    icon: (
                  <i class="fas fa-utensils"></i>
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
                  <i class="fas fa-users"></i>
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
