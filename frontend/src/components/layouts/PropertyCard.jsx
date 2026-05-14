import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const apiurl = (() => {
  const raw = (process.env.REACT_APP_API_URL || '').trim();
  if (!raw) return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
})();

const ProjectCard = ({ id, name, city, price, land, imageUrl, isVisible, index }) => {
  return (
    <div
      className={`project-card ${isVisible ? 'visible' : ''}`}
      style={{
        transitionDelay: `${index * 200}ms`,
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
        <Link to={`/product/${id}`} className="view-more-button">
          View More
        </Link>
      </div>
      <div className="project-info">
        <h3 className="project-title">{name}</h3>
        <p className="project-location">{city}</p>
        <div className="project-footer">
          <span className="project-price">₹{price}</span>
          <a href="#contact" className="project-link">{land}</a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiurl}api/v1/recentlyadded`);
      if (!response.ok) throw new Error('Failed to fetch project data');
      const data = await response.json();
      setProjects(data || []);
      setVisibleCards(new Array(data.length).fill(false));
    } catch (error) {
      console.error('Error fetching project data:', error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // Only set up observer if we have projects
    if (projects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => {
              if (prev[index]) return prev; // Skip if already visible
              const newVisibleCards = [...prev];
              newVisibleCards[index] = true;
              return newVisibleCards;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Reset refs array to match current number of projects
    cardsRef.current = cardsRef.current.slice(0, projects.length);
    
    // Observe all card elements
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [projects]);

  return (
    <section className="projects-section">
      <h2 className="section-title">Recently Added Projects</h2>

      <div className="projects-grid">
        {projects.map((product, index) => (
          <div 
            key={product._id || index} 
            ref={(el) => (cardsRef.current[index] = el)} 
            data-index={index}
          >
            <ProjectCard
              name={product.name}
              city={product.city}
              price={product.start_price}
              land={product.land}
              imageUrl={product.image}
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
          margin-bottom: 30px;
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
          transition: transform 0.5s ease, opacity 0.4s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .project-card.visible {
          transform: translateX(0);
          opacity: 1;
        }
        .project-card:hover {
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
          transform: scale(1.03);
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
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          text-decoration: none;
          display: inline-block;
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
            height: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
