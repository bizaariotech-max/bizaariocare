import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import langIcon from '../assets/images/icons/language.svg';
import Logo from '../assets/images/logo1.png';
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import '../assets/css/header.css'; // Use your css

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);

  const handleScroll = () => {
    setScrollDown(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm main-navbar ${scrollDown ? 'headerfix' : ''}`}
      id="mainNavbar"
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center brand" to="/">
          <img src={Logo} alt="Logo" className="me-4" />
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <AiOutlineMenu />}
        </button>

        {/* Menu Items */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="mx-auto navbar-nav">
            <li><NavLink to="/" className='nav-link' onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/about" className='nav-link' onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/partners" className='nav-link' onClick={closeMenu}>Hospital Partners</NavLink></li>
            <li><NavLink to="/medical-board" className='nav-link' onClick={closeMenu}>Medical Board</NavLink></li>
            <li><NavLink to="/news-articles" className='nav-link' onClick={closeMenu}>News & Articles</NavLink></li>
            <li><NavLink to="/contact" className='nav-link' onClick={closeMenu}>Contact Us</NavLink></li>
          </ul>

          {/* Right Side Buttons */}
          <div className="gap-2 mb-3 d-flex align-items-center mb-lg-0">
            {/* Language Selector */}
            <div className="dropdown">
              <button
                className="btn nav-btn-style dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={langIcon} alt="" className="me-2" /> English
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">English</a></li>
                <li><a className="dropdown-item" href="/">Hindi</a></li>
              </ul>
            </div>
            <a href="/signin"  rel="noopener noreferrer" className="btn nav-btn-style">Login</a>
            <Link to="/signup" className="btn nav-btn-style2">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
