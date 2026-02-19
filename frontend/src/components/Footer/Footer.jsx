import { assets } from "../../assets/assets";
import "./Footer.css";
import { MdOutgoingMail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaFacebookF, FaTelegramPlane, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Footer = () => {

  const openEmail = (e) => {
    e.preventDefault();
    const email = "technoyon06@gmail.com";

    // Check if user is on Mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      // Open Gmail Web in new tab for Desktop
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        "_blank"
      );
    }
  };

  // Detect device and open Telegram accordingly
  const openTelegram = (e) => {
    e.preventDefault();
    const phone = "8801575615274";

    // Check if user is on Mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Open Telegram App
      window.location.href = `tg://resolve?phone=${phone}`;
    } else {
      // Open Telegram Web in new tab for Desktop
      window.open(`https://web.telegram.org/`, "_blank");
    }
  };

  // Detect device and open WhatsApp accordingly
  const openWhatsApp = (e) => {
    e.preventDefault();
    const phone = "8801760623769";

    // Check if user is on Mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Open WhatsApp App
      window.location.href = `whatsapp://send?phone=${phone}`;
    } else {
      // Open WhatsApp Web in new tab for Desktop
      window.open(`https://web.whatsapp.com/send?phone=${phone}`, "_blank");
    }
  };

  return (
    <div className="footer" id="footer">
      <hr />
      <div className="footer-content">
        {/* Left - Logo & Description */}
        <div className="footer-content-left">
          {/* <a href="#top">
            <img
              src={assets.logo_hat}
              className="logo"
              alt="Heat & Treat Logo"
            />
          </a> */}
          <div className="logo-text-footer">
            TECH <span>NOYON</span>
          </div>

          <p>
            Your time is your most valuable asset. That’s why I combine precision repairs with the latest tech and a genuine handshake, ensuring you leave with a device that works and a connection you can trust.
          </p>
          <div className="footer-social-icons">
            <a
              className="fb"
              href="https://www.facebook.com/md.noyon.327201#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              className="loc"
              href="https://share.google/GeB3SvJNXeRm921uQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrMapLocation />
            </a>
          </div>
        </div>

        {/* Center - Quick Links */}
        <div className="footer-content-center">
          <h2>Quick <span>Links</span></h2>
          <ul>
            <li id="top">
              <a href="#top">Home</a>
            </li>
            <li id="explore-menu">
              <a href="#explore-menu">Menu</a>
            </li>
            <li id="footer">
              <a href="#footer">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Right - Contact Info */}
        <div className="footer-content-right">
          <h2>Contact <span>Us</span></h2>
          <ul>
            {/* <li>
              <MdOutgoingMail className="icon gmail" />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=tastecode.1525@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                tastecode.1525@gmail.com
              </a>
            </li> */}
            <li>
              <MdOutgoingMail className="icon gmail" />
              <a href="#" onClick={openEmail}>
                technoyon06@gmail.com
              </a>
            </li>
            <li>
              <FaPhoneAlt className="icon phone" />
              <a href="tel:+8801575615274">+880 1575-615274</a>
            </li>
            <li>
              <FaTelegramPlane className="icon tele" />
              <a href="#" onClick={openTelegram}>
                +880 1575-615274
              </a>
            </li>
            <li>
              <FaWhatsapp className="icon whatsapp" />
              <a href="#" onClick={openWhatsApp}>
                +880 1575-615274
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        Copyright © 2026 <strong>Tech Noyon</strong> - All Rights Reserved |
        <span className="made-with">
          {" "}
          <strong>Made With Fire & Coffee</strong>
        </span>
      </p>
    </div>
  );
};

export default Footer;
