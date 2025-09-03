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
import Updateworkexperience from "./components/Doctor/updateworkexperience";
import Updateupcomingevent from "./components/Doctor/updateupcomingevents";
import Updateawards from "./components/Doctor/updateawards_certificates";
import DoctorProfile from "./components/Doctor/doctorprofileview";
import ActivePatient from "./components/ActivePatient/ActivePatient";
import Addcountrygroupmaster from "./components/Admin/add_country_group_master";
import AddAssetCategoryMaster from "./components/Admin/Asset_Category_Master";
import Addeventtype from "./components/Admin/add_event_type";
import Addcontenttype from "./components/Admin/add_content_type";
import Addservicecategory from "./components/Admin/add_service_category";
import Addmedicalspecility from "./components/Admin/add_medical-speciality";
import Addsubscription from "./components/Admin/addsubscription";
import Addorgunit from "./components/Admin/add_org_unit";
import Addstationmaster from "./components/Admin/addstationmaster";
import Addassestsmaster from "./components/Admin/add_assests_master";
import AddAssetCategoryMasterLevel2 from "./components/Admin/Assest_category_Master_Level2";
import AddAssetCategoryMasterLevel3 from "./components/Admin/Assest_category_Master_Level3";
import Loginmaster from "./components/Admin/login_master";
import CompletePatientDetails from "./components/Doctor/CompletePatientDetails/ActivePatient";
import ContentMaster from "./components/Admin/ContentMaster/ContentMaster";
import EventMaster from "./components/Admin/EventMaster/EventMaster";

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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admindashboard" element={<Admindashboard />}></Route>
        <Route path="/adddoctor" element={<AdminAddDoctorHospital />}></Route>
        <Route path="/doctordashboard" element={<Doctordashboard />}></Route>
        <Route path="/createnewcourse" element={<Createnewcourse />}></Route>
        <Route path="/createdigitalcme" element={<Createdigitalcme />}></Route>
        <Route
          path="/createdigitalcmequestionbank"
          element={<Createdititalcmequestionbank />}
        ></Route>
        <Route path="/createsubadmin" element={<Createsubadmin />}></Route>
        <Route
          path="/editdoctorprofile"
          element={<Editdoctorprofile />}
        ></Route>
        <Route
          path="/editdoctorworkexperience"
          element={<Updateworkexperience />}
        ></Route>
        <Route
          path="/editupcomingevents"
          element={<Updateupcomingevent />}
        ></Route>
        <Route path="/editawards" element={<Updateawards />}></Route>
        <Route path="/viewdoctorprofile" element={<DoctorProfile />}></Route>
        <Route path="/addpatientdetails" element={<ActivePatient />}></Route>
        <Route
          path="/addcountry_group_master"
          element={<Addcountrygroupmaster />}
        ></Route>
        <Route path="/add-org-master" element={<Addorgunit />}></Route>
        <Route
          path="/addassest_category_master"
          element={<AddAssetCategoryMaster />}
        ></Route>
        <Route
          path="/addassest_category_master_level2"
          element={<AddAssetCategoryMasterLevel2 />}
        ></Route>
        <Route
          path="/addassest_category_master_level3"
          element={<AddAssetCategoryMasterLevel3 />}
        ></Route>
        <Route path="/add_event_type_master" element={<Addeventtype />}></Route>
        <Route path="/add-content-type" element={<Addcontenttype />}></Route>
        <Route
          path="/add-service-category"
          element={<Addservicecategory />}
        ></Route>
        <Route
          path="/add-medical-specility"
          element={<Addmedicalspecility />}
        ></Route>
        <Route path="/add-subscription" element={<Addsubscription />}></Route>
        <Route path="/add-stationmaster" element={<Addstationmaster />}></Route>
        <Route path="/add-assestmaster" element={<Addassestsmaster />}></Route>
        <Route path="/login-master" element={<Loginmaster />}></Route>
        <Route
          path="/complete-patient-details"
          element={<CompletePatientDetails />}
        ></Route>

        {/* admin content master */}
        <Route path="/content-master" element={<ContentMaster />}></Route>
        <Route path="/event-master" element={<EventMaster />}></Route>
      </Routes>
      {/* <ActivePatient/> */}
    </BrowserRouter>
  );
}

export default App;
