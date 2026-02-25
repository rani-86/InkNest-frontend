import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h4>InkNest</h4>
          <p>Your one-stop solution for beautiful printing.</p>
        </div>
        <div>
          <h4>Connect with us</h4>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <br />
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: contact@inknest.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Location: Jamshedpur, India</p>
        </div>
      </div>
      <p className="footer-bottom">&copy; {new Date().getFullYear()} InkNest. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
