import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import NewsLetter from "../elements/NewsLetter";
import PageTitle from "../elements/PageTitle";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const form = useRef();
console.log(form);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_hhqyjzp',  // <-- Your EmailJS Service ID
      'template_nqxufta',
        form.current, // Use ref instead of e.target
         'zHQsZKKxjjMZ0l8u5'
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          Swal.fire({
            title: "Good job!",
            text: "Form successfully submitted",
            icon: "success",
          });
          form.current.reset(); // Reset form after success
        },
        (error) => {
          console.log("Error:", error.text);
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
          });
        }
      );
  };

  return (
    <>
      <div className="page-content bg-white">
        <PageTitle activePage="Contact Us" parentTitle="Home" />
        <section className="content-inner-2 z-index-none">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-xl-5 m-sm-b30 m-xl-b0">
                <div className="contact-box">
                  <h3 className="contact-title">Contact Information</h3>
                  <p className="contact-text">
                    Fill up the form and our Team will get back to you within 24
                    hours.
                  </p>
                  <div className="widget widget_getintuch ">
                    <ul>
                      <li>
                        <i className="fa-solid fa-location-dot"></i>
                        <p>
                          832 Thompson Drive, San Francisco CA 94107, United
                          States
                        </p>
                      </li>
                      <li>
                        <i className="fa-solid fa-phone"></i>
                        <p>111-222-3333</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-envelope"></i>
                        <p>support@BodyShape.com</p>
                      </li>
                    </ul>
                  </div>
                  <h6 className="m-b15 text-white">Our Socials</h6>
                  <div className="dz-social-icon style-1 dark">
                    <ul>
                      <li>
                        <Link target="_blank" to="https://www.facebook.com/" rel="noreferrer">
                          <i className="fab fa-facebook-f" />
                        </Link>
                      </li>
                      <li>
                        <Link target="_blank" to="https://www.instagram.com/" rel="noreferrer">
                          <i className="fab fa-instagram" />
                        </Link>
                      </li>
                      <li>
                        <Link target="_blank" to="https://twitter.com/" rel="noreferrer">
                          <i className="fab fa-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link target="_blank" to="https://whatsapp.com/" rel="noreferrer">
                          <i className="fa-brands fa-whatsapp" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <svg width="250" height="70" viewBox="0 0 250 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 38L250 0L210 70L0 38Z" fill="url(#paint0_linear_306_1296)" />
                    <defs>
                      <linearGradient id="paint0_linear_306_1296" x1="118.877" y1="35.552" x2="250.365" y2="35.552" gradientUnits="userSpaceOnUse">
                        <stop offset="1" stopColor="var(--primary)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="col-md-6 col-xl-7">
                <form className="dz-form dzForm style-1" ref={form} onSubmit={sendEmail}>
                  <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
                  <input type="hidden" name="to_name" value="Glow & Glow Team" />
                  <input type="hidden" name="from_name" value="Contact Form" />
                  <div className="dzFormMsg"></div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-group input-line">
                        <input name="first_name" required type="text" className="form-control" placeholder="First Name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-group input-line">
                        <input name="last_name" required type="text" className="form-control" placeholder="Last Name" />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-group input-line">
                        <input name="email" required type="email" className="form-control" placeholder="Your Email Address" />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-group input-line">
                        <input name="phone" required type="text" className="form-control" placeholder="Phone" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="input-group input-line m-b30">
                        <textarea name="message" rows="5" required className="form-control" placeholder="Message..."></textarea>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <button name="submit" type="submit" value="Submit" className="btn btn-primary btn-lg btn-skew">
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <div className="container content-inner-1">
          <div className="map-iframe">
            <iframe
              title="myFrame"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28896.531392443423!2d75.81462525569334!3d25.133445080066668!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x537f208422eb8f28!2sW3ITEXPERTS%20-%20Software%20Development%20Company%20in%20kota!5e0!3m2!1sen!2sin!4v1669897446044!5m2!1sen!2sin"
              style={{ border: "0", marginBottom: "-7px", width: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <section className="call-action style-1 footer-action">
          <div className="container">
            <NewsLetter />
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
