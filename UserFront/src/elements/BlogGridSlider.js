import React from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay,  Navigation } from "swiper";
import { IMAGES } from '../constants/theme';


const ImageBlog = [
    {image: IMAGES.bloggrid1},
    {image: IMAGES.bloggrid2},
    {image: IMAGES.bloggrid3},
];

export default function BlogGridSlider(){
    const navigationPrevRef = React.useRef(null)
	const navigationNextRef = React.useRef(null)
    return(
        <>
            <div className="dz-media">
                <Swiper className=" post-swiper"
                    speed= {1500}
                    parallax= {true}
                    slidesPerView= {1}
                    spaceBetween= {0}
                    loop={true}
                    autoplay= {{
                        delay: 2700,
                    }}
                    navigation = {{
                        nextEl: '.btn-next',
                        prevEl: '.btn-prev',
                    }}
                    // navigation={{
                    //     prevEl: navigationPrevRef.current,
                    //     nextEl: navigationNextRef.current,
                    // }}				
                    // onSwiper={(swiper) => {                        
                    //     setTimeout(() => {                        
                    //         swiper.params.navigation.prevEl = navigationPrevRef.current
                    //         swiper.params.navigation.nextEl = navigationNextRef.current        
                    //         swiper.navigation.destroy()
                    //         swiper.navigation.init()
                    //         swiper.navigation.update()
                    //     })
                    // }} 
                    modules={[Navigation , Autoplay]}
                >
                        {ImageBlog.map((data, index)=>(
                        <SwiperSlide className="swiper-slide" key={index}>                           
                            <Link to={'./blog-details'} ><img src={data.image} alt="" /></Link>
                        </SwiperSlide>                        
                    ))}
                    
                    <div className="prev-post-swiper-btn" ref={navigationPrevRef}><i className="fas fa-chevron-left"></i></div>
                    <div className="next-post-swiper-btn" ref={navigationNextRef}><i className="fas fa-chevron-right"></i></div>
                </Swiper>
            </div>
                
           
        </>
    )
}