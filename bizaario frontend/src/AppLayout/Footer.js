import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaBitcoin,
  FaLinkedinIn,
   FaTwitter, 
   FaYoutube 
} from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
// import { MdEmail, MdPhone, MdLanguage } from "react-icons/md";
import { FaFigma } from "react-icons/fa";
import "../assets/css/footer.css";
// import "../assets/css/header.css";
import footerLogo from '../assets/images/footer-logo.png'
// import socialIcon1 from '../assets/images/icons/social-icons/social.svg'
// import socialIcon2 from '../assets/images/icons/social-icons/social-1.svg'
// import socialIcon3 from '../assets/images/icons/social-icons/social-2.svg'
// import socialIcon4 from '../assets/images/icons/social-icons/social-3.svg'

import { NavLink } from 'react-router'


const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Logo & About */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-logo d-flex justify-content-lg-left">
              <img src={footerLogo} alt="Bizaario Logo" className="mb-3" />
            </div>

            <p className="footer-text">
              High level experience in web design and development knowledge,
              producing quality work.
            </p>
            <h6 className="fw-bold">Follow us</h6>
            <div className="gap-3 mt-2 d-flex">
              <a href="#">
                <FaFacebookF size={18} color="#000000" />
              </a>
              <a href="#">
                <FaInstagram size={18} color="#000000" />
              </a>
              <a href="#">
                <FaLinkedinIn size={18} color="#000000" />
              </a>
              <a href="#">
                <FaTwitter size={18} color="#000000" />
              </a>
              <a href="#">
                <FaYoutube size={18} color="#000000" />
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <div className="d-flex ft-contact-info ">
                <MdOutlinePhoneInTalk className="me-2" />
                <h6 className="fw-bold">Phone Number</h6>
              </div>
              <a className="light-color" href="tel:5252525252">
                {" "}
                ‪+91 5252525252‬
              </a>
            </div>
            <div className="contact-card">
              <div className="d-flex ft-contact-info ">
                <MdOutlineMailOutline className="me-2" />
                <h6 className="fw-bold"> Email ID</h6>
              </div>
              <a
                href="mailto:rjvijs42@gmail.com"
                className=" light-color decoration-none"
              >
                rjvijs42@gmail.com
              </a>
            </div>

            <div className="contact-card">
              <div className="d-flex ft-contact-info">
                <TbWorld className="me-2" />
                <h6 className="fw-bold "> Website</h6>
              </div>
              <a
                className="mb-0 light-color decoration-none"
                href="https://papayapalette.com/"
                target="_blank"
              >
                www.papayapalette.com
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="mb-3 fw-bold">Company</h6>
            <ul className="list-unstyled ft-quick-link">
              {/* <NavLink to='/about'>About Us </NavLink> */}
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/FAQs">FAQs</NavLink>
              </li>

              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="mb-3 fw-bold">Use Cases</h6>
            <ul className="list-unstyled ft-quick-link">
              <li>
                {" "}
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/terms">Terms of Use</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/legal">Legal</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-3 text-center footer-bottom">
        ©2021 BIZAARIO CONNECT All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;