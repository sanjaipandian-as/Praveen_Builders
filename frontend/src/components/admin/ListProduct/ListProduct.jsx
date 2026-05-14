import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import { MdDeleteForever } from "react-icons/md";
import Sidebar from '../Sidebar/Sidebar';
import { MdOutlineCloudUpload } from "react-icons/md";
const apiurl = (() => {
  const raw = (process.env.REACT_APP_API_URL || '').trim();
  if (!raw) return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
})();

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [productDetails, setProductDetails] = useState(null); // State to hold the product being edited
  const [image, setImage] = useState(null); // For storing the uploaded image
  const [image1, setImage1] = useState(null);// Single image file
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [schoolimage, setschoolimage] = useState(null);
  const [collegeimage, setcollegeimage] = useState(null);
  const [hospitalimage, sethospitalimage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  // Add states to track currently displayed images
  const [currentImages, setCurrentImages] = useState({
    image: '',
    image1: '',
    image2: '',
    image3: '',
    schoolimage: '',
    collegeimage: '',
    hospitalimage: '',
    pdf: ''
  });

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${apiurl}api/v1/allproducts`);
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching the products.");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (_id) => {
    if (!_id) {
      alert("Product ID is required!");
      return;
    }

    try {
      const response = await fetch(`${apiurl}api/v1/removeproduct`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: _id }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Product removed successfully!");
          fetchInfo(); // Refresh the product list after removal
        } else {
          alert("Failed to remove product: " + data.message);
        }
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      alert("An error occurred while removing the product.");
    }
  };

  const handleEditClick = (product) => {
    setProductDetails(product); // Set the product details to be edited
    
    // Reset all image states
    setImage(null);
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setschoolimage(null);
    setcollegeimage(null);
    sethospitalimage(null);
    setPdf(null);
    
    // Set current image URLs for display/preview
    setCurrentImages({
      image: product.image || '',
      image1: product.image1 || '',
      image2: product.image2 || '',
      image3: product.image3 || '',
      schoolimage: product.schoolimage || '',
      collegeimage: product.collegeimage || '',
      hospitalimage: product.hospitalimage || '',
      pdf: product.pdf || ''
    });
    
    setIsModalOpen(true); // Open the modal
  };

  //image Change handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Update image state with selected file
    }
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage1(file);
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage2(file);
    }
  };

  const handleImageChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage3(file);
    }
  };

  const handleImageChangeschool = (e) => {
    const file = e.target.files[0];
    if (file) {
      setschoolimage(file);
    }
  };
  
  const handleImageChangecollege = (e) => {
    const file = e.target.files[0];
    if (file) {
      setcollegeimage(file);
    }
  };
  
  const handleImageChangehospital = (e) => {
    const file = e.target.files[0];
    if (file) {
      sethospitalimage(file);
    }
  };
  
  const pdfHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdf(file);
    }
  };

  // Helper function to upload a single file
  const uploadFile = async (file, endpoint, fieldName) => {
    if (!file) return null;
    
    try {
      const formData = new FormData();
      formData.append(fieldName, file);
      
      const response = await fetch(`${apiurl}api/v1/${endpoint}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        return data.image_url || data.pdf_url;
      } else {
        throw new Error(data.message || 'Unknown error');
      }
    } catch (error) {
      console.error(`Failed to upload ${fieldName}:`, error);
      throw error;
    }
  };

  // Updated updateProduct function with improved field handling
  const updateProduct = async () => {
    if (!productDetails || !productDetails._id) {
      alert("No product to update or missing product ID");
      return;
    }

    try {
      console.log("Starting update for product ID:", productDetails._id);
      
      // Create an update payload with only the fields that need to be sent
      const updatePayload = {};
      
      // Always include these text fields from the form
      const textFields = [
        'name', 'category', 'start_price', 'end_price', 
        'location', 'city', 'land', 'map', 
        'school_list', 'college_list', 'hospital_list'
      ];
      
      // Add current values to the payload
      textFields.forEach(field => {
        updatePayload[field] = productDetails[field];
      });
      
      // Define upload configurations
      const uploads = [
        { file: image, endpoint: 'upload', fieldName: 'product', payloadField: 'image' },
        { file: image1, endpoint: 'upload1', fieldName: 'product1', payloadField: 'image1' },
        { file: image2, endpoint: 'upload3', fieldName: 'product2', payloadField: 'image2' },
        { file: image3, endpoint: 'upload4', fieldName: 'product3', payloadField: 'image3' },
        { file: schoolimage, endpoint: 'uploadschool', fieldName: 'school', payloadField: 'schoolimage' },
        { file: collegeimage, endpoint: 'uploadcollege', fieldName: 'college', payloadField: 'collegeimage' },
        { file: hospitalimage, endpoint: 'uploadhospital', fieldName: 'hospital', payloadField: 'hospitalimage' },
        { file: pdf, endpoint: 'uploadpdf', fieldName: 'pdf', payloadField: 'pdf' }
      ];
      
      // Process each upload sequentially to avoid race conditions
      for (const upload of uploads) {
        if (upload.file) {
          try {
            console.log(`Uploading ${upload.payloadField}...`);
            const url = await uploadFile(upload.file, upload.endpoint, upload.fieldName);
            
            if (url) {
              updatePayload[upload.payloadField] = url;
              console.log(`Successfully uploaded ${upload.payloadField}: ${url}`);
            }
          } catch (error) {
            console.error(`${upload.payloadField} upload failed:`, error);
            alert(`Failed to upload ${upload.payloadField}: ${error.message}`);
            // Continue with other uploads
          }
        }
      }

      console.log("Sending update request with payload:", updatePayload);

      // Send the update request to the backend with just the fields we want to update
      const updateResponse = await fetch(`${apiurl}api/v1/updateproduct/${productDetails._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      const updateResponseText = await updateResponse.text();
      console.log("Raw server response:", updateResponseText);
      
      let updateData;
      try {
        updateData = JSON.parse(updateResponseText);
      } catch (error) {
        throw new Error(`Invalid JSON response: ${updateResponseText}`);
      }

      if (!updateResponse.ok) {
        throw new Error(`Server responded with ${updateResponse.status}: ${updateData.message || updateResponseText}`);
      }
      
      if (updateData.success) {
        alert("Product updated successfully!");
        fetchInfo(); // Refresh the product list
        setIsModalOpen(false); // Close the modal
        
        // Reset all states
        setImage(null);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setschoolimage(null);
        setcollegeimage(null);
        sethospitalimage(null);
        setPdf(null);
        setCurrentImages({
          image: '',
          image1: '',
          image2: '',
          image3: '',
          schoolimage: '',
          collegeimage: '',
          hospitalimage: '',
          pdf: ''
        });
      } else {
        alert(`Failed to update product: ${updateData.message || 'Unknown error'}`);
        console.error('Update failed:', updateData);
      }
    } catch (error) {
      console.error("Error in update process:", error);
      alert(`An error occurred while updating the product: ${error.message}`);
    }
  };

  // Helper function to render image preview
  const renderImagePreview = (file, currentUrl, alt) => {
    if (file) {
      return <img src={URL.createObjectURL(file)} alt={alt} className="addproduct-thumbnail-img" />;
    } else if (currentUrl) {
      return <img src={currentUrl} alt={alt} className="addproduct-thumbnail-img" />;
    } else {
      return <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />;
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin">
      <Sidebar />
      <div className="list-product">
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Projects</p>
          <p>Title</p>
          <p>Location</p>
          <p>Start Price</p>
          <p>End Price</p>
          <p>Category</p>
          <p>Land</p>
          <p>Address</p>
          <p className="map">Map</p>
          <p className='imagelist'>School Image</p>
          <p className='imagelist'>College Image</p>
          <p className='imagelist'>Hospital Image</p>
          <p className='imagelist'>pdf</p>
          <p>School List</p>
          <p>College List</p>
          <p>Hospital List</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {currentProducts.map((product) => (
            <div key={product._id} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>{product.location}</p>
              <p>₹{product.start_price}</p>
              <p>₹{product.end_price}</p>
              <p>{product.category}</p>
              <p>{product.land}</p>
              <p>{product.city}</p>
              <p className="map">{product.map}</p>
              <p className='imagelist'>{product.schoolimage && "Yes"}</p>
              <p className='imagelist'>{product.collegeimage && "Yes"}</p>
              <p className='imagelist'>{product.hospitalimage && "Yes"}</p>
              <p className='imagelist'>{product.pdf && "Yes"}</p>
              <p>{product.school_list}</p>
              <p>{product.college_list}</p>
              <p>{product.hospital_list}</p>

              <MdDeleteForever
                onClick={() => removeProduct(product._id)}
                className="listproduct-remove-icon"
              />
              <button onClick={() => handleEditClick(product)} className="listproduct-edit-btn">Edit</button>
            </div>
          ))}
          <hr />
        </div>

        {/* Pagination Controls */}
        {allProducts.length > productsPerPage && (
          <div className="d-flex justify-content-center mt-3" style={{ gap: '10px', marginBottom: '20px' }}>
            {Array.from({ length: Math.ceil(allProducts.length / productsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                style={{
                  padding: '5px 15px',
                  cursor: 'pointer',
                  border: '1px solid #fa9c23',
                  backgroundColor: currentPage === i + 1 ? '#fa9c23' : '#fff',
                  color: currentPage === i + 1 ? '#fff' : '#fa9c23',
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {isModalOpen && productDetails && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
              <h2>Edit Product</h2>
              <div className="names">
                <label htmlFor="productName" className="addproduct-itemfield">Product Name:</label>
                <input
                  id="productName"
                  type="text"
                  value={productDetails.name || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                  placeholder="Enter Product Name"
                />
                
                <label htmlFor="category" className="addproduct-itemfield">Category</label>
                <select
                  value={productDetails.category || 'Ongoing Project'}
                  onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
                  id="category"
                  className="add-product-selector"
                >
                  <option value="Ongoing Project">Ongoing Project</option>
                  <option value="Completed Project">Completed Project</option>
                  <option value="Upcoming Project">Upcoming Project</option>
                </select>
              </div>
              <div className="prices">
                <label htmlFor="startPrice" className="addproduct-itemfield">Start Price</label>
                <input
                  id="startPrice"
                  type="text"
                  value={productDetails.start_price || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, start_price: e.target.value })}
                  placeholder="Start Price"
                />
                <label htmlFor="endPrice" className="addproduct-itemfield">End Price</label>
                <input
                  id="endPrice"
                  type="text"
                  value={productDetails.end_price || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, end_price: e.target.value })}
                  placeholder="End Price"
                />
              </div>
              <div className="location">
                <label htmlFor="location" className="addproduct-itemfield">Location</label>
                <input
                  id="location"
                  type="text"
                  value={productDetails.location || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, location: e.target.value })}
                  placeholder="Location"
                />
                <label htmlFor="city" className="addproduct-itemfield">Address</label>
                <input
                  id="city"
                  type="text"
                  value={productDetails.city || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div className="land">
                <label htmlFor="land" className="addproduct-itemfield">Land Type</label>
                <input
                  id="land"
                  type="text"
                  value={productDetails.land || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, land: e.target.value })}
                  placeholder="Land Type"
                />
                <label htmlFor="schoolList" className="addproduct-itemfield">School List</label>
                <input
                  id="schoolList"
                  type="text"
                  value={productDetails.school_list || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, school_list: e.target.value })}
                  placeholder="School List"
                />
              </div>
              <div className="lists">
                <label htmlFor="collegeList" className="addproduct-itemfield">College List</label>
                <input
                  id="collegeList"
                  type="text"
                  value={productDetails.college_list || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, college_list: e.target.value })}
                  placeholder="College List"
                />
                <label htmlFor="hospitalList" className="addproduct-itemfield">Hospital List</label>
                <input
                  id="hospitalList"
                  type="text"
                  value={productDetails.hospital_list || ''}
                  onChange={(e) => setProductDetails({ ...productDetails, hospital_list: e.target.value })}
                  placeholder="Hospital List"
                />
              </div>
              <div className='pdf'>
                <div className="addproduct-itemfield pdfurl">
                  <p>Brochure Upload {currentImages.pdf && "(Current PDF available)"}</p>
                  <input onChange={pdfHandler} type="file" name="pdf" accept="application/pdf" />
                </div>
                <div className="mapurl">
                  <label htmlFor="mapUrl" className="addproduct-itemfield">Map URL</label>
                  <input
                    id="mapUrl"
                    type="text"
                    value={productDetails.map || ''}
                    onChange={(e) => setProductDetails({ ...productDetails, map: e.target.value })}
                    placeholder="Map URL"
                  />
                </div>
              </div>
              <div className='images1'>
                <div className="addproduct-itemfield2">
                  <p>Thumbnail Image</p>
                  <label htmlFor="file-input">
                    {renderImagePreview(image, currentImages.image, "Thumbnail Preview")}
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                  />
                </div>
        
                <div className="addproduct-itemfield2">
                  <p>Image 1</p>
                  <label htmlFor="file-input1">
                    {renderImagePreview(image1, currentImages.image1, "Image 1 Preview")}
                  </label>
                  <input
                    onChange={handleImageChange1}
                    type="file"
                    name="image1"
                    id="file-input1"
                    hidden
                  />
                </div>
        
                <div className="addproduct-itemfield2">
                  <p>Image 2</p>
                  <label htmlFor="file-input2">
                    {renderImagePreview(image2, currentImages.image2, "Image 2 Preview")}
                  </label>
                  <input
                    onChange={handleImageChange2}
                    type="file"
                    name="image2"
                    id="file-input2"
                    hidden
                  />
                </div>
        
                <div className="addproduct-itemfield2">
                  <p>Image 3</p>
                  <label htmlFor="file-input3">
                    {renderImagePreview(image3, currentImages.image3, "Image 3 Preview")}
                  </label>
                  <input
                    onChange={handleImageChange3}
                    type="file"
                    name="image3"
                    id="file-input3"
                    hidden
                  />
                </div>
        
                <div className="addproduct-itemfield2">
                  <p>School Image</p>
                  <label htmlFor="file-inputschool">
                    {renderImagePreview(schoolimage, currentImages.schoolimage, "School Image Preview")}
                  </label>
                  <input
                    onChange={handleImageChangeschool}
                    type="file"
                    name="schoolimage"
                    id="file-inputschool"
                    hidden
                  />
                </div>
        
                <div className="addproduct-itemfield2">
                  <p>College Image</p>
                  <label htmlFor="file-inputcollege">
                    {renderImagePreview(collegeimage, currentImages.collegeimage, "College Image Preview")}
                  </label>
                  <input
                    onChange={handleImageChangecollege}
                    type="file"
                    name="imagecollege"
                    id="file-inputcollege"
                    hidden
                  />
                </div>
        
                <div className="addproduct-itemfield2">
                  <p>Hospital Image</p>
                  <label htmlFor="file-inputhospital">
                    {renderImagePreview(hospitalimage, currentImages.hospitalimage, "Hospital Image Preview")}
                  </label>
                  <input
                    onChange={handleImageChangehospital}
                    type="file"
                    name="imagehospital"
                    id="file-inputhospital"
                    hidden
                  />
                </div>
              </div>

              <button onClick={updateProduct} className="update-btn">Update Product</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
