import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';


const logoBlog = [
    {logo: IMAGES.logo1},
    {logo: IMAGES.logo2},
    {logo: IMAGES.logo3}
];

const iconDropBlog = [
    {title : "Best Hand Workout", id:'icon1'},
    {title : "Best Knee Workout", id:'icon2'},
    {title : "Best Leg Workout", id:'icon3'},
];

const MainBanner = ({isOpenModal}) => {
    const [iconTitle,setIconTitle] = useState();
    return (
        <>
            <div className="banner-inner" style={{backgroundImage: "url("+ IMAGES.SliderBg1 +")"}}>
                <h2 className="data-text">
                    <span>F</span>
                    <span>I</span>
                    <span>T</span>
                    <span>N</span>
                    <span>E</span>
                    <span>S</span>
                    <span>S</span>
                </h2>
                <div className="container">
                    <div className="row banner-row">
                        <div className="col-lg-6 col-md-7 col-sm-8">
                            <div className="banner-content">
                                <div className="top-content">
                                    <h1 className="title" >We Stay Fit With Our <span className="text-primary">Best Coach</span></h1>
                                    <p >Whether your aim is to loose weight, tone up, gain weight we can put together a gym programme or recommend the right classes for you to attend in our studios.</p>
                                    <div className="d-flex align-items-center">
                                        <Link to={"/about-us"} className="btn btn-skew btn-lg btn-primary shadow-primary"><span>Get Started</span></Link>
                                        <div className="video-bx4">
                                            <Link to={"#"} className="video-btn style-1 popup-youtube" 
                                                onClick={()=> isOpenModal(true)} >
                                                <i className="fa fa-play"/>{" "}
                                                <span className="text">Play Video</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-content">
                                    <h4 className="partner-title" data-wow-delay="0.8s">Our Partner</h4>
                                    <div className="row">
                                        {logoBlog.map((data,ind)=>(
                                            <div className="col-4" key={ind}>
                                                <div className="clients-logo">
                                                    <img src={data.logo} alt="" />
                                                </div>
                                            </div>	
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5 col-sm-4">
                            <div className="banner-media media1 anm wow fadeInRight" data-wow-delay="1s" data-speed-x="-2" data-speed-scale="-1">
                                <img src={IMAGES.sliderpic1} className="main-img" alt="" />
                                <ul className="point-list">
                                    {iconDropBlog.map((item, ind)=>(
                                        <li 
                                            className={`icon-dropdown anm ${item.id === iconTitle ? 'show' : ''}`} 
                                            data-speed-x="-1" data-speed-scale="-1"
                                            onClick={()=>{
                                                setIconTitle(item.id)
                                                if(item.id===iconTitle){
                                                    setIconTitle('')
                                                }                                                        
                                            }}
                                            key={ind}
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                            <span>{item.title}</span>
                                        </li>
                                    ))}
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default MainBanner;