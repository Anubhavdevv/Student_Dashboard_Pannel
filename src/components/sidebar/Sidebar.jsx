import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const auth = getAuth();
  const navitage = useNavigate()
  const logout = (e) => {
    localStorage.clear();
    navitage("/login")
    signOut(auth).then(() => {
      dispatch({type:"LOGOUT"})
      navitage("/login")
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">LOGO</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Add and Manage Students</span>
            </li>
          </Link>
          <p className="title">LogOut</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
