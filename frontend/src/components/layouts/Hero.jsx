import React, { useState,useEffect } from 'react';

const Hero = () => {
  
  const words = ["find a perfect property", "sell your dream house", "rent amazing homes"];
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100; // Typing speed in milliseconds
  const deletingSpeed = 60; // Speed for erasing letters
  const pauseDuration = 1500; // Pause duration before erasing or typing next word

  useEffect(() => {
    let typingInterval;

    if (!isDeleting && letterIndex < words[currentWordIndex].length) {
      // Typing out the word
      typingInterval = setTimeout(() => {
        setDisplayedText((prev) => prev + words[currentWordIndex][letterIndex]);
        setLetterIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);
    } else if (!isDeleting && letterIndex === words[currentWordIndex].length) {
      // Pause before starting to erase
      setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && letterIndex > 0) {
      // Erasing letters in a "wave" effect
      typingInterval = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setLetterIndex((prevIndex) => prevIndex - 1);
      }, deletingSpeed);
    } else if (isDeleting && letterIndex === 0) {
      // Move to the next word
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    return () => clearTimeout(typingInterval);
  }, [letterIndex, isDeleting, currentWordIndex, words]);


  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get('city');
    const propertyType = formData.get('propertyType');
    const priceRange = formData.get('priceRange');

    const whatsappMessage = `Hero Form Inquiry:\nCity: ${city || 'Not specified'}\nProperty Type: ${propertyType || 'Not specified'}\nPrice Range: ${priceRange || 'Not specified'}`;
    const whatsappUrl = `https://wa.me/919884961853?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    e.target.reset(); // Optional: reset the form after submission
  };

 

  return (
    <section className="hero">
      
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a71124a398fad2cf676026ec1ff8adef5a5f2baa994fda21d852c7bcfc46d16?placeholderIfAbsent=true&apiKey=a1321863ba4e4bd8808d5b93faba38b9" 
        alt="Property background" 
        className="hero-background" 
      />
      <div className="hero-content">
        <h1 className="hero-title">Easy way to <br /> <span className="changing-words">{displayedText}</span></h1>
        <p className="hero-description">We provide a complete service for the sale,<br />purchase or rental of real estate.</p>
     
        <form className="search-form" onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="city" className="visually-hidden">Select Your City</label>
            <select id="city" name="city" className="form-select">
              <option value="">Select Your City</option>
              <option value="Guduvancheri">Guduvancheri</option>
              <option value="East Tambaram">East Tambaram</option>
              <option value="Urapakam">Urapakam</option>
              <option value="Perungalathur">Perungalathur</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="propertyType" className="visually-hidden">Choose Property Type</label>
            <select id="propertyType" name="propertyType" className="form-select">
              <option value="">Choose Property Type</option>
              <option value="Residential Land">Residential Land</option>
              <option value="Commercial Land">Commercial Land</option>
              <option value="Investment Land">Investment Land</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priceRange" className="visually-hidden">Choose Price Range</label>
            <select id="priceRange" name="priceRange" className="form-select">
              <option value="">Choose Price Range</option>
              <option value="1,00,000 to 10,00,000">1,00,000 to 10,00,000</option>
              <option value="10,00,000 to 40,00,000">10,00,000 to 40,00,000</option>
              <option value="40,00,000 to 60,00,000">40,00,000 to 60,00,000</option>
              <option value="60,00,000 to 80,00,000">60,00,000 to 80,00,000</option>
              <option value="80,00,000 to 1cr"> 80,00,000 to 1cr</option>
            </select>
          </div>
          <button type="submit" className="search-button" style={{ color: 'white', backgroundColor: 'orange',padding: '10px', borderRadius: '15px' }}>
            Submit
          </button>
        </form>

      </div>
      <style>{`

       
        .changing-words {
          display: inline-block;
          color: #ff6600;
          font-weight: bold;
          position: relative;
          animation: colorShift 4s ease infinite;
        }

        /* Text color change effect */
        @keyframes colorShift {
          0%, 100% { color: #ff6600; }
          50% { color: #110229; }
        }

        .hero {
          position: relative;
          border-radius: 50px;
          min-height: 634px;
          margin-top: 33px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px; /* Base padding for smaller screens */
          overflow: hidden;
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: zoomIn 20s infinite alternate;
        }

        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center; /* Centered text for better responsiveness */
          width: 100%;
          max-width: 800px; /* Limit the width for better readability */
        }

        .hero-title {
          color: #110229;
          font-size: 2.5rem; /* Base size for responsiveness */
          font-weight: 700;
          margin-bottom: 20px;
         
          animation: slideInLeft 1s ease-out;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .hero-description {
          color: #58598a;
          font-size: 1.125rem; /* Base size for responsiveness */
          line-height: 2rem; /* Base line-height */
          margin-bottom: 30px;
         
          animation: slideInRight 1s ease-out;
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      
        .search-form {
          display: flex;
          flex-wrap: wrap; /* Allow items to wrap on smaller screens */
          gap: 10px; /* Reduced gap for better spacing */
          background-color: #370412;
          border-radius: 20px;
          padding: 25px; /* Padding adjusted for mobile */
          width: 100%; /* Make form full width */
          max-width: 800px; /* Limit the width for better usability */
          margin: 0 auto; /* Center the form */
        }

        .form-group {
          flex: 1 1 150px; /* Allow flexibility with a base size */
          min-width: 120px; /* Minimum width for better usability */
        }

        .form-select {
          width: 100%;
          padding: 10px;
          border: none;
          background-color: transparent;
          color: #ff6600;
          font-size: 14px; /* Adjusted for better readability */
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-select:hover, .form-select:focus {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .search-button {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .search-button:hover {
          transform: scale(1.1);
        }

        .search-icon {
          width: 36px; /* Adjusted size for better responsiveness */
          height: 36px;
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
@media (max-width: 576px){
  .form-group {
          flex: 1 1 150px; /* Allow flexibility with a base size */
          min-width: 120px; /* Minimum width for better usability */
           padding: 35px 0px;
        }
}
        /* Responsive Styles */
        @media (min-width: 576px) {
          .hero-title {
            font-size: 2.75rem; /* Increase title size for small devices */
             margin-left:0px;
          }
          .hero-description {
            font-size: 1.25rem; /* Increase description size for small devices */
          }
                .hero-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          
          animation: zoomIn 20s infinite alternate;
        }
          @keyframes zoomIn {
          from { transform: scale(1.2); }
          to { transform: scale(1.3);}
          }
        }

        @media (min-width: 768px) {
          .hero {
            padding: 80px 20px; /* Adjust padding for larger devices */
          }
          .hero-title {
            font-size: 3rem; /* Larger title size for medium devices */
          margin-left:0px;
            }
        }

        @media (min-width: 992px) {
          .hero {
            padding: 100px 40px; /* Larger padding for desktop */
          }
          .hero-title {
            font-size: 3.5rem; /* Largest title size for large devices */
             margin-left:-520px;
            }
          .hero-description {
            font-size: 1.375rem; /* Maintain larger description size for large devices */
            margin-left:-510px !important;
            
            }
            .search-form{
            margin-left:-130px !important;
            }
        }
      `}</style>
    </section>
  );
};

export default Hero;
