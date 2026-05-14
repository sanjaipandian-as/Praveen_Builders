import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import WhatsAppButton from './components/layouts/whatapp'; 

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

import axios from 'axios';

import UserList from './components/admin/UserList';
import Addproduct from './components/admin/AddProduct/AddProduct'
import Listproduct from './components/admin/ListProduct/ListProduct'
import UpdateUser from './components/admin/UpdateUser';
import About from './components/About/About';

import Facility from './components/layouts/Projects/Fasility';
import Pop from './components/layouts/pop';

import ContactPage from './components/layouts/Contact/contact';
import Completed from './components/layouts/Projects/Completed/Completed';
import Projectscard from './components/layouts/Projectcard';

import Upcoming from './components/layouts/Projects/Upcomeing/Upcomingcard';
import PraveenSudikshaGarden from './components/layouts/Projects/Upcomeing/Upcomeing';

import ProductDetail from './components/product/ProductDetail';

function App() {
  useEffect(() => {
    store.dispatch(loadUser)
    
    // Only fetch the Stripe API key if you're actually using it somewhere
    async function getStripeApiKey(){
      // This data is now used in the app configuration
      const {data} = await axios.get('/api/v1/stripeapi')
      // Store in localStorage or context if needed instead of unused state
      localStorage.setItem('stripeApiKey', data.stripeApiKey)
    }
    
    getStripeApiKey()
  }, [])

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header/>
            <div className='container-fluid'>
              <ToastContainer theme='dark' />
              <Routes>
                  <Route path='/' element={<Home/>} />
                  <Route path='/about' element={<About/>} />
                
                  <Route path='/fa' element={<Facility/>} />
                 
                  <Route path='/Completed' element={<Completed/>} />
                  <Route path='/Ongoingprojects' element={<Projectscard/>} />
                  
                  <Route path='/Upcoming' element={<Upcoming/>} />
                  <Route path='/PraveenSudikshaGarden' element={<PraveenSudikshaGarden/>} />
                  <Route path='/ContactPage' element={<ContactPage/>} />
                  <Route path='/pop' element={<Pop/>} />

                  <Route path='/login' element={<Login/>} />
                 
                  <Route path='/register' element={<Register/>} />
                  <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                  <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
                  <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
                  <Route path='/password/forgot' element={<ForgotPassword/>} />
                  <Route path='/password/reset/:token' element={<ResetPassword/>} />

                  {/* Admin Routes */}
                  <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute>} />
                  <Route path='/admin/addproject' element={<ProtectedRoute isAdmin={true}><Addproduct/></ProtectedRoute>} />
                  <Route path='/admin/listproduct' element={<ProtectedRoute isAdmin={true}><Listproduct/></ProtectedRoute>} />
                  <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} />

                  <Route path='/product/:id' element={<ProductDetail/>} />
              </Routes>
            </div>
            <WhatsAppButton />
            <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
