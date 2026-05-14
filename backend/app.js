const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cors = require('cors');
app.use(cors({
    origin: true, // Automatically reflect the request origin
    credentials: true // Required for cookies, authorization headers with HTTPS
}));

const auth = require('./routes/auth');

// --- Assets (images stored as bytes in MongoDB) ---
const Asset = mongoose.model(
    "Asset",
    new mongoose.Schema(
        {
            data: Buffer,
            contentType: String,
            filename: String,
            createdAt: { type: Date, default: Date.now },
        },
        { collection: "assets" }
    )
);

const uploadAsset = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

async function saveAssetFromFile(file) {
    if (!file) return null;
    return Asset.create({
        data: file.buffer,
        contentType: file.mimetype,
        filename: file.originalname,
    });
}

app.get('/api/v1/assets/:id', async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ success: false, message: 'Asset not found' });
        }

        res.setHeader('Content-Type', asset.contentType || 'application/octet-stream');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return res.status(200).send(asset.data);
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid asset id' });
    }
});

// Upload Endpoints (return a URL that serves bytes from MongoDB)
app.post('/api/v1/upload', uploadAsset.single('product'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: 'File not uploaded' });
    const asset = await saveAssetFromFile(req.file);
    return res.json({ success: 1, image_url: `https://api.praveenproperties.com/api/v1/assets/${asset._id}` });
});

app.post('/api/v1/upload1', uploadAsset.single('product1'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: 'File not uploaded' });
    const asset = await saveAssetFromFile(req.file);
    return res.json({ success: 1, image_url: `https://api.praveenproperties.com/api/v1/assets/${asset._id}` });
});

app.post('/api/v1/upload3', uploadAsset.single('product2'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: 'File not uploaded' });
    const asset = await saveAssetFromFile(req.file);
    return res.json({ success: 1, image_url: `https://api.praveenproperties.com/api/v1/assets/${asset._id}` });
});

app.post('/api/v1/upload4', uploadAsset.single('product3'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: 'File not uploaded' });
    const asset = await saveAssetFromFile(req.file);
    return res.json({ success: 1, image_url: `https://api.praveenproperties.com/api/v1/assets/${asset._id}` });
});

app.post('/api/v1/uploadschool', uploadAsset.single('school'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: 'File not uploaded' });
    const asset = await saveAssetFromFile(req.file);
    return res.json({ success: 1, image_url: `https://api.praveenproperties.com/api/v1/assets/${asset._id}` });
});

app.post('/api/v1/uploadcollege', uploadAsset.single('college'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: 'File not uploaded' });
    const asset = await saveAssetFromFile(req.file);
    return res.json({ success: 1, image_url: `https://api.praveenproperties.com/api/v1/assets/${asset._id}` });
});

app.post('/api/v1/uploadhospital', uploadAsset.single('hospital'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: 'File not uploaded' });
    const asset = await saveAssetFromFile(req.file);
    return res.json({ success: 1, image_url: `https://api.praveenproperties.com/api/v1/assets/${asset._id}` });
});


//pdf
// Define the directory to store uploaded PDF files
const uploadDirpdf = path.join(__dirname, 'upload', 'pdf');

// Ensure the directory exists
if (!fs.existsSync(uploadDirpdf)) {
    fs.mkdirSync(uploadDirpdf, { recursive: true });
}

// Multer storage configuration for PDF files
const storagepdf = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirpdf);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

// Multer upload instance with PDF validation and size limit
const uploadpdf = multer({
    storage: storagepdf,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB size limit
});

// Serve static files for uploaded PDFs
app.use('/api/v1/pdf', express.static(uploadDirpdf));

// Upload endpoint for PDF files
app.post('/api/v1/uploadpdf', (req, res) => {
    uploadpdf.single('pdf')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: 0,
                    message: 'File size should not exceed 20 MB',
                });
            }
            return res.status(400).json({ success: 0, message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({
                success: 0,
                message: 'File not uploaded. Please provide a valid PDF file.',
            });
        }

        res.status(200).json({
            success: 1,
            pdf_url: `https://praveenproperties.com/api/v1/pdf/${req.file.filename}`,
        });
    });
});


// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: "New Project"
  },
  image: {
    type: String,
    default: ""
  },
  image1: {
    type: String,
    default: ""
  },
  image2: {
    type: String,
    default: ""
  },
  image3: {
    type: String,
    default: ""
  },
  schoolimage: {
    type: String,
    default: ""
  },
  collegeimage: {
    type: String,
    default: ""
  },
  hospitalimage: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: "General"
  },
  start_price: {
    type: String,
    default: "0"
  },
  end_price: {
    type: String,
    default: "0"
  },
  location: {
    type: String,
    default: "Not Specified"
  },
  city: {
    type: String,
    default: "Unknown"
  },
  map: {
    type: String,
    default: ""
  },
  land: {
    type: String,
    default: "0 sqft"
  },
  school_list: {
    type: String,
    default: ""
  },
  college_list: {
    type: String,
    default: ""
  },
  hospital_list: {
    type: String,
    default: ""
  },
  pdf: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});







// Add Product Endpoint
app.post('/api/v1/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        schoolimage:req.body.schoolimage,
        collegeimage:req.body.collegeimage,
        hospitalimage:req.body.hospitalimage,
        location: req.body.location,
        category: req.body.category,
        start_price: req.body.start_price,
        end_price: req.body.end_price,
        city: req.body.city,
        land: req.body.land,
        map: req.body.map,
        school_list: req.body.school_list,
        college_list: req.body.college_list,
        hospital_list: req.body.hospital_list,
        pdf:req.body.pdf
    });
    console.log(product);
    await product.save();
    console.log("Saved Successfully!");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Product Update Endpoint
// Product Update Endpoint
// Product Update Endpoint
app.put('/api/v1/updateproduct/:id', async (req, res) => {
    try {
        // Log the incoming request
        console.log("Update request received for ID:", req.params.id);
        console.log("Update payload:", JSON.stringify(req.body, null, 2));
        
        // Check if ID is valid
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }
        
        // Find the product first to verify it exists
        const existingProduct = await Product.findById(req.params.id);
        if (!existingProduct) {
            console.log("Product not found:", req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // Only update fields that are explicitly provided in the request body
        const updateData = {};
        const fieldsToCopy = [
            'name', 'image', 'image1', 'image2', 'image3', 
            'schoolimage', 'collegeimage', 'hospitalimage',
            'category', 'start_price', 'end_price', 'location', 
            'city', 'land', 'map', 'school_list', 
            'college_list', 'hospital_list', 'pdf'
        ];
        
        fieldsToCopy.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });
        
        // If no fields to update were provided, return early
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields provided for update'
            });
        }
        
        console.log("Updating with data:", JSON.stringify(updateData, null, 2));
        
        // Use findByIdAndUpdate with the properly prepared data
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { 
                new: true,           // Return the updated document
                runValidators: true  // Run schema validators
            }
        );

        console.log("Product updated successfully:", updatedProduct);
        
        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error("Error in update endpoint:", error);
        
        // Specific error handling
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format',
                error: error.message
            });
        }
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }
        
        return res.status(500).json({
            success: false,
            message: 'Server error while updating product',
            error: error.message
        });
    }
});

// Get Product by ID Endpoint
app.get('/api/v1/product/:id', async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('name');

    if (!product) {
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(201).json({
        success: true,
        product
    });
});

// Delete Product Endpoint
app.delete('/api/v1/removeproduct', async (req, res) => {
    const { id } = req.body; // Destructure the ID from the request body

    console.log("Product ID received:", id); // Log the ID being passed

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Product ID is required",
        });
    }

    try {
        // Attempt to find and delete the product by ID
        const result = await Product.findOneAndDelete({ _id: id });

        if (result) {
            console.log("Product removed successfully.");
            return res.status(200).json({
                success: true,
                message: "Product removed successfully",
            });
        } else {
            console.log("Product not found.");
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
    } catch (error) {
        console.error("Error removing product:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while removing the product",
            error: error.message,
        });
    }
});

// Get All Products Endpoint
app.get('/api/v1/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All product fetched");
    res.send(products);
});

// Recently Added Products Endpoint
app.get('/api/v1/recentlyadded', async (req, res) => {
    // Fetch the 6 most recent projects by sorting descending on _id
    let products = await Product.find({}).sort({ _id: -1 }).limit(6);
    console.log("Recently Added Fetched");
    res.send(products);
});

// Ongoing Project Products Endpoint
app.get('/api/v1/ongoingproject', async (req, res) => {
    let products = await Product.find({ category: "Ongoing Project" }).sort({ id: -1 });
    console.log("Ongoing Project Fetched");
    res.send(products);
});

// Completed Project Products Endpoint
app.get('/api/v1/completedproject', async (req, res) => {
    let products = await Product.find({ category: "Completed Project" });
    console.log("Completed Project Fetched");
    res.send(products);
});

// Upcoming Project Products Endpoint
app.get('/api/v1/upcomingproject', async (req, res) => {
    let products = await Product.find({ category: "Upcoming Project" });
    console.log("Upcoming Project Fetched");
    res.send(products);
});

app.use('/api/v1/', auth);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);

module.exports = app;
