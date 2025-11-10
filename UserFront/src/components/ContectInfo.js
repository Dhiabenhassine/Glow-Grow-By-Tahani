import React, { useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const socialIcons = [
  {
    icon: "fa-solid fa-location-dot",
    text: " 832 Thompson Drive, San Fransisco CA 94107, United States",
  },
  {
    icon: "fa-solid fa-phone",
    text: "394-091-3312",
  },
  {
    icon: "fa-solid fa-envelope",
    text: "Our Socials",
  },
];
const socialIcons2 = [
  { icon: "fab fa-facebook-f", link: "https://www.facebook.com/" },
  { icon: "fab fa-instagram", link: "https://www.instagram.com/" },
  { icon: "fab fa-twitter", link: "https://twitter.com/" },
  { icon: "fa-brands fa-whatsapp", link: "https://whatsapp.com/" },
];
const ContectInfo = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    //emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
    emailjs
      .sendForm(
        "service_gfykn6i",
        "template_iy1pb0b",
        e.target,
        "HccoOtZS6GHw-N-m6"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    // swal("Good job!", "form successfuly submmited", "success");
    Swal.fire({
      title: "Good job!",
      text: "form successfuly submmited",
      icon: "success"
    });
  };
  return (
    <>
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12  col-xl-5 contact-box2">
          <div className="m-b60 col-10">
            <div className="section-head style-1 wow fadeInUp">
              <h2 className="title m-0">
                Contact <span>Info</span>
              </h2>
              <p className="m-t10">
                Fill up the form and our Team will get back to you within 24
                hours.
              </p>
            </div>
            <div className="widget widget_getintuch m-0 wow fadeInUp">
              <ul>
                {socialIcons.map((item, ind1) => (
                  <li key={ind1}>
                    <i className={item.icon}></i>
                    <p className="text-dark">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <h6 className="m-b15  wow fadeInUp">Our Socials</h6>
            <div className="dz-social-icon style-1  wow fadeInUp">
              <ul>
                {socialIcons2.map((item, ind2) => (
                  <li key={ind2}>
                    <Link
                      target="_blank"
                      className={item.icon}
                      to={item.link}
                    ></Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="widget widget_working style-2 mb-4 mb-lg-0 bg-dark wow fadeInUp">
            <ul>
            
            
              <li>
                <Link
                  className="btn btn-primary rounded-0 btn-skew"
                  to="/schedule"
                >
                  <span> More Here</span>{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-xl-7 wow fadeInUp">
          <form
            className="dz-form dzForm style-2 bg-primary position-relative form-bottom"
            method="POST"
            ref={form}
            onSubmit={sendEmail}
          >
            <div className="dzFormMsg"></div>
            <input
              type="hidden"
              className="form-control"
              name="dzToDo"
              value="Contact"
            />
            <input
              type="hidden"
              className="form-control"
              name="reCaptchaEnable"
              value="0"
            />
            <div className="form-head">
              <h2 className="title m-0">Write Us A Message</h2>
              <p className="max-w400 m-t10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse.
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 m-t25 m-sm-t20">
                <div className="input-area">
                  <label>Full Name</label>
                  <div className="input-group input-line">
                    <input
                      name="dzFirstName"
                      required
                      type="text"
                      className="form-control"
                      placeholder="Marchelo Queque"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 m-t25 m-sm-t20">
                <div className="input-area">
                  <label>Email Address</label>
                  <div className="input-group input-line">
                    <input
                      name="dzEmail"
                      required
                      type="text"
                      className="form-control"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 m-t25 m-sm-t20">
                <div className="input-area">
                  <label>Phone Number</label>
                  <div className="input-group input-line">
                    <input
                      name="dzPhoneNumber"
                      required
                      type="number"
                      className="form-control"
                      placeholder="987 654 3210"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-t25 m-sm-t20">
                <div className="input-area">
                  <label>Company Name</label>
                  <div className="input-group input-line">
                    <input
                      name="dzLastName"
                      required
                      type="text"
                      className="form-control"
                      placeholder="Web Studios"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 m-t25 m-sm-t20">
                <div className="input-area">
                  <label>Message...</label>
                  <div className="input-group input-line">
                    <textarea
                      name="dzMessage"
                      rows="5"
                      required
                      className="form-control"
                      placeholder="Dear Sir/Madam"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="d-sm-flex justify-content-between align-items-center">
                  <div className="form-check m-xs-b20">
                    <input
                      className="form-check-input m-r15"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Accept terms & conditions
                    </label>
                  </div>
                  <div className="col-xl-5 col-lg-3 col-sm-4 text-sm-end">
                    <button
                      name="submit"
                      type="submit"
                      value="Submit"
                      className="btn btn-light btn-skew"
                    >
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContectInfo;
