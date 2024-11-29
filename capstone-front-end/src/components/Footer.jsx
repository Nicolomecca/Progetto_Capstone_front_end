import { motion } from "framer-motion";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container-fluid">
        <div className="row py-5">
          {/* Logo e Slogan */}
          <div className="col-lg-3 mb-4">
            <div className="logo-container">
              <div className="footer-logo-wrapper mb-3">
                <div className="footer-logo-circle">
                  <span className="footer-code-symbol">&lt;/&gt;</span>
                </div>
              </div>
              <h3 className="text-white mb-2">Universal Code</h3>
              <p className="text-purple mb-0">
                Learn how.
                <br />
                <span className="text-purple-light">Learn always.</span>
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-3 mb-4">
            <h5 className="text-white mb-4">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#about">About us</a></li>
              <li><a href="#values">Values</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#technologies">Technologies</a></li>
              <li><a href="#people">People</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#jobs">Jobs</a></li>
              <li><a href="#compliance">Compliance</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-lg-3 mb-4">
            <h5 className="text-white mb-4">Follow us</h5>
            <ul className="list-unstyled">
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#medium">Medium</a></li>
              <li><a href="#glassdoor">Glassdoor</a></li>
              <li><a href="#x">X</a></li>
              <li><a href="#facebook">Facebook</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-lg-3 mb-4">
            <h5 className="text-white mb-4">Help</h5>
            <div className="support-section">
              <p className="text-muted mb-2">For support</p>
              <a href="#support" className="text-white">Support center</a>
            </div>
            <div className="media-section mt-4">
              <p className="text-muted mb-2">For media inquiries</p>
              <a href="mailto:press@universalcode.com" className="text-white">press@universalcode.com</a>
              <br />
              <a href="#media-kit" className="text-white">Download media kit</a>
            </div>
            <div className="contact-section mt-4">
              <p className="text-muted mb-2">To get in touch</p>
              <a href="mailto:hello@universalcode.com" className="text-white">hello@universalcode.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;