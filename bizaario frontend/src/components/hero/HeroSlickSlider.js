import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { sliderArray } from '../../Data/LocalData';
import "../../assets/css/hero.css";

const HeroSlickSlider = () => {
//  const settings = {
//     // dots: true,                // show navigation dots
//     // infinite: true,            // loop mode
//     // speed: 1000,               // transition speed (1s)
//     // slidesToShow: 1,           // show one slide
//     // slidesToScroll: 1,         // scroll one at a time
//     fade: false,                // enable fade effect
//     // autoplay: true,            // auto play
//     autoplaySpeed: 4000,       // 2s per slide
//     pauseOnHover: true,       // keep autoplay even if hovered
//     arrows: false              // hide prev/next arrows
//   };

  return (
    <div className=" mx-auto  hero-slick-slider">
                    <div > 
                    <div className="item banner-bg "  style={sliderArray.sliderImage}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                               
                                <div className="hero-content">
                                    <h1 className="hero-title">{sliderArray.bannerTitle}</h1>
                                    <p className="hero-text " style={{fontFamily:"sans-serif"}}>{sliderArray.dsc}</p>
                                    <div className="hero-btns">
                                        {/* <div>
                                            <a href="/" className="btn  nav-btn-style2  text-white">See How It  Works</a>
                                        </div> */}
                                        <div>
                                            <a href="/" className="join-our-network" style={{fontFamily:"sans-serif"}}>Join Our Network</a>
                                        </div> 
                                    </div>
                                    {/* <div className="rounded-buttons">
                                        <div className="pill-button ">
                                            <strong>10,000+</strong> Hospitals connected
                                        </div>
                                        <div className="pill-button">
                                            <strong>10K+ </strong> doctors connected
                                        </div> 
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>

<div className="container">
                <div className="banner-data" > 
                 
                    {/* <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                               
                                </div>
                            </div>
                        </div> */}
                        <div className="banner-data1">
                            <h3>120K</h3>
                            Patient Referral
                        </div>
                        <div className="banner-data1">
                            <h3>2K</h3>
                            Doctors Connected
                        </div>
                        <div className="banner-data1">
                            <h3>0.5K</h3>
                            Hospitals Connected
                        </div>
                    </div>
                    </div>
                    </div>
                 
            
  
  );
};



export default HeroSlickSlider
