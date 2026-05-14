import React, { useState } from 'react';
import './AddProduct.css';
import Sidebar from '../Sidebar/Sidebar';
import { MdOutlineCloudUpload } from "react-icons/md";
const apiurl = (() => {
  const raw = (process.env.REACT_APP_API_URL || '').trim();
  if (!raw) return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
})();

const AddProduct = () => {
  const [image, setImage] = useState(null); 
  const [image1, setImage1] = useState(null);// Single image file
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [schoolimage, setschoolimage] = useState(null);
  const [collegeimage, setcollegeimage] = useState(null);
  const [hospitalimage, sethospitalimage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    location: "",
    image: "",
    image1:"",
    image2: "",
    image3: "",
    schoolimage:"",
    collegeimage:"",
    hospitalimage:"",
    category: "Ongoing Project",
    start_price: "",
    end_price: "",
    land: "",
    city: "",
    map: "",
    school_list: "",
    college_list: "",
    hospital_list: "",
    pdf:"",
  });

  //image handlers
  const imageHandler = (e) => {
    setImage(e.target.files[0]); 
  };

  const imageHandler1 = (e) => {
    setImage1(e.target.files[0]); 
  };

  const imageHandler2 = (e) => {
    setImage2(e.target.files[0]); 
  };

  const imageHandler3 = (e) => {
    setImage3(e.target.files[0]); 
  };

  const imageHandlerschool = (e) => {
    setschoolimage(e.target.files[0]); 
  };
  const imageHandlercollege = (e) => {
    setcollegeimage(e.target.files[0]); 
  };
  const imageHandlerhospital = (e) => {
    sethospitalimage(e.target.files[0]); 
  };

  const pdfHandler = (e) => { setPdf(e.target.files[0]); };
  
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };


  
  const AddProduct = async () => {
    try {
      console.log(productDetails);
      let product = { ...productDetails };

      // Upload single image
      if (image) {
        const formData = new FormData();
        formData.append('product', image);

        const singleImageResponse = await fetch(`${apiurl}api/v1/upload`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });
        const singleImageData = await singleImageResponse.json();

        if (singleImageData.success) {
          product.image = singleImageData.image_url;
        } else {
          console.error('Failed to upload single image:', singleImageData.message);
        }
      }

      if (image1) {
        const formData = new FormData();
        formData.append('product1', image1);

        const singleImageResponse = await fetch(`${apiurl}api/v1/upload1`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });
        const singleImageData = await singleImageResponse.json();

        if (singleImageData.success) {
          product.image1 = singleImageData.image_url;
        } else {
          console.error('Failed to upload single image:', singleImageData.message);
        }
      }

if (image2) {
        const formData = new FormData();
        formData.append('product2', image2);

        const singleImageResponse = await fetch(`${apiurl}api/v1/upload3`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });
        const singleImageData = await singleImageResponse.json();

        if (singleImageData.success) {
          product.image2 = singleImageData.image_url;
        } else {
          console.error('Failed to upload single image:', singleImageData.message);
        }
      }

      if (image3) {
        const formData = new FormData();
        formData.append('product3', image3);

        const singleImageResponse = await fetch(`${apiurl}api/v1/upload4`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });
        const singleImageData = await singleImageResponse.json();

        if (singleImageData.success) {
          product.image3 = singleImageData.image_url;
        } else {
          console.error('Failed to upload single image:', singleImageData.message);
        }
      }

//school college hospital images

if (schoolimage) {
  const formData = new FormData();
  formData.append('school', schoolimage);

  const singleImageResponse = await fetch(`${apiurl}api/v1/uploadschool`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });
  const singleImageData = await singleImageResponse.json();

  if (singleImageData.success) {
    product.schoolimage = singleImageData.image_url;
  } else {
    console.error('Failed to upload single image:', singleImageData.message);
  }
}


if (collegeimage) {
  const formData = new FormData();
  formData.append('college', collegeimage);

  const singleImageResponse = await fetch(`${apiurl}api/v1/uploadcollege`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });
  const singleImageData = await singleImageResponse.json();

  if (singleImageData.success) {
    product.collegeimage = singleImageData.image_url;
  } else {
    console.error('Failed to upload single image:', singleImageData.message);
  }
}



if (hospitalimage) {
  const formData = new FormData();
  formData.append('hospital', hospitalimage);

  const singleImageResponse = await fetch(`${apiurl}api/v1/uploadhospital`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });
  const singleImageData = await singleImageResponse.json();

  if (singleImageData.success) {
    product.hospitalimage = singleImageData.image_url;
  } else {
    console.error('Failed to upload single image:', singleImageData.message);
  }
}

if (pdf) {
  const formData = new FormData();
  formData.append('pdf', pdf);
  try {
    const response = await fetch(`${apiurl}api/v1/uploadpdf`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Failed to upload PDF:', response.status);
      return;
    }

    const data = await response.json();
    if (data.success) {
      product.pdf = data.pdf_url;
    } else {
      console.error('Failed to upload PDF:', data.message);
    }
  } catch (error) {
    console.error('Error uploading PDF:', error);
  }
}
      // Send product details to the backend
      const response = await fetch(`${apiurl}api/v1/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (data.success) {
        alert('Project Added Successfully!');
      } else {
        alert('Failed to add project!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the project.');
    }
  };

 



  return (
    <div className="admin">
      <Sidebar />
      <div className="addproduct">
        <div className="addproduct-itemfield">
          <p>Project title</p>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
            
          />
        </div>

        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Start Price</p>
            <input
              value={productDetails.start_price}
              onChange={changeHandler}
              type="text"
              name="start_price"
              placeholder="Type here"
              
            />
          </div>
          <div className="addproduct-itemfield">
            <p>End Price</p>
            <input
              value={productDetails.end_price}
              onChange={changeHandler}
              type="text"
              name="end_price"
              placeholder="Type here"
            />
          </div>
        </div>
<div className='broucher'>
        <div className="addproduct-itemfield">
          <p>Category</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="add-product-selector"
          >
            <option value="Ongoing Project">Ongoing Project</option>
            <option value="Completed Project">Completed Project</option>
            <option value="Upcoming Project">Upcoming Project</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <p>Broucher Upload</p>
          <input onChange={pdfHandler} type="file" name="pdf" accept="application/pdf" />
        </div>
        </div> 

<div className='images'>
        <div className="addproduct-itemfield">
          <p>Thumbnail Image(max: 1 MB)</p>
          <label htmlFor="file-input">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="addproduct-thumbnail-img"
              />
            ) : (
              <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />
            )}
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Upload Image1 (max: 1 MB)</p>
          <label htmlFor="file-input1">
            {image1 ? (
              <img
                src={URL.createObjectURL(image1)}
                alt="Preview"
                className="addproduct-thumbnail-img"
              />
            ) : (
              <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />
            )}
          </label>
          <input
            onChange={imageHandler1}
            type="file"
            name="image1"
            id="file-input1"
            hidden
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Upload Image2 (max: 1 MB)</p>
          <label htmlFor="file-input2">
            {image2 ? (
              <img
                src={URL.createObjectURL(image2)}
                alt="Preview"
                className="addproduct-thumbnail-img"
              />
            ) : (
              <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />
            )}
          </label>
          <input
            onChange={imageHandler2}
            type="file"
            name="image2"
            id="file-input2"
            hidden
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Upload Image3 (max: 1 MB)</p>
          <label htmlFor="file-input3">
            {image3 ? (
              <img
                src={URL.createObjectURL(image3)}
                alt="Preview"
                className="addproduct-thumbnail-img"
              />
            ) : (
              <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />
            )}
          </label>
          <input
            onChange={imageHandler3}
            type="file"
            name="image3"
            id="file-input3"
            hidden
          />
        </div>

        </div>

        
        <div className="addproduct-itemfield">
          <p>Land Type</p>
          <input
            value={productDetails.land}
            onChange={changeHandler}
            type="text"
            name="land"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Address</p>
          <input
            value={productDetails.city}
            onChange={changeHandler}
            type="text"
            name="city"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Location</p>
          <input
            value={productDetails.location}
            onChange={changeHandler}
            type="text"
            name="location"
            placeholder="Type here"
          />
        </div>
        
        <div className="addproduct-itemfield">
          <p>Map URL</p>
          <input
            value={productDetails.map}
            onChange={changeHandler}
            type="url"
            name="map"
            placeholder="https://www.google.com/maps/embed?p..."
          />
        </div>


        <div className='listimages'>
        <div className="addproduct-itemfield">
          <p>School Image</p>
          <label htmlFor="file-inputschool">
            {schoolimage ? (
              <img
                src={URL.createObjectURL(schoolimage)}
                alt="Preview"
                className="addproduct-thumbnail-img"
              />
            ) : (
              <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />
            )}
          </label>
          <input
            onChange={imageHandlerschool}
            type="file"
            name="schoolimage"
            id="file-inputschool"
            hidden
          />
        </div>

        <div className="addproduct-itemfield">
          <p>College Image</p>
          <label htmlFor="file-inputcollege">
            {collegeimage ? (
              <img
                src={URL.createObjectURL(collegeimage)}
                alt="Preview"
                className="addproduct-thumbnail-img"
              />
            ) : (
              <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />
            )}
          </label>
          <input
            onChange={imageHandlercollege}
            type="file"
            name="imagecollege"
            id="file-inputcollege"
            hidden
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Hospital Image </p>
          <label htmlFor="file-inputhospital">
            {hospitalimage ? (
              <img
                src={URL.createObjectURL(hospitalimage)}
                alt="Preview"
                className="addproduct-thumbnail-img"
              />
            ) : (
              <MdOutlineCloudUpload className="addproduct-thumbnail-icon" />
            )}
          </label>
          <input
            onChange={imageHandlerhospital}
            type="file"
            name="imagehospital"
            id="file-inputhospital"
            hidden
          />
        </div>
        </div>

        <div className="addproduct-itemfield-list">
          <div className="addproduct-itemfield">
            <p>School List</p>
            <textarea
              value={productDetails.school_list}
              onChange={changeHandler}
              name="school_list"
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-itemfield">
            <p>College List</p>
            <textarea
              value={productDetails.college_list}
              onChange={changeHandler}
              name="college_list"
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-itemfield">
            <p>Hospital List</p>
            <textarea
              value={productDetails.hospital_list}
              onChange={changeHandler}
              name="hospital_list"
              placeholder="Type here"
            />
          </div>
        </div>

        <button onClick={AddProduct } className="addproduct-btn">
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
