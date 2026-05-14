import React from 'react';
import Urapakam from '../assest/Location/Urapakam.png';
import Perungalathur from '../assest/Location/Perungalathur.png';
import Guduvancheri from '../assest/Location/Guduvancheri.png';
import Tambaram from '../assest/Location/Tambaram.png';

const locationData = [
  { 
    name: 'Guduvancheri', 
    image: Guduvancheri,
    amenities: [
      'Zion International Public School',
      'SSM School',
      'Alwin Memorial Public School',
      'GKM School',
      'Madras Christian College',
      'GKM College of Engineering',
      'Annai Veilankanni\'s College',
      'Bhaaarath University',
      'Kasthuri Hospital',
      'Deepam Hospital',
      'Hindu Mission Hospital',
      'Kathir Memorial Hospital'
    ]
  },
  { 
    name: 'East Tambaram', 
    image: Tambaram,
    amenities: [
      'Zion International Public School',
      'SSM School',
      'Alwin Memorial Public School',
      'GKM School',
      'Madras Christian College',
      'GKM College of Engineering',
      'Annai Veilankanni\'s College',
      'Bhaaarath University',
      'Kasthuri Hospital',
      'Deepam Hospital',
      'Hindu Mission Hospital',
      'Kathir Memorial Hospital'
    ]
  },
  { 
    name: 'Urapakam', 
    image: Urapakam,
    amenities: [
      'Zion International Public School',
      'SSM School',
      'Alwin Memorial Public School',
      'GKM School',
      'Madras Christian College',
      'GKM College of Engineering',
      'Annai Veilankanni\'s College',
      'Bhaaarath University',
      'Kasthuri Hospital',
      'Deepam Hospital',
      'Hindu Mission Hospital',
      'Kathir Memorial Hospital'
    ]
  },
  { 
    name: 'Perungalathur', 
    image: Perungalathur,
    amenities: [
      'Zion International Public School',
      'SSM School',
      'Alwin Memorial Public School',
      'GKM School',
      'Madras Christian College',
      'GKM College of Engineering',
      'Annai Veilankanni\'s College',
      'Bhaaarath University',
      'Kasthuri Hospital',
      'Deepam Hospital',
      'Hindu Mission Hospital',
      'Kathir Memorial Hospital'
    ]
  },

];

const LocationCard = ({ name, image, amenities }) => {
  return (
    <div className="location-card">
      <div className="location-card-inner">
        <div className="location-card-front">
          <img src={image} alt={`${name} location`} className="location-image" />
          <h3 className="location-name">{name}</h3>
        </div>
        <div className="location-card-back">
          <h3 className="back-title">{name}</h3>
          <h4 className="back-subtitle">Amenities</h4>
          <ul className="back-amenities">
            {amenities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
.location-card {
    perspective: 1000px;
    cursor: pointer;
    width: 100%;
    height: 50vh;
    max-width: 350px;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.6s ease-out;
}
        .location-card:hover {
          transform: scale(1.05); /* Slight scaling on hover for 3D pop effect */
        }
        .location-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 1s;
          transform-style: preserve-3d;
          border-radius:50%;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
        }
        .location-card:hover .location-card-inner {
          transform: rotateY(180deg);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* Larger shadow on hover */
        }
        .location-card-front,
        .location-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Basic shadow for both sides */
        }
        .location-card-front {
          background-color: #fff;
          border: 1px solid #000;
        }
        .location-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
       .location-name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Averia Serif Libre', serif;
    text-transform: uppercase;
    letter-spacing: 4.5px;
    transition: top 0.6s ease-out;

    /* 3D text effect */
    text-shadow: 
        1px 1px 0px #000,
        2px 2px 0px #000,
        3px 3px 0px #000,
        4px 4px 0px #000,
        5px 5px 10px rgba(0, 0, 0, 0.5);
}

        .location-card:hover .location-name {
          top: 20px;
        }
        .location-card-back {
          background:#ff6600;
          background-size: cover;
          background-position: center;
          background-blend-mode: overlay;
          color: #ffff;
          padding: 20px;
          transform: rotateY(180deg);
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .back-title {
          font-size: 24px;
          font-weight: 800;
          font-family: 'Averia Serif Libre', serif;
          color: #3F070E;
           text-shadow: 5px 5px 15px #3F070E;
        
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .back-subtitle {
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: underline;
          margin-bottom: 10px;
        }
        .back-amenities {
          list-style: none;
          padding-left: 0;
          text-align: left;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Arial', sans-serif;
          color: #000;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          padding: 10px;
          max-height: 200px;
          overflow-y: auto;
        }
        .back-amenities li {
          margin-bottom: 8px;
        }
        .back-amenities li:before {
          content: '•';
          color: #000;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .location-card {
            max-width: 300px;
            height: 40vh;
          }
          .back-title {
            font-size: 20px;
          }
          .back-subtitle {
            font-size: 18px;
          }
          .back-amenities {
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .location-card {
            max-width: 280px;
            height: 35vh;
          }
          .back-title {
            font-size: 18px;
          }
          .back-subtitle {
            font-size: 16px;
          }
          .back-amenities {
            font-size: 12px;
          }
                .location-name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Averia Serif Libre', serif;
    text-transform: uppercase;
    letter-spacing: 4.5px;
    transition: top 0.6s ease-out;
        }

        @media (max-width: 576px) {
          .location-card {
            max-width: 250px;
            height: 30vh;
          }
          .back-title {
            font-size: 16px;
          }
          .back-subtitle {
            font-size: 14px;
          }
          .back-amenities {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

const Locations = () => {
  return (
    <section className="locations">
      <h2 className="section-title">We are available in many<br />locations in South Chennai</h2>
      <div className="location-grid">
        {locationData.map((location, index) => (
          <LocationCard key={index} {...location} />
        ))}
      </div>
      <style>{`
        .locations {
          margin-top: 120px;
          text-align: center;
        }
        .section-title {
          color: #110229;
          font-size: 50px;
          font-weight: 700;
          font-family: Arial, sans-serif;
          margin-bottom: 58px;
        }
        .location-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Responsive Grid */
        @media (max-width: 1200px) {
          .location-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 991px) {
          .locations {
            margin-top: 60px;
          }
          .section-title {
            font-size: 40px;
            margin-bottom: 40px;
          }
          .location-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .locations {
            margin-top: 40px;
          }
          .section-title {
            font-size: 30px;
            margin-bottom: 30px;
          }
          .location-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default Locations;
