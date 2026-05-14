import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import './completed.css';

import upcoming from '../../../assest/Headers/complete.jpeg';
const apiurl = (() => {
  const raw = (process.env.REACT_APP_API_URL || '').trim();
  if (!raw) return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
})();
const Completed = () => {
  const [completedproject,setCompletedProject] = useState([]);

  const fetchInfo = async ()=>{
    await fetch(`${apiurl}api/v1/completedproject`)
    .then((res)=>res.json())
    .then((data)=>{setCompletedProject(data)});
  }

  useEffect( ()=>{
    fetchInfo();
  },[])
  return (
    <section className="projects-section">
        {/* Project Image and Pricing */}
      {/* Header with Two Background Images and Text in Between */}
      <div style={{
  backgroundImage: `url(${upcoming})`,
  height: '400px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: '#fff',
  textAlign: 'center',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}}>
  {/* Split heading into individual letters for staggered animation */}
  <h2 className='heading'>
    {
      // Splitting the text "Ongoing Projects" into individual characters
      "Completed Projects".split('').map((char, index) => (
        <span key={index} style={{
          display: 'inline-block',
          opacity: 0,
          transform: 'translateX(-40px)',
          animation: `letterIn 0.5s ease-out forwards`,
          animationDelay: `${index * 0.3}s`, // Delay each letter by 0.1s
        }}>
          {char === ' ' ? '\u00A0' : char} {/* Handle spaces */}
        </span>
      ))
    }
  </h2>
  
  <style>
    {`
     .heading {
    font-size: 5rem;
    color: #fff;
    position: relative;
    padding: 10px 20px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    display: inline-block;
    overflow:hidden;
    }
      @keyframes borderMove {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
      
      @keyframes letterIn {
        0% {
          opacity: 0;
          transform: translateX(-20px); // Start off to the left
        }
        100% {
          opacity: 1;
          transform: translateX(0); // Slide in to original position
        }
      }

      /* Responsive styles */
  @media (max-width: 768px) {
    .heading {
      font-size: 2.2rem; /* Adjust font size for tablet view */
    }
  }

  @media (max-width: 480px) {
    .heading {
      font-size: 1.8rem; /* Adjust font size for mobile view*/
}
}
    `}
  </style>
</div>

{/* CSS for Animation */}
<style>
{`
  @keyframes borderMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`}
</style>

    <Container className="my-5">
      <Row>
      {completedproject.map((product,index)=>(
          <Col lg={3} md={4} sm={6} xs={12} className="mb-4" key={index}>
            <div className="card-3d">
              <Card className="border-0">
                <div className="image-container">
                <Card.Img  src={product.image} alt={`House ${index + 1}`} className="img-fluid image" />
                  {/* <div className="logo-overlay">
                    <img src="logo.png" alt="Logo" style={{ height: '40px' }} />
                  </div> */}
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container> </section>
  );
};

export default Completed;
