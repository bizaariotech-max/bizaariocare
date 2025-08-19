import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import HospitalsPartners from './pages/HospitalsPartners';

import MedicalBoardPage from './pages/MedicalBoardPage';
import NewsArticles from './pages/NewsArticles';
import ContactUs from'./pages/ContactUs';
import RegisterPage from "./components/register";
import SignIn from "./components/signin";
import Admindashboard from "./components/Admin/admindashboard";
import AdminAddDoctorHospital from '../src/components/Admin/adddoctor'
import Doctordashboard from "./components/Doctor/doctordashboard";
import Createnewcourse from "./components/Doctor/createnewcourse";
import Createdigitalcme from "./components/Doctor/createdigitalcme";
import Createdititalcmequestionbank from "./components/Doctor/createdigitalcmequestionbank";
import Createsubadmin from "./components/Doctor/createsubadmin";
import { Editdoctorprofile } from "./components/Doctor/editprofile";
import Layout from "./AppLayout/Layout";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
   
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/partners" element={<HospitalsPartners />} />
      <Route path="/medical-board" element={<MedicalBoardPage />} />
      <Route path="/news-articles" element={<NewsArticles />} />
      <Route path="/news-articles/id" element={<NewsArticles />} />
      <Route path="/contact" element={<ContactUs />} />
       <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        {/* <Route path="/terms" element={<Terms/>} /> */}
      
      {/* <Route path="/" element={<Layout />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignIn />} />
         <Route path="/admindashboard" element={<Admindashboard/>}></Route>
        <Route path="/adddoctor" element={<AdminAddDoctorHospital/>}></Route>
        <Route path="/doctordashboard" element={<Doctordashboard/>}></Route>
        <Route path="/createnewcourse" element={<Createnewcourse/>}></Route>
        <Route path="/createdigitalcme" element={<Createdigitalcme/>}></Route>
        <Route path="/createdigitalcmequestionbank" element={<Createdititalcmequestionbank/>}></Route> 
        <Route path="/createsubadmin" element={<Createsubadmin/>}></Route> 
        <Route path="/editdoctorprofile" element={<Editdoctorprofile/>}></Route> 
      </Routes>
      {/* <Doctordashboard/> */}
      
        
    </BrowserRouter>

   
  );
}

export default App;
