import React from "react";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../constants/theme";

const Footer2 = () => {
  let update = new Date();
  return (
    <>
      <footer className="site-footer style-1 footer-action bg-dark">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-12">
                <div className="widget widget_about">
                  <div className="footer-logo  logo-white">
                    <Link >
                      <img
                        className="select_logo_white"
                        src={IMAGES.logoWhite}
                        alt=""
                      />
                    </Link>
                  </div>
                  <p>
                    A Wonderful Serenity Has Taken Possession Of My Entire Soul,
                    Like These.
                  </p>
                  <h6 className="m-b15">Our Socials</h6>
                  <div className="dz-social-icon style-1">
                    <ul>
                      <li>
                        <Link
                          target="_blank"
                          to="https://www.facebook.com/"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>{" "}
                      <li>
                        <Link
                          target="_blank"
                          to="https://twitter.com/?lang=en"
                          rel="noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>{" "}
                      <li>
                        <Link
                          target="_blank"
                          to="https://www.instagram.com/?hl=en"
                          rel="noreferrer"
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>{" "}
                      <li>
                        <Link
                          target="_blank"
                          to="https://www.whatsapp.com/"
                          rel="noreferrer"
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
             
              <div className="col-xl-3 col-md-4 wow fadeInUp">
                <div className="widget widget_locations">
                  <h4 className="footer-title">Locations</h4>
                  <div className="clearfix">
                    <h6>Washington</h6>
                    <p>1559 Alabama Ave SE, DC 20032, Washington, USA</p>
                    {SVGICON.map}
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
        {/* <!-- Footer Bottom Part --> */}
        <div className="container">
          <div className="footer-bottom">
            <div className="text-center">
              <span className="copyright-text">
                Copyright © {update.getFullYear()}{" "}
               
                . All rights reserved.
              </span>
            </div>
          </div>
        </div>
        <img
          className="svg-shape-1 rotate-360"
          src={IMAGES.footercircle}
          alt=""
        />
        <img
          className="svg-shape-2 rotate-360"
          src={IMAGES.footercircle}
          alt=""
        />
      </footer>
    </>
  );
};

export default Footer2;
