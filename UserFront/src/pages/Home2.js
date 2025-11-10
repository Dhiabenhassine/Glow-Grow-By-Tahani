import React, { useEffect, useState } from "react";
import Home2Banner from "../components/Home2Banner";
import Counter from "../components/Counter";
import AboutServices from "../components/AboutServices";
import { IMAGES } from "../constants/theme";
import OurServices from "../components/OurServices";
import VideoBox from "../elements/VideoBox";
import Gallery from "../components/Gallery";
import ModalVideo from "react-modal-video";
//import Testimonial from "../components/Testimonial";
//import OurBlog from "../components/OurBlog";
//import Clients from "../elements/Clients";
import { useLocation } from "react-router-dom";

const Home2 = () => {
  const body = document.querySelector("body");  
  body.setAttribute("data-theme-color", 'color_2'); 
  const [open, setOpen] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    localStorage.setItem("theme", "color_2");
    localStorage.setItem("themeInd", 1);
  }, [location]);
  return (
    <>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={open}
        videoId="X_9VoqR5ojM"
        onClose={() => setOpen(false)}
      />
      <div className="page-content bg-white">
        <div className="main-bnr-three">
          <Home2Banner open={setOpen} />
        </div>
        <section className="section">
          <Counter />
        </section>
        <section className="about-bx4 content-inner-2">
          <div className="container">
            <AboutServices />
          </div>
        </section>
        <section
          className="content-inner-2 service-wrapper1"
          style={{
            backgroundImage: `url(${IMAGES.BgImage8})`,
            backgroundSize: ` 100%`,
            backgroundRepeat: " no-repeat",
          }}
        >
          <div className="container">
            <div className="row align-items-end">
              <OurServices />
            </div>
          </div>
        </section>
        <section
          className="content-inner-1 video-bx6 overlay-black-dark bg-img-fix"
          style={{
            backgroundImage: `url(${IMAGES.BackgroundBg1})`,
            backgroundSize: " cover",
          }}
        >
          <div className="container">
            <VideoBox open={setOpen} />
          </div>
        </section>
        <section
          className="content-inner overflow-hidden"
          style={{
            backgroundImage: ` url(${IMAGES.BgImage12})`,
            backgroundSize: " 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <Gallery />
          </div>
        </section>
       {/* <section
          className="content-inner-1 overflow-hidden testimonial-wrapper1"
          data-text="FEEDBACK"
          style={{
            backgroundImage: `url(${IMAGES.BgImage13})`,
            backgroundPosition: " center",
            backgroundRepeat: " no-repeat",
          }}
        >
          <div className="container">
            <div className="section-head style-1 text-center">
              <h5 className="sub-title wow fadeInUp">TESTIMONIAL</h5>
              <h2 className="title wow fadeInUp">
                What <span> Client </span> Say’s
              </h2>
            </div>
            <Testimonial />
          </div>
        </section> */}
        <section
          className="content-inner-2 overflow-hidden"
          style={{
            backgroundImage: `url(${IMAGES.BgImage1})`,
            backgroundRepeat: "no-repeat",
          }}
        >
        {/*  <div className="container">
            <div className="section-head style-1 text-center">
              <h2 className="title">
                Latest <span className="text-primary">News Feed</span>
              </h2>
            </div>
            <OurBlog />
          </div>*/}
        </section>
     {/*   <div className="half-shape-top-w theme-bg content-inner-1 ">
          <div className="container">
            <div className="clients-box">
              <Clients />
            </div>
          </div>
        </div>*/}
        <section className="call-action style-1 footer-action">
          <div className="container">
            <div className="inner-content wow fadeInUp" data-wow-delay="0.8s">
              <div className="row justify-content-between align-items-center">
                <div className="text-center text-lg-start col-xl-6 m-lg-b20">
                  <h2 className="title">Subscribe To Our Newsletter</h2>
                  <p>
                    It is a long established fact that a reader will distracted.
                  </p>
                </div>
                <div className="text-center text-lg-end col-xl-6">
                  <form
                    className="dzSubscribe"
                    action="assets/script/mailchamp.php"
                    method="post"
                  >
                    <div className="dzSubscribeMsg"></div>
                    <div className="form-group mb-0">
                      <div className="input-group mb-0">
                        <div className="input-skew ">
                          <input
                            name="dzEmail"
                            required="required"
                            type="email"
                            className="form-control"
                            placeholder="Your Email Address"
                          />
                        </div>
                        <div className="input-group-addon">
                          <button
                            name="submit"
                            value="Submit"
                            type="submit"
                            onClick={(e) => e.preventDefault()}
                            className="btn btn-secondary btn-lg btn-skew"
                          >
                            <span>Subscribe Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home2;
