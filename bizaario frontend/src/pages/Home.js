import React, { useState, useEffect } from "react";
import Hero from "../components/hero/Hero";
import "../assets/css/home.css";

// import MedicalBoard from '../components/medical-board/MedicalBoard'
// import New from '../components/NewsAndArticles'
import InterCollabs from "../components/InterCollabs";
// import SwiperSlider1 from '../components/others/SwiperSlider1'
import LiveSessions from "../components/LiveSessions";
import NewsAndArticles from "../components/NewsAndArticles";

import Awards from "../components/Awards";
// import AwardsSlider from '../components/awards-certification/AwardsSlider'
import Testimonial from "../components/Testimonial";

// import DoctorAppointmentTable from '../UI/DoctorAppointmentTable'

// import BookingAppointment from '../UI/BookingAppointment'
import Empowering from "../components/Empowering";
import MedicalBoardPartnerHospitals from "../components/MedicalBoardPartnerHospitals";
import HeroSlickSlider from "../components/hero/HeroSlickSlider";
import Hero2 from "../components/hero/Hero2";
import Header from "../AppLayout/Header";
import Footer from "../AppLayout/Footer";
import HospitalPartenerHome from "../components/HospitalPartenerHome";
import OnlineClinic from "../components/live-sessions-online-clinic/OnlineClinic";
import Bizaariostore from "../components/bizaario_store";

// Skeleton components
import {
  MedicalBoardSkeleton,
  HospitalPartnersSkeleton,
  InterCollabsSkeleton,
  LiveSessionsSkeleton,
  GenericSectionSkeleton,
  AwardsSkeleton,
  NewsAndArticlesSkeleton,
  TestimonialSkeleton,
} from "../components/skeletons/SkeletonLoaders";

const Home = () => {
  const [loadingStates, setLoadingStates] = useState({
    medicalBoard: true,
    hospitalPartners: true,
    interCollabs: true,
    liveSessions: true,
    onlineClinic: true,
    bizaariostore: true,
    awards: true,
    newsAndArticles: true,
    testimonial: true,
  });

  // Simulate loading completion for each component
  useEffect(() => {
    const timers = [];

    // Stagger the loading completion for different components
    const loadingTimes = {
      medicalBoard: 1500,
      hospitalPartners: 2000,
      interCollabs: 1000,
      liveSessions: 1200,
      onlineClinic: 1800,
      bizaariostore: 1600,
      awards: 2200,
      newsAndArticles: 2500,
      testimonial: 2800,
    };

    Object.entries(loadingTimes).forEach(([component, delay]) => {
      const timer = setTimeout(() => {
        setLoadingStates((prev) => ({
          ...prev,
          [component]: false,
        }));
      }, delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <>
      {/* <Hero2 /> */}
      <Header />
      {/* <Outlet/>    
    <Footer/> */}
      {/* <Navbar/> */}
      <HeroSlickSlider />
      <Empowering />

      {/* Medical Board with Skeleton */}
      <section className="spacing-top medical-board-partner-hospitals">
        <div className="container">
          {loadingStates.medicalBoard ? (
            <div>
              <div className="mb-4 row">
                <div className="text-center col-12">
                  <div className="animate-pulse">
                    <div className="w-64 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
                    <div className="h-4 mx-auto bg-gray-300 rounded w-96"></div>
                  </div>
                </div>
              </div>
              <MedicalBoardSkeleton />
            </div>
          ) : (
            <MedicalBoardPartnerHospitals />
          )}
        </div>
      </section>

      {/* Hospital Partners with Skeleton */}
      <section className="spacing-top">
        <div className="container">
          {loadingStates.hospitalPartners ? (
            <div>
              <div className="mb-4 row">
                <div className="text-center col-12">
                  <div className="animate-pulse">
                    <div className="w-64 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
                    <div className="h-4 mx-auto bg-gray-300 rounded w-96"></div>
                  </div>
                </div>
              </div>
              <HospitalPartnersSkeleton />
            </div>
          ) : (
            <HospitalPartenerHome />
          )}
        </div>
      </section>

      {/* International Collaborations with Skeleton */}
      <section className="spacing-top">
        <div className="container">
          {loadingStates.interCollabs ? (
            <div>
              <div className="mb-4 row">
                <div className="text-center col-12">
                  <div className="animate-pulse">
                    <div className="w-64 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
                    <div className="h-4 mx-auto bg-gray-300 rounded w-96"></div>
                  </div>
                </div>
              </div>
              <InterCollabsSkeleton />
            </div>
          ) : (
            <InterCollabs />
          )}
        </div>
      </section>

      {/* Live Sessions with Skeleton */}
      {loadingStates.liveSessions ? (
        <div className="spacing-top">
          <LiveSessionsSkeleton />
        </div>
      ) : (
        <LiveSessions />
      )}

      {/* Online Clinic with Skeleton */}
      {loadingStates.onlineClinic ? (
        <div className="spacing-top">
          <GenericSectionSkeleton />
        </div>
      ) : (
        <OnlineClinic />
      )}

      {/* Bizaario Store with Skeleton */}
      {loadingStates.bizaariostore ? (
        <div className="spacing-top">
          <GenericSectionSkeleton />
        </div>
      ) : (
        <Bizaariostore />
      )}

      {/* Awards with Skeleton */}
      <section className="spacing-top">
        <div className="container">
          {loadingStates.awards ? (
            <div>
              <div className="mb-4 row">
                <div className="text-center col-12">
                  <div className="animate-pulse">
                    <div className="w-64 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
                    <div className="h-4 mx-auto bg-gray-300 rounded w-96"></div>
                  </div>
                </div>
              </div>
              <AwardsSkeleton />
            </div>
          ) : (
            <Awards />
          )}
        </div>
      </section>

      {/* News and Articles with Skeleton */}
      <section className="spacing-top">
        <div className="container">
          {loadingStates.newsAndArticles ? (
            <div>
              <div className="mb-4 row">
                <div className="text-center col-12">
                  <div className="animate-pulse">
                    <div className="w-64 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
                    <div className="h-4 mx-auto bg-gray-300 rounded w-96"></div>
                  </div>
                </div>
              </div>
              <NewsAndArticlesSkeleton />
            </div>
          ) : (
            <NewsAndArticles />
          )}
        </div>
      </section>

      {/* Testimonial with Skeleton */}
      <section className="spacing-top">
        <div className="container">
          {loadingStates.testimonial ? (
            <div>
              <div className="mb-4 row">
                <div className="text-center col-12">
                  <div className="animate-pulse">
                    <div className="w-64 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
                    <div className="h-4 mx-auto bg-gray-300 rounded w-96"></div>
                  </div>
                </div>
              </div>
              <TestimonialSkeleton />
            </div>
          ) : (
            <Testimonial />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
