import React from 'react';
import FitnessGoal from '../components/FitnessGoal';
import { IMAGES } from '../constants/theme';
import FitnessTraining from '../elements/FitnessTraining';
import LatestSlider from '../elements/LatestSlider';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import WorkoutSlider from '../elements/WorkoutSlider';

const AboutUs = () => {
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="About Us" parentTitle="Pages" /> 
                <section className="content-inner" style={{backgroundImage: "url("+ IMAGES.BgImage1 +")"}}>
			        <div className="container">
				        <div className="row about-bx2 align-items-center">
                            <FitnessGoal />        
                        </div>   
                    </div>
                </section>
                <section className="clearfix">
			        <div className="fitness-classes">
                        <FitnessTraining />
                    </div>
                </section>
               
                <section className="content-inner portfolio-wrapper">
                    <div className="portfolio-wrapper-inner">
                        <div className="container-fluid  p-0">
                            <WorkoutSlider />
                        </div>
                    </div>
                    <svg className="shape-up" width="635" height="107" viewBox="0 0 635 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M577 0L-16 107L635 45L577 0Z" fill="var(--primary-dark)"/>
                    </svg>
                    <svg className="shape-down" width="673" height="109" viewBox="0 0 673 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M682 0L0 56L682 109V0Z" fill="var(--primary)"/>
                    </svg>
                </section>
                <section className="content-inner-1 overflow-hidden" style={{backgroundImage: "url("+IMAGES.BgImage1 +")"}}>			        
                    <LatestSlider />
                </section>
                <section className="call-action style-1 footer-action">
			        <div className="container">
                        <NewsLetter />
                    </div>
                </section>
            </div>   
        </>
    );
};

export default AboutUs;