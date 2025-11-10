import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import { IMAGES } from '../constants/theme';

const FitnessGoal = ({ isOpenModal }) => {
    return (
        <>
            <div className="col-lg-6 about-content m-b30">
                                  <div className="text-center mt-4">
  <Link
    to="/packages"
    className="btn btn-skew btn-xl btn-dark shadow-lg start-btn"
  >
    <span>START NOW!</span>
  </Link>
</div>
                <div className="section-head m-0 text-start">
                    <span className="sub-title">ABOUT US</span>
                    <h2 className="title">
                        We Help You Reach Your <span>Fitness Goals</span>
                    </h2>
                    <p className="m-0">
                        We’re an independent gym committed to working with you to achieve real, lasting results. 
                        Whether your goal is to lose weight, tone up, build muscle, or improve your overall fitness, 
                        we’ll create a customized plan that fits your needs and keeps you motivated.
                    </p>
                </div>

                <div className="m-t30" data-wow-delay="0.8s">
                    <Tab.Container defaultActiveKey="Mission">
                        <Nav as="ul" className="nav nav-tabs style-1 m-b20">
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="Mission">
                                    <span>Our Mission</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav-item">
                                <Nav.Link className="nav-link" eventKey="Vision">
                                    <span>Our Vision</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="tab-content m-sm-b30 m-b40 p-r30" id="myTabContent">
                            <Tab.Pane eventKey="Mission">
                                <div className="content">
                                    <p>
                                        Our mission is to empower every member to live a healthier, stronger, 
                                        and more confident life. We believe in personalized guidance, 
                                        a positive environment, and continuous support to help you 
                                        reach your full potential—both inside and outside the gym.
                                    </p>
                                </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="Vision">
                                <div className="content">
                                    <p>
                                        Our vision is to be the community’s most trusted fitness hub where 
                                        everyone, regardless of experience or background, feels inspired, 
                                        supported, and driven to achieve their goals through consistent effort 
                                        and professional coaching.
                                    </p>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>


                </div>

                <div className="contact-us">
                    <span className="icon">
                        <i className="fa-solid fa-phone"></i>
                    </span>
                    <div className="content">
                        <span>Call us for help</span>
                        <h4 className="number">12 452 1505</h4>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 m-b30">
                <div className="dz-media">
                    <div className="image-box">
                        <div className="video-bx1 h-auto w-auto overflow-visible">
                            <img src={IMAGES.boxpic1} alt="Workout demonstration" />
                            <div className="video-btn sm">
                                <Link
                                    to="#"
                                    className="popup-youtube"
                                    onClick={() => isOpenModal(true)}
                                >
                                    <i className="fa fa-play" />
                                </Link>
                            </div>
                        </div>
                        <div className="info-box">
                            <span>
                                <i className="flaticon-play text-primary"></i> High-Quality Training Videos
                            </span>
                        </div>
                    </div>

                    <div className="image-box">
                        <img src={IMAGES.boxpic2} alt="Trainer guidance" />
                        <div className="info-box">
                            <span>
                                <i className="flaticon-athletics text-primary"></i> Professional Trainers
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FitnessGoal;
