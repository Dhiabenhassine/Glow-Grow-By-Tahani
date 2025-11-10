import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';

const boxWrapper = [
    {image: IMAGES.boxlog1, title:"Right Nutrition"},
    {image: IMAGES.boxlog2, title:"Health & Fitness"},
    {image: IMAGES.boxlog3, title:"Gym & Exercise"},
    {image: IMAGES.boxlog4, title:"Health Motivation"},
];

const FitnessIdeas = () => {
    const [hoverBox , setHoverBox] = useState(0);
    return (
        <>
            <div className="row">
                {boxWrapper.map((item, index)=>(
                    <div className="col-xl-3 col-md-6 m-b30" key={index}>
                        <div className={`icon-bx-wraper style-1 box-hover ${ index === hoverBox ? 'active' : ''}`} 
                            onMouseEnter={()=>setHoverBox(index)}
                        >
                            <div className="icon-bx m-b30"> 
                                <span className="icon-cell">
                                    <img src={item.image} alt=""/>
                                </span>
                            </div>
                            <div className="icon-content">
                                <h5 className="dz-title m-b10"><Link to={"/services-details"}>{item.title}</Link></h5>
                                <p className="m-b25">Aliquam sit amet volutpat sem, eget aliquet odio. Integer lobortis sed.</p>
                                <Link to={"/services-details"} className="btn btn-primary shadow-primary btn-skew"><span>Read More</span></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
        </>
    );
};

export default FitnessIdeas;