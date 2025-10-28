import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import HospitalsPartners from './pages/HospitalsPartners';
import HospitalDetail from './pages/HospitalDetail';
import DoctorDetail from "./pages/DoctorDetail";
import ArticleDetail from "./components/news-article-page/ArticleDetail.js";

import MedicalBoardPage from "./pages/MedicalBoardPage";
import NewsArticles from "./pages/NewsArticles";
import ContactUs from "./pages/ContactUs";
import RegisterPage from "./components/register";
import SignIn from "./components/signin";
import Admindashboard from "./components/Admin/admindashboard";
import AdminAddDoctorHospital from "../src/components/Admin/adddoctor";
import Doctordashboard from "./components/Doctor/doctordashboard";
import Createnewcourse from "./components/Doctor/createnewcourse";
import Createdigitalcme from "./components/Doctor/digital_cme";
import Createdititalcmequestionbank from "./components/Doctor/createdigitalcmequestionbank";
import Createsubadmin from "./components/Doctor/createsubadmin";
import { Editdoctorprofile } from "./components/Doctor/editprofile";
import Layout from "./AppLayout/Layout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ViewAllDoctors from "./pages/ViewAllDoctors";
import ViewAllHospitals from "./pages/ViewAllHospitals";
import Updateworkexperience from "./components/Doctor/updateworkexperience";
import Updateupcomingevent from "./components/Doctor/updateupcomingevents";
import Updateawards from "./components/Doctor/updateawards_certificates";
import DoctorProfile from "./components/Doctor/doctorprofileview";
import ActivePatient from "./components/ActivePatient/ActivePatient";
import Addcountrygroupmaster from "./components/Admin/configuration/sub_menu/add_country_group_master";
import AddAssetCategoryMaster from "./components/Admin/configuration/sub_menu/Asset_Category_Master";
import Addeventtype from "./components/Admin/configuration/sub_menu/add_event_type";
import Addcontenttype from "./components/Admin/configuration/sub_menu/add_content_type";
import Addservicecategory from "./components/Admin/configuration/sub_menu/add_service_category";
import Addmedicalspecility from "./components/Admin/configuration/sub_menu/add_medical-speciality";
import Addsubscription from "./components/Admin/configuration/sub_menu/addsubscription";
import Addorgunit from "./components/Admin/configuration/sub_menu/add_org_unit";
import Addstationmaster from "./components/Admin/addstationmaster";
import Addassestsmaster from "./components/Admin/add_assests_master";
import AddAssetCategoryMasterLevel2 from "./components/Admin/configuration/sub_menu/Assest_category_Master_Level2";
import AddAssetCategoryMasterLevel3 from "./components/Admin/configuration/sub_menu/Assest_category_Master_Level3";
import Loginmaster from "./components/Admin/login_master";
import CompleteDoctorDetails from "./components/Doctor/CompleteDoctorDetails/ActiveDoctor";
// import CompletePatientDetails from "./components/Doctor/CompleteDoctorDetails/ActiveDoctor";
import ContentMaster from "./components/Admin/ContentMaster/ContentMaster";
import EventMaster from "./components/Admin/EventMaster/EventMaster";
import SymptomMaster from "./components/Admin/Bizaario_Master_Section/symptom_master";
import AggravatingFactorMaster from "./components/Admin/Bizaario_Master_Section/aggravating_factor_master";
import PharmaceuticalSaltMaster from "./components/Admin/Bizaario_Master_Section/pharmaceutical_salt_master";
import SymptomClassMaster from "./components/Admin/Bizaario_Master_Section/symptom_class_master";
import PharmaceuticalSaltTypeMaster from "./components/Admin/Bizaario_Master_Section/pharmaceutical_salt_type_master";
import DosageMaster from "./components/Admin/Bizaario_Master_Section/dosage_master";
import MedicineFrequencyMaster from "./components/Admin/Bizaario_Master_Section/medicine_frequency_master";
import ProcedureMaster from "./components/Admin/Bizaario_Master_Section/procedure _master";
import DiseaseMaster from "./components/Admin/Bizaario_Master_Section/disease_master";
import AllergyMaster from "./components/Admin/Bizaario_Master_Section/allergy_master";
import TraumaMaster from "./components/Admin/Bizaario_Master_Section/trauma_master";
import OccupationMaster from "./components/Admin/Bizaario_Master_Section/occupation_master";
import HabitMaster from "./components/Admin/Bizaario_Master_Section/habit_master";
import TherapyMaster from "./components/Admin/Bizaario_Master_Section/therapy_master";
import AllergyCategory from "./components/Admin/Bizaario_Master_Section/allergy_category";
import TrumaCategory from "./components/Admin/Bizaario_Master_Section/truma_category";
import OccupationCategory from "./components/Admin/Bizaario_Master_Section/occupation_category";
import HabitCategory from "./components/Admin/Bizaario_Master_Section/habit_category";
import ReasonForReferral from "./components/Admin/Bizaario_Master_Section/reason_for_referral_master";
import InvestigationCategory from "./components/Admin/Bizaario_Master_Section/investigation_category_master";
import InvestigationMaster from "./components/Admin/Bizaario_Master_Section/investigation_master";
import DiagnosisMaster from "./components/Admin/Bizaario_Master_Section/diagnosis_master";
import DiagnosisTypeMaster from "./components/Admin/Bizaario_Master_Section/diagnosis_type_master";
import LifestyleInterventionMaster from "./components/Admin/Bizaario_Master_Section/lifestyle_intervention_master";
import SecondOpinionQueryMaster from "./components/Admin/Bizaario_Master_Section/second_opinion_query_master";
import ComorbidityMaster from "./components/Admin/Bizaario_Master_Section/comorbidity_master";
import RiskFactorMaster from "./components/Admin/Bizaario_Master_Section/risk_factor_master";
import PatientConcernMaster from "./components/Admin/Bizaario_Master_Section/patient_concern_master";
import LogsticalConsiderationMaster from "./components/Admin/Bizaario_Master_Section/logistical_consideration_master";
import PatientReferralType from "./components/Admin/Bizaario_Master_Section/patient_referral_type";
import ReferralFor from "./components/Doctor/CompletePatientProfile/referral_for";
import PatientProfiling from "./components/Doctor/CompletePatientProfile/patient_profiling";
import DigitalCme from "./components/Doctor/digital_cme";
import NewsAndArticles from "./components/NewsAndArticles";
import DoctorNewsAndArticles from "./components/Doctor/news_and_articles";
import AwardsAndRecognitions from "./components/Doctor/awards_and_recognitions";
import PatientTestimonials from "./components/Doctor/patient_testimonials";
import OpdSurgicalCamps from "./components/Doctor/opd_surgical_camps";
import Workshop from "./components/Doctor/workshop";
import RelationshipMaster from "./components/Admin/configuration/sub_menu/relationship_master";
import InsuranceProviderMaster from "./components/Admin/configuration/sub_menu/insurance_provider_master";
import ChangePassword from "./components/Doctor/change_password";
import HealthProfillingQuestions from "./components/Admin/Health_Profillling_Questions/health_profilling_questions";
import CompletePatientDetails from "./components/Doctor/CompletePatientProfile/complete_patient_details_main";
import PatientReferralHome from "./components/Doctor/PatientReferral/patient_referral_home.js";
import PatientReferralVerify from "./components/Doctor/PatientReferral/AllSubForms/PatientReferralVerify.js";
import PremiumDoctor from "./components/Doctor/PatientReferral/AllSubForms/PremiumDoctor/PremiumDoctor.js";
import AddNewPatientDetails from "./components/Doctor/PatientReferral/AllSubForms/Add_New_Patient.js";
import HospitalDashboard from "./pages/hospital/HospitalDashboard.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* website  */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/partners" element={<HospitalsPartners />} />

        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />
        <Route path="/medical-board" element={<MedicalBoardPage />} />
        <Route path="/view-all-doctors" element={<ViewAllDoctors />} />
        <Route path="/view-all-hospitals" element={<ViewAllHospitals />} />
        <Route path="/news-articles" element={<NewsArticles />} />
        <Route path="/news-articles/:id" element={<ArticleDetail />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/change-password" element={<ChangePassword />} />
        {/* doctor admin */}
        <Route path="/admindashboard" element={<Admindashboard />}></Route>
        <Route path="/adddoctor" element={<AdminAddDoctorHospital />}></Route>
        <Route path="/doctordashboard" element={<Doctordashboard />}></Route>
        <Route path="/createnewcourse" element={<Createnewcourse />}></Route>

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

        {/*======================== admin configuration ============================*/}

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
        <Route
          path="/add-relationship-master"
          element={<RelationshipMaster />}
        ></Route>
        <Route
          path="/add-insuranceprovider-master"
          element={<InsuranceProviderMaster />}
        ></Route>

        <Route path="/add-stationmaster" element={<Addstationmaster />}></Route>
        <Route path="/add-assestmaster" element={<Addassestsmaster />}></Route>
        <Route path="/login-master" element={<Loginmaster />}></Route>
        <Route
          path="/complete-asset-details"
          element={<CompleteDoctorDetails />}
        ></Route>

        {/* admin content master */}
        <Route path="/content-master" element={<ContentMaster />}></Route>
        <Route path="/event-master" element={<EventMaster />}></Route>

        {/*================================== doctor section route ===============================*/}

        <Route path="/createdigitalcme" element={<DigitalCme />}></Route>
        <Route
          path="/news_and_articles"
          element={<DoctorNewsAndArticles />}
        ></Route>
        <Route
          path="/awards-and-recognitions"
          element={<AwardsAndRecognitions />}
        ></Route>
        <Route
          path="/patient-testimonials"
          element={<PatientTestimonials />}
        ></Route>
        <Route
          path="/opd-srugicla-camps"
          element={<OpdSurgicalCamps />}
        ></Route>
        <Route path="/workshop" element={<Workshop />}></Route>

        <Route
          path="/complete-patient-details"
          element={<CompletePatientDetails />}
        ></Route>

        {/*==================== bizaario master section ==================================*/}

        <Route
          path="/patient-referral-type"
          element={<PatientReferralType />}
        ></Route>
        <Route
          path="/symptom-class-master"
          element={<SymptomClassMaster />}
        ></Route>
        <Route path="/symptom-master" element={<SymptomMaster />}></Route>
        <Route
          path="/aggravating-factor-master"
          element={<AggravatingFactorMaster />}
        ></Route>
        <Route
          path="/pharmaceutical-salt-type-master"
          element={<PharmaceuticalSaltTypeMaster />}
        ></Route>
        <Route
          path="/pharmaceutical-salt-master"
          element={<PharmaceuticalSaltMaster />}
        ></Route>
        <Route path="/dosage-type-master" element={<DosageMaster />}></Route>
        <Route
          path="/medicine-frequency-master"
          element={<MedicineFrequencyMaster />}
        ></Route>
        <Route path="/procedure-master" element={<ProcedureMaster />}></Route>
        <Route path="/disease-master" element={<DiseaseMaster />}></Route>
        <Route
          path="/allergy-category-master"
          element={<AllergyCategory />}
        ></Route>
        <Route path="/allergy-master" element={<AllergyMaster />}></Route>
        <Route
          path="/truma-category-master"
          element={<TrumaCategory />}
        ></Route>
        <Route path="/trauma-master" element={<TraumaMaster />}></Route>
        <Route
          path="/occupation-category-master"
          element={<OccupationCategory />}
        ></Route>
        <Route path="/occupation-master" element={<OccupationMaster />}></Route>
        <Route
          path="/habit-category-master"
          element={<HabitCategory />}
        ></Route>
        <Route path="/habit-master" element={<HabitMaster />}></Route>
        <Route path="/therapy-master" element={<TherapyMaster />}></Route>
        <Route
          path="/reason-for-referral-master"
          element={<ReasonForReferral />}
        ></Route>
        <Route
          path="/investigation-category-master"
          element={<InvestigationCategory />}
        ></Route>
        <Route
          path="/investigation-master"
          element={<InvestigationMaster />}
        ></Route>
        <Route path="/diagnosis-master" element={<DiagnosisMaster />}></Route>
        <Route
          path="/diagnosis-type-master"
          element={<DiagnosisTypeMaster />}
        ></Route>
        <Route
          path="/lifestyle-intervention-master"
          element={<LifestyleInterventionMaster />}
        ></Route>
        <Route
          path="/second-opinion-query-master"
          element={<SecondOpinionQueryMaster />}
        ></Route>
        <Route
          path="/comorbidity-master"
          element={<ComorbidityMaster />}
        ></Route>
        <Route
          path="/risk-factor-master"
          element={<RiskFactorMaster />}
        ></Route>
        <Route
          path="/patient-concern-master"
          element={<PatientConcernMaster />}
        ></Route>
        <Route
          path="/logistical-consideration-master"
          element={<LogsticalConsiderationMaster />}
        ></Route>

        {/*===================== bizaario master section route end ===========================*/}

        <Route
          path="/health-profilling-questions"
          element={<HealthProfillingQuestions />}
        ></Route>

        {/*======================= complete patient profile secion============================= */}
        <Route path="/patient-referral-for" element={<ReferralFor />}></Route>
        <Route path="/patient-profiling" element={<PatientProfiling />}></Route>

        {/*=========================== patient referral============================================= */}

        <Route
          path="/patient-referral-home"
          element={<PatientReferralHome />}
        ></Route>
        <Route
          path="/patient-referral"
          element={<PatientReferralVerify />}
        ></Route>

        <Route
          path="/add-new-patient"
          element={<AddNewPatientDetails />}
        ></Route>

        <Route
          path="/patient-referral/appoint-doctors"
          element={<PremiumDoctor />}
        ></Route>

        {/* hospital admin routes */}
        <Route
          path="/hospitaldashboard"
          element={<HospitalDashboard />}
        ></Route>
      </Routes>
      {/* <ActivePatient/> */}
    </BrowserRouter>
  );
}

export default App;
