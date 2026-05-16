import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col, Container, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './contact.css';
import bg from '../../assest/call.png';
import { IoIosMail,IoMdCall } from "react-icons/io";
import { IoLocation } from "react-icons/io5";

const ContactPage = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useRef(); // Form reference

  const handleSubmit = (event) => {
    event.preventDefault();
    const formCurrent = form.current;

    if (formCurrent.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const formData = new FormData(formCurrent);
    const name = formData.get('from_name');
    const email = formData.get('from_email');
    const message = formData.get('message');

    const whatsappMessage = `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/918220158988?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    formCurrent.reset();
    setValidated(false);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Find us on Google Maps!
    </Tooltip>
  );

  return (
    
    <div className='contact ' style={{ marginBottom:'150px'}}>
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
       
        
      }}
    >
      <div className="contact-section glass-effect " style={{ padding: '50px 0' }}>
        <Container  className='my-3'>
          <Row >
            <Col md={6}>
              <div className="contact-info">
                <div className="contact-item">
                  <h3><IoMdCall  size={35} color="#FF6600" /> CALL US</h3>
                  <p>99402 01853 / 89390 54111</p>
                </div>
                <div className="contact-item">
                  <h3>
                    <IoIosMail size={35} color="#FF6600" /> Email id
                  </h3>
                  <p>praveenpropertydevelopers123@gmail.com</p>
                </div>
                <div className="contact-item">
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                    <h3><IoLocation size={35} color="#FF6600" /> LOCATION</h3>
                  </OverlayTrigger>
                  <h5>Head Office</h5>
                  <p >
                  Old No.195, New No.219,GST Road, Chrompet, <br /> Chennai-600044.
                  </p>
                  <h5>Branch Office</h5>
                  <p>No. 23A/5, First Floor, Railway Station Road, <br /> Tambaram Sanatorium,
                  Chennai-600047.</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <h2>
               <span style={{ color: '#FF6600' }}> Contact Us</span>
              </h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit} ref={form}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="from_name" // This matches the placeholder in EmailJS
                    placeholder="Write your name"
                    className="form-control-custom"
                  />
                  <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="from_email" // This matches the placeholder in EmailJS
                    placeholder="sample@gmail.com"
                    className="form-control-custom"
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="message" // This matches the placeholder in EmailJS
                    placeholder="Write here..."
                    className="form-control-custom"
                  />
                  <Form.Control.Feedback type="invalid">Please write a message.</Form.Control.Feedback>
                </Form.Group>

                <Button variant="warning" type="submit" className="btn-custom" disabled={loading}>
                  {loading ? 'Sending...' : 'Send'}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="contact-map " style={{ marginTop: '5px', border: '10px solid #ff6600' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3730443619324!2d80.13500097507603!3d12.947964587365254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fac26b1f4dd%3A0x1be870075efa5202!2s219%2C%20Grand%20Southern%20Trunk%20Rd%2C%20Chromepet%2C%20Chennai%2C%20Tamil%20Nadu%20600044!5e0!3m2!1sen!2sin!4v1731476656692!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
          style={{
            border: 0,
            width: '100%',
            height: '400px',
            borderRadius: '10px',
            transition: 'all 0.3s ease-in-out',
          }}
        ></iframe>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
