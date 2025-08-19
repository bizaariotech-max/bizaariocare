import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { sliderArray } from '../../Data/LocalData';

const HeroSlickSlider = () => {
 const settings = {
    dots: true,                // show navigation dots
    infinite: true,            // loop mode
    speed: 1000,               // transition speed (1s)
    slidesToShow: 1,           // show one slide
    slidesToScroll: 1,         // scroll one at a time
    fade: false,                // enable fade effect
    autoplay: true,            // auto play
    autoplaySpeed: 4000,       // 2s per slide
    pauseOnHover: true,       // keep autoplay even if hovered
    arrows: false              // hide prev/next arrows
  };

  return (
    <div className=" mx-auto  hero-slick-slider">
      <Slider {...settings}>
            {sliderArray.map((element)=> {
                return(
                    <div key={element.id}> 
                    <div className="item banner-bg "  style={element.sliderImage}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <img src={element.sliderImage} alt="" className="img-fluid" />
                                <div className="hero-content">
                                    <h1 className="hero-title ">{element.bannerTitle}</h1>
                                    <p className="hero-text  ">{element.dsc}</p>
                                    <div className="hero-btns">
                                        <div>
                                            <a href="/" className="btn  nav-btn-style2  text-white">See How It  Works</a>
                                        </div>
                                        <div>
                                            <a href="/" className="btn  nav-btn-style">Join Our Network</a>
                                        </div> 
                                    </div>
                                    <div className="rounded-buttons">
                                        <div className="pill-button ">
                                            <strong>10,000+</strong> Hospitals connected
                                        </div>
                                        <div className="pill-button">
                                            <strong>10K+ </strong> doctors connected
                                        </div> 
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
            )
            }
            )}
      </Slider>
    </div>
  );
};



export default HeroSlickSlider
