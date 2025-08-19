import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

import contact1 from '../../assets/images/contact1.png'
import contact2 from '../../assets/images/contact2.png'
import contactIcon1 from '../../assets/images/icons/contact-icon1.svg'
const GetInTouch = () => {
  return (
    <>
        <div className="container py-3" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="row g-4">
                {/* Left Card - Get Help */}
                <div className="col-lg-6">

                    <div className="p-sm-4 rounded-4 text-white contact-left-card" style={{
            //   backgroundColor: "#000",
              backgroundImage:` URL(${contact1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              overflow: "hidden"
            }}>
                        {/* Overlay */}
                        <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.8)"
            }}></div>

                        {/* Content */}
                        <div className='contact-left-inner' style={{ position: "relative", zIndex: 2 }}>
                            <div className='d-flex align-items-center justify-content-between '>
                                <div className=''>
                                    <h4 className="mb-2">Get Help</h4>
                                    <p style={{ fontSize: "14px", color: "#ccc" }}> Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit. Sed do eiusmod. </p>
                                </div>
                                <div className='headphon-icon'>
                                    <img src={contactIcon1} alt="" className='img-fluid' />
                                </div>
                            </div>

                            <button className="btn text-white mb-4" style={{ background: "#FF7A00" }}>Email Now</button>
                            <div className='d-flex justify-content-between flex-column flex-sm-row'>
                                <div className='contact-group'>
                                    <p className="mb-1 fw-semibold">
                                        <FaPhoneAlt className="me-2" /> Phone Number</p>
                                    <p className="mb-3">+91 5252525252</p>
                                </div>
                                <div className='contact-group'>
                                    <p className="mb-1 fw-semibold">
                                        <FaEnvelope className="me-2" /> Email ID</p>
                                    <p className="mb-3">rjvjsf42@gmail.com</p>
                                </div>
                            </div>

                            <div className='contact-group'>
                                <p className="mb-1 fw-semibold">
                                    <FaMapMarkerAlt className="me-2" /> Address</p>
                                <p className="mb-3">H-Block, Sector-G3, Noida, Uttar Pradesh, 201301, India</p>
                            </div>

                            <div className="mt-3">
                                <p className="fw-semibold mb-2">Follow Us</p>
                                <div className="d-flex gap-3">
                                    <a href="#">
                                        <FaFacebookF size={18} color="#fff" /></a>
                                    <a href="#">
                                        <FaInstagram size={18} color="#fff" /></a>
                                    <a href="#">
                                        <FaLinkedinIn size={18} color="#fff" /></a>
                                    <a href="#">
                                        <FaTwitter size={18} color="#fff" /></a>
                                    <a href="#">
                                        <FaYoutube size={18} color="#fff" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Card - Get In Touch Form */}
                <div className="col-lg-6">
                    <div className="p-sm-4 p-3 py-4 rounded-4 h-100 text-white" style={{
                             backgroundImage:` URL(${contact2})`,
              backgroundColor: "#111",
              position: "relative",
              overflow: "hidden"
            }}>
                        {/* Watermark Background */}
                        <div style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "5rem",
              color: "rgba(255,255,255,0.05)",
              fontWeight: "bold",
              zIndex: 0
            }}>GET IN TOUCH</div>

                        {/* Content */}
                        <div style={{ position: "relative", zIndex: 2 }}>
                            <h4 className="mb-2">Get In Touch</h4>
                            <p style={{ fontSize: "14px", color: "#ccc" }}>We’d love to hear you</p>

                            <form className='contact-form-fields'>
                                <input type="text" placeholder="Full Name" className="form-control mb-3" />
                                <input type="email" placeholder="Email Address" className="form-control mb-3" />
                                <input type="text" placeholder="Phone No" className="form-control mb-3" />
                                <textarea placeholder="Brief Bio" rows={4} className="form-control mb-3"></textarea>
                                <div className='contact-btn'>
                                    <button type="submit" className="btn text-white"
                                        style={{ background: "#FF7A00" }}>Send</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default GetInTouch
