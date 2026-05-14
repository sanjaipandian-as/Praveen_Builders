// Projects.js
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import upcoming from '../../../assest/Headers/upcoming.jpeg';
const apiurl = (() => {
  const raw = (process.env.REACT_APP_API_URL || '').trim();
  if (!raw) return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
})();
const ProjectCard = ({ id, name, city, price,  land, imageUrl, isVisible, index }) => {


  return (
    <div
      className={`project-card ${isVisible ? 'visible' : ''}`}
      style={{
        transitionDelay: `${index * 350}ms`,
        transform: isVisible
          ? 'translateX(0)'
          : index % 2 === 0
          ? 'translateX(-100px)'
          : 'translateX(100px)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <img src={imageUrl} alt={name} className="project-image" />
      <div className="overlay">
        <Link to={`/product/${id}`} className="view-more-button" style={{ textDecoration: 'none' }} >
            View More
        </Link>
      </div>
      <div className="project-info">
        <h3 className="project-title">{name}</h3>
        <p className="project-location">{city}</p>
        <div className="project-footer">
          <span className="project-price"></span>
          <a href="#contact" className="project-link"></a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [UpcomingProjects, setUpcomingProjects] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${apiurl}api/v1/upcomingproject`);
      if (!response.ok) throw new Error('Failed to fetch project data');
      const data = await response.json();
      setUpcomingProjects(data || []);
      setVisibleCards(new Array(data.length).fill(false));
    } catch (error) {
      console.error('Error fetching project data:', error.message);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisibleCards((prev) => {
            const newVisibleCards = [...prev];
            newVisibleCards[index] = true;
            return newVisibleCards;
          });
          observer.unobserve(entry.target);
        }
      });
    });

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [UpcomingProjects]);

  return (
    <section className="projects-section">
      <div>  

    
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
}
}>
  {/* Split heading into individual letters for staggered animation */}
  <h2 className='heading'>
    {
      // Splitting the text "Ongoing Projects" into individual characters
      "Upcoming Projects".split('').map((char, index) => (
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

      @media (max-width: 800px){
   .heading {
    font-size: 4rem;
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
}

  @media (max-width: 500px){
   .heading {
    font-size: 2rem;
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
}
        @media (max-width: 400px){
   .heading {
    font-size: 1.5rem;
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
}
            @media (max-width: 330px){
   .heading {
    font-size: 1rem;
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
}

    `}
  </style>
</div>
</div>
      <br /> 

      <div className="projects-grid">
        {UpcomingProjects.map((product, index) => (
          <div key={index} ref={(el) => (cardsRef.current[index] = el)} data-index={index}>
            <ProjectCard
              name={product.name}
              location={product.location}
              city={product.city}
              price={product.start_price}
              land={product.land}
              imageUrl={product.image}
              route={product.route}
              id={product._id}
              isVisible={visibleCards[index]}
              index={index}
            />
          </div>
        ))}
      </div>
      <style>{`
        .projects-section {
          padding: 40px 20px;
          text-align: center;
        }
        .section-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #322153;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .project-card {
          position: relative;
          background-color: #fff;
          border: 2px solid #ff6600;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateX(-100%);
          opacity: 0;
          transition: transform 0.8s ease, opacity 0.5s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .project-card.visible {
          transform: translateX(0);
          opacity: 1;
        }
        .project-card:hover {
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }
        .project-card:hover .overlay {
          opacity: 1;
          visibility: visible;
        }
        .project-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease;
        }
        .view-more-button {
          padding: 10px 20px;
          background-color: #ff6600;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .view-more-button:hover {
          color: #fff;
          background-color: #e55a00;
        }
        .project-info {
          padding: 15px;
          position: relative;
        }
        .project-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #322153;
        }
        .project-location {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        .project-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .project-price {
          font-size: 16px;
          font-weight: bold;
          color: #e85a00;
        }
        .project-link {
          font-size: 12px;
          color: #0066cc;
          text-decoration: underline;
          transition: color 0.3s ease;
        }
        .project-link:hover {
          color: #004080;
        }

        @media (max-width: 991px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 576px) {
          .projects-grid {
            grid-template-columns: repeat(1, 1fr);
          }
          .project-image {
            height: 150px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
