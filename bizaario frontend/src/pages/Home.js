import React from "react";
import Hero from "../components/hero/Hero";
import "../assets/css/home.css";
import InterCollabs from "../components/InterCollabs";
import LiveSessions from "../components/LiveSessions";
import NewsAndArticles from "../components/NewsAndArticles";
import Awards from "../components/Awards";
import Testimonial from "../components/Testimonial";
import Empowering from "../components/Empowering";
import MedicalBoardPartnerHospitals from "../components/MedicalBoardPartnerHospitals";
import HeroSlickSlider from "../components/hero/HeroSlickSlider";
import Hero2 from "../components/hero/Hero2";
import Header from "../AppLayout/Header";
import Footer from "../AppLayout/Footer";
import HospitalPartenerHome from "../components/HospitalPartenerHome";
import OnlineClinic from "../components/live-sessions-online-clinic/OnlineClinic";
import Bizaariostore from "../components/bizaario_store";

const Home = () => {
  return (
    <>
      {/* <Hero2 /> */}
      <Header />
      {/* <Outlet/>
    <Footer/> */}
      {/* <Navbar/> */}
      <HeroSlickSlider />
      <Empowering />
      <MedicalBoardPartnerHospitals />
      <HospitalPartenerHome />
      <InterCollabs />
      <LiveSessions />
      <OnlineClinic />
      <Bizaariostore />
      <Awards />
      <NewsAndArticles />
      <Testimonial />
      <Footer />
    </>
  );
};

export default Home;
