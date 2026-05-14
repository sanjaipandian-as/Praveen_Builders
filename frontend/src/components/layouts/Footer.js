import React from 'react';
import { Dropdown, Image, Navbar, Nav, Container } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,FaYoutube,FaTimes } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo">
            <img src="/images/logo.png" alt="Praveen Property Developers Logo" className="footer-logo-image" />
            {/* <span className="footer-company-name">Praveen Property Developers</span> */}
            <div style={{ textAlign: 'center' }}>
              <span className="footer-company-name fw-bold">PRAVEEN PROPERTY DEVELOPERS</span>
              <small className="d-block " style={{ fontSize: '0.85rem',color:'#3F070E' }}> BUILDER & PROMOTERS</small>
            </div>
          </div>
          <p className="footer-description">
            Having solid experience in the real estate market, Praveen Property Developers in Chromepet presents a wide choice of residential, commercial and industrial properties to its clients. We Covered The Most Popular Area In South Chennai Around 15 kms From Tambaram Such As "Perungalathur, Urapakkam, Guduvancheri, <br/> West Tambarm, Etc".
          </p>
          <div className="footer-social">
          <a href="https://www.facebook.com/praveen.property.54" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={30} color="#4267B2" />
      </a>
    
      <a href="https://www.instagram.com/praveenpropertydevelopers/" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={30} color="#C13584" />
      </a>
      <a href="https://www.youtube.com/@praveenpropertydevelopers1828" target="_blank" rel="noopener noreferrer">
  <FaYoutube size={30} color="#FF0000" />
</a>
<a href="https://x.com/PRAVEENPROP111" target="_blank" rel="noopener noreferrer">
  <FaXTwitter  size={30} color="#000" />
</a>
<a href="https://www.linkedin.com/in/praveen-property-developers-a27183182/" target="_blank" rel="noopener noreferrer">
  <FaLinkedin size={30} color="#0A66C2" />
</a>
      
          </div>
          <p className="footer-copyright">© 2024 . All rights reserved.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3 className="footer-column-title">Location</h3>
            <ul className="footer-list">
              <h5 className='footer-head'>Head Office </h5>
              <li className='lli' >Old No.195, New No.219,GST Road,<br/> Chrompet,  Chennai - 600044.</li>
              <h5 className='footer-head'>Branch Office</h5>
              <li className='lli' >No. 23A/5, First Floor, Railway Station <br/>Road,
              Tambaram Sanatorium,<br/> Chennai - 600047.</li>

              <li className='lli' ><a href="mailto:praveenpropertydevelopers123@gmail.com">praveenpropertydevelopers123 <br/> @gmail.com</a></li>
              {/* <li className='lli' ><a href="/con">Support</a></li> */}
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-column-title">Our Company</h3>
            <ul className="footer-list">
              <li><Nav.Link href="/" className="nav-link mx-2">Home</Nav.Link></li>
              <li><Nav.Link href="/about" className="nav-link mx-2">About Us</Nav.Link></li>
              <li><Nav.Link href="/Ongoingprojects" className="nav-link mx-2">Properties</Nav.Link></li>
              <li><Nav.Link href="/ContactPage" className="nav-link mx-2">Contact Us</Nav.Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-column-title">Contact Us</h3>
            <p className="footer-contact-text">Contact us to get latest property news from us</p>
            <form className="footer-form">
              <label htmlFor="emailInput" className="visually-hidden">Email Address</label>
              <input type="email" id="emailInput" placeholder="Email Address" className="footer-input" />
              <button type="submit" className="footer-submit" aria-label="Subscribe">
                <div className="footer-submit-icon"></div>
              </button> 
              
            </form>
          </div>
        </div>
      </div>
      <style>{`
        .footer {
          background-color: #fff;
          padding: 80px 0;
          margin-top: 82px;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-main {
          max-width: 400px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
        }
        .footer-logo-image {
          width: 70px;
          height: 70px;
        }
        .footer-company-name {
          color: #ff6600;
          font-size: 18px;
          font-weight: 600;
          font-family: 'Inknut Antiqua', sans-serif;
        }
        .footer-description {
          color: #8f90a6;
          font-size: 14px;
          line-height: 27px;
          margin-bottom: 20px;
        }
        .footer-social {
          display: flex;
          gap: 25px;
          margin-bottom: 35px;
        }
        .social-icon {
          width: 22px;
          height: 22px;
        }
        .footer-copyright {
          color: #8f90a6;
          font-size: 13px;
        }
        .footer-links {
          display: flex;
          gap: 60px;
        }
        .footer-column-title {
          color: #110229;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        .footer-list {
          list-style: none;
          padding: 0;
        }
        .footer-list li {
          margin-bottom: 15px;
        }
        .footer-list a {
          color: #110229;
          font-size: 16px;
          text-decoration: none;
        }
        .footer-contact-text {
          color: #8f90a6;
          font-size: 12px;
          line-height: 23px;
          margin-bottom: 22px;
        }
        .footer-form {
          display: flex;
          border-radius: 15px;
          border: 2px solid #d0d0e3;
          overflow: hidden;
        }
        .footer-input {
          flex-grow: 1;
          border: none;
          padding: 10px 14px;
          font-size: 14px;
        }
        .footer-submit {
          background-color: #ff6600;
          border: none;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .footer-submit-icon {
          width: 20px;
          height: 20px;
          background-color: #fff;
          clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
          .footer-head{
          color:#FF6600}
         .footer-list>.lli>a{
         font-size:14px}
            .footer-list>.lli{
         font-size:14px;
         color: #000}
        @media (max-width: 991px) {
          .footer-content {
            flex-direction: column;
            padding: 0 20px;
          }
          .footer-main {
            max-width: 100%;
            margin-bottom: 40px;
          }
          .footer-links {
            flex-direction: column;
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
