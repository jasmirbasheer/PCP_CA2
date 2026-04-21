import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <h2 className="nav-title">Order Desk</h2>
      <NavLink className="nav-link" to="/orders">
        Orders
      </NavLink>
      <NavLink className="nav-link" to="/filter">
        Filter
      </NavLink>
      <NavLink className="nav-link" to="/stats">
        Stats
      </NavLink>
    </nav>
  );
};

export default NavBar;
