import React from 'react'
import Hero from '../components/hero/Hero'
import '../assets/css/home.css'

// import MedicalBoard from '../components/medical-board/MedicalBoard'
// import New from '../components/NewsAndArticles'
import InterCollabs from '../components/InterCollabs'
// import SwiperSlider1 from '../components/others/SwiperSlider1'
import LiveSessions from '../components/LiveSessions'
import NewsAndArticles from '../components/NewsAndArticles'

import Awards from '../components/Awards'
// import AwardsSlider from '../components/awards-certification/AwardsSlider'
import Testimonial from '../components/Testimonial'

// import DoctorAppointmentTable from '../UI/DoctorAppointmentTable'

// import BookingAppointment from '../UI/BookingAppointment'
import Empowering from '../components/Empowering'
import MedicalBoardPartnerHospitals from '../components/MedicalBoardPartnerHospitals'
import HeroSlickSlider from '../components/hero/HeroSlickSlider'
import Hero2 from '../components/hero/Hero2'
import Header from '../AppLayout/Header';
import Footer from '../AppLayout/Footer'
import HospitalPartenerHome from '../components/HospitalPartenerHome'
import OnlineClinic from '../components/live-sessions-online-clinic/OnlineClinic'



const Home = () => {
  return (
      <>
      {/* <Hero2 /> */}
        <Header />  
    {/* <Outlet/>    
    <Footer/> */}
    {/* <Navbar/> */}
      <HeroSlickSlider/>
      <Empowering />
      <MedicalBoardPartnerHospitals/> 
      <HospitalPartenerHome/>
      <InterCollabs />
      <LiveSessions/> 
      <OnlineClinic/>
      <NewsAndArticles />
      <Awards />
      <Testimonial /> 
      <Footer/>
      </>
  )
}

export default Home