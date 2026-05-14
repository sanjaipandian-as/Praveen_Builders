import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image, Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
// import logo from '../../../public/images/logo.png'

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    dispatch(logout);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  return (
    <nav>
      <Navbar bg="light" expand="lg" className="py-2">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src= "/images/logo.png" 
              alt="Praveen Property Developers"
              style={{ height: '60px', marginRight: '10px' }}
              className="me-2 logo"
            />
             <div style={{ textAlign: 'center' }}>
              <span className="company-name fw-bold">PRAVEEN PROPERTY DEVELOPERS</span>
              <small className="d-block text-muted slogen" style={{  }}> BUILDER & PROMOTERS</small>
            </div>
           

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-navbar-toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center navbars">
              <Nav.Link href="/" className="nav-link mx-2">Home</Nav.Link>
              <Nav.Link href="/about" className="nav-link mx-2 ">About Us</Nav.Link>

              {/* Dropdown with hover */}
              <Dropdown
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                show={showDropdown}
                className="mx-2"
              >
                <Dropdown.Toggle variant="link" className="nav-link dropdown-toggle-icon-adjust" style={{paddingRight:'2rem', position:'relative'}} >
                  Properties
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/Ongoingprojects">Ongoing Project</Dropdown.Item>
                  <Dropdown.Item href="/completed">Completed Project</Dropdown.Item>
                  <Dropdown.Item href="/Upcoming">Upcoming Project</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link href="/ContactPage" className="nav-link ">Contact Us</Nav.Link>

              <div className="d-flex align-items-center mt-2 mt-lg-0 mb-2 mb-lg-0">
                {isAuthenticated ? (
                  <Dropdown className="d-inline">
                    <Dropdown.Toggle variant="default text-black" className="d-flex align-items-center" style={{ border: 'none', background: 'transparent' }}>
                      <figure className="avatar avatar-nav me-2 mb-0">
                        <Image width="40px" src={user.avatar ?? '/images/default_avatar.png'} roundedCircle />
                      </figure>
                      <span>{user.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="text-center text-lg-start">
                      {user.role === 'admin' && (
                        <Dropdown.Item onClick={() => navigate('/admin/listproduct')} className="text-dark">
                          Dashboard
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item onClick={() => navigate('/myprofile')} className="text-dark">
                        Profile
                      </Dropdown.Item>
                      
                      <Dropdown.Item onClick={logoutHandler} className="text-danger">
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to="/login" className="btn " id="login_btn">
                    Login
                  </Link>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}
