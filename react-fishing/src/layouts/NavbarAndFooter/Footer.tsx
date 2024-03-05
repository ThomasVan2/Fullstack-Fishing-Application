import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="navbar-color">
      <footer
        className="container d-flex flex-wrap 
            justify-content-between align items-center py-5 navbar-color"
      >
        <p className="col-md-4 mb-0 text-black">©Catch 'Em All, Inc</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to="/home" className="nav-link px-2 text-black">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link px-2 text-black">
              Search Fish
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-black">
              Services/Help
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
