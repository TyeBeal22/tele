import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FcBinoculars, FcHome,FcKey,FcDataConfiguration, FcLock, FcComments } from "react-icons/fc";
import './Footer.css';
import Search from "../booking/Search";

const TopNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
      <FcHome size='2rem' className="moves" />
     
      </Link>
      <Link className="nav-link" to="/Estimate">
      <FcComments size='2rem' className="moves" />
     
      </Link>

      {auth !== null && (
        <Link className="nav-link" to="/dashboard">
        <FcBinoculars size="2rem" className="moves" />
        </Link>
      )}

      {auth !== null && (
        <a className="nav-link pointer" href="#" onClick={logout}>
          <FcLock size="2rem" className="moves" />
        </a>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to="/login">
          <FcKey size='2rem' className="moves" />
          </Link>
          <Link className="nav-link" to="/register">
            <FcDataConfiguration size="2rem" className="moves" />
          </Link>
        </>
      )}

    </div> 
  );
};

export default TopNav;
