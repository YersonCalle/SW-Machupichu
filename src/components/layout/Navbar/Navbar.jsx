import {Link, useLocation} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <header>
        <h1>My App</h1>
        <nav>
            <ul>
            <li><Link>Punto de Venta</Link></li>
            </ul>
        </nav>
        </header>
    );
}

export default Navbar;

