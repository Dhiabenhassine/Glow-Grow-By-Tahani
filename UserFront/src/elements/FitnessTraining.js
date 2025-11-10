import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';

const DzMedia = ({Image}) =>{
    return(
        <div className="col-xl-3 col-md-6">
            <div className="dz-media">
                <img src={Image} alt="" />
            </div>
        </div>
    )
}

const DzInfo1 = ({title, subtitle}) =>{
    return(
        <div className="col-xl-3 col-md-6">
            <div className="dz-info bg-secondary">
                <div className="clearfix text-white">
                    <span className="text-primary subtitle">{title}</span>
                    <h4 className="title text-white">{subtitle}</h4>
                    <p>Join our community of motivated individuals who support each other in achieving their fitness dreams.</p>
                    <Link to={"/services-details"} className="btn btn-primary btn-skew"><span>Read More</span></Link>
                </div>
            </div>
        </div>        
    )
}
const DzInfo2 = ({title, subtitle}) =>{
    return(
        <div className="col-xl-3 col-md-6">
            <div className="dz-info bg-primary">
                <div className="clearfix theme-text-color">
                    <span className="subtitle">{title}</span>
                    <h4 className="title theme-text-color">{subtitle}</h4>
                    <p>We teach you sustainable habits that last a lifetime.</p>
                    <Link to={"/services-details"} className="btn btn-secondary btn-skew"><span>Read More</span></Link>
                </div>
            </div>
        </div>
    )
}
const DzInfo3 = ({title, subtitle}) =>{
    return(
        <div className="col-xl-3 col-md-6">
            <div className="dz-info bg-secondary">
                <div className="clearfix text-white">
                    <span className="text-primary subtitle">{title}</span>
                    <h4 className="title text-white">{subtitle}</h4>
                    <p>Our approach ensures you gain quality muscle mass, not just empty calories.</p>
                    <Link to={"/services-details"} className="btn btn-primary btn-skew"><span>Read More</span></Link>
                </div>
            </div>
        </div>        
    )
}
const DzInfo4 = ({title, subtitle}) =>{
    return(
        <div className="col-xl-3 col-md-6">
            <div className="dz-info bg-primary">
                <div className="clearfix theme-text-color">
                    <span className="subtitle">{title}</span>
                    <h4 className="title theme-text-color">{subtitle}</h4>
                    <p>Get personalized support, accountability, and expert advice.</p>
                    <Link to={"/services-details"} className="btn btn-secondary btn-skew"><span>Read More</span></Link>
                </div>
            </div>
        </div>
    )
}
const FitnessTraining = () => {
    return (
        <>
            <div className="row g-0">
                <DzInfo1 title="BODY SHAPE" subtitle="MOTIVATION" />
                <DzMedia  Image = {IMAGES.bloggrid1 } />
                <DzMedia  Image = {IMAGES.bloggrid4 } />
                <DzInfo2 title="RELAX PROGRAM" subtitle="FAT LOSS"/>
                <DzInfo4 title="CARDIO WORKFLOW" subtitle="PERSONAL COACHING"/>
                <DzMedia  Image = {IMAGES.bloggrid2 } />
                <DzMedia  Image = {IMAGES.bloggrid6 } />                
                <DzInfo3 title="POWER-PRO" subtitle="WEIGHT GAIN" />
            </div>  
        </>
    );
};

export default FitnessTraining;