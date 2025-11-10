import React, { useState } from 'react';
import {Link} from 'react-router-dom';
//import ClientSlider from '../components/ClientSlider';
import { IMAGES
  //  , SVGICON 
} from '../constants/theme';
//import LatestSlider from '../elements/LatestSlider';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
//import WorkoutSlider from '../elements/WorkoutSlider';

const  wrapperBlog = [
    {title:"Right Nutrition", image:IMAGES.boxlog1},
    {title:"Health & Fitness", image:IMAGES.boxlog2},
    {title:"Gym & Exercise", image:IMAGES.boxlog3},
    {title:"Health Motivation", image:IMAGES.boxlog4},
    {title:"Healthy Heart", image:IMAGES.boxlog5},
    {title:"Smoothie & Juice", image:IMAGES.boxlog6},
];

const Services = () => {
    const [hover, setHover] = useState(0);
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Services" parentTitle="Services" />
                <section className="content-inner overflow-hidden" style={{backgroundImage: "url("+ IMAGES.BgImage1 +")"}}>
                    <div className="container">
                        <div className="row">
                            {wrapperBlog.map((item, index)=>(
                                <div className="col-xl-4 col-md-6 m-b30" key={index}>
                                    <div class={`icon-bx-wraper style-1 box-hover ${hover === index ? 'active' : ''}`}
                                        onMouseEnter={()=>setHover(index)}
                                    >
                                        <div className="icon-bx m-b30"> 
                                            <span className="icon-cell">
                                                <img src={item.image} alt="" />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dz-title m-b10"><Link to={"#"}>{item.title}</Link></h5>
                                            <p className="m-b25">Aliquam sit amet volutpat sem, eget aliquet odio. Integer lobortis sed.</p>
                                            <Link to={"/services-details"} className="btn btn-primary shadow-primary btn-skew"><span>Read More</span></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>    
                    </div>
                </section>
              {/*  <section className="content-inner portfolio-wrapper">
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
                </section>*/}
               {/* <section className="content-inner-1 testimonial-wrapper1" data-text="FEEDBACK" style={{backgroundImage: "url("+ IMAGES.BgImage2 +")", backgroundPosition: "center"}}>
                    <div className="container">
                        <div className="section-head text-center">
                            <h5 className="sub-title">TESTIMONIAL</h5>
                            <h2 className="title">What Client Say’s</h2>
                        </div>
                        <ClientSlider />

                    </div>
                    <div className="avatar1"><img src={IMAGES.avatarlarge1} alt=""/></div>
                    <div className="avatar2"><img src={IMAGES.avatarlarge2} alt=""/></div>
                    <div className="avatar3"><img src={IMAGES.avatar3} alt=""/></div>
                    <div className="avatar4"><img src={IMAGES.avatarlarge1} alt=""/></div>
                    <div className="avatar5"><img src={IMAGES.avatarlarge2} alt=""/></div>
                    <div className="avatar6"><img src={IMAGES.avatar3} alt=""/></div>
                    <img className="svg-shape rotate-360" src={SVGICON.circlebigSvg1} alt=""/>
                    <img className="svg-shape-2 rotate-360" src={SVGICON.circlebigSvg2} alt=""/>
                </section>  */}
               {/* <section className="content-inner-1 overflow-hidden" style={{backgroundImage: "url("+ IMAGES.BgImage1 +")"}}>
                    <LatestSlider />
                </section>  */}
                <section className="call-action style-1 footer-action">
			        <div className="container">
                        <NewsLetter />
                    </div>
                </section>
            </div>   
        </>
    );
};

export default Services;