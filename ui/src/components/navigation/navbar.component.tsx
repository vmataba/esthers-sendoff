import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/auth.service';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    // Redirect to home after logout
    navigate('/');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Esther's Sendoff</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/pledges">Pledges</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/invitation-cards">Invitation Cards</Link>
            </li>
          </ul>
          <div className="d-flex">
            {isAuthenticated() ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="btn btn-outline-primary" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
