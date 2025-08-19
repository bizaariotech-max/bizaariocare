import React from 'react'
import aboutBanner from '../assets/images/about/banner.png'

import Aboutstyles from '../assets/css/about.module.css';
import OurTeamCart from '../UI/OurTeamCart';
import NewsAndArticles from '../components/NewsAndArticles';
import Header from '../AppLayout/Header';
import Footer from '../AppLayout/Footer';

const About = () => {
  return (
    <>
      {/* <MyNavbar /> */}
      <Header/>
      <section className={Aboutstyles.aboutBanner} style={{backgroundImage: `url(${aboutBanner})`}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-12 ">
              <div className={Aboutstyles.bannerContent}>
                <h1 className={`text-white fw-bold `} >About US</h1>
                <p className='text-white'>Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={Aboutstyles.WhoWeAre} >
        <div className="container spacing-top">
          <div className="content-1">
            <h2>Who We are?</h2>
            <p>We are dedicated to providing reliable testing services across various industries, ensuring safety, quality, and compliance. With a team of experts and trusted lab partners, we deliver precise and timely results, helping our customers meet the highest standards. Our commitment to excellence drives everything we do, making us a trusted partner in quality assurance. We work closely with clients to understand their unique needs, offering customized solutions that ensure product integrity and regulatory compliance. Our focus on innovation, accuracy, and customer satisfaction sets us apart as a leader in the testing services industry.</p>
          </div>
        </div>
      </section>
      <section className="our-mission spacing-top" >
        <div className="container ">
          <div className="content-2">
            <h2>Our Mission</h2>
            <p>Our mission is to deliver accurate, reliable, and timely testing services that ensure the safety, quality, and compliance of products across industries. We strive to provide exceptional value to our customers through innovative solutions, expert knowledge, and a commitment to excellence. Our goal is to be a trusted partner in quality assurance, helping businesses meet industry standards and protect consumer well-being.</p>
          </div>
        </div>
      </section>

      <section className='our-team spacing-top'>
        <div className="container">
          <div className="row">
            <div className="">
              <h2>Meet Our Team</h2>
              <p className='light-color'>Meet Our Leadership Team  Our leadership team brings together expertise and vision, driving innovation and ensuring the highest standards of service.</p>
            </div>
            <div className="team-grid pt-4">
             <OurTeamCart/>
   
            </div>
          </div>
        </div>
      </section>

      <section>
        <NewsAndArticles/>
      </section>
      <Footer/>

    </>
  )
}

export default About