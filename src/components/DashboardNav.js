import { Link } from "react-router-dom";

const DashboardNav = () => {
  const active = window.location.pathname;
  //   console.log(active);
  return (
    <ul className="nav nav-tabs">

      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard/seller" && "active"}`}
          to="/dashboard/seller"
        >
          Your Products
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
