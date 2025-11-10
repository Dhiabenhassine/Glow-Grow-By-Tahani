import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.min.css';
import { IMAGES } from '../constants/theme';
import BlogGridSlider from '../elements/BlogGridSlider';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';

const cardBlog = [
    {image1: IMAGES.bloggrid1, image2: IMAGES.avatar1, author: "Jone Doe", title:"How to keep your Body.", date:"17 May 2023", },
    {image1: IMAGES.bloggrid2, image2: IMAGES.avatar2, author: "Frenchi", title:"Best 50 Tips For Fitness.", date:"18 May 2023", },
    {image1: IMAGES.bloggrid3, image2: IMAGES.avatar3, author: "Bucher", title:"The Philosophy Of Fitness.", date:"22 May 2023", },
    {image1: IMAGES.bloggrid4, image2: IMAGES.avatar1, author: "Jemmy", title:"Fitness Strategies For Beginners.", date:"24 May 2023", },
];
const cardBlog2 = [
    {image1: IMAGES.bloggrid6, image2: IMAGES.avatar1, author: "Atrin", title:"14 Days To A Better Fitness.", date:"17 May 2023", },
    {image1: IMAGES.bloggrid7, image2: IMAGES.avatar2, author: "Deep", title:"3 Ways Create Better Fitness.", date:"16 May 2023", },
    {image1: IMAGES.bloggrid8, image2: IMAGES.avatar3, author: "Noare", title:"What Can You Do About Fitness.", date:"22 May 2023", },
];

const BlogGrid = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Blog Grid" parentTitle="Blog" />    
                <section className="content-inner">
                    <div className="container">
                        <div className="row">
                            {cardBlog.map((data, index)=>(
                                <div className="col-md-6 col-xl-4 m-b30" key={index}>
                                    <div className="dz-card style-1 overlay-shine">
                                        <div className="dz-media">
                                            <Link to={"/blog-details"}><img src={data.image1} alt="" /></Link>
                                        </div>
                                        <div className="dz-info">
                                            <div className="dz-meta">
                                                <ul>
                                                    <li className="post-author">
                                                        <Link to={"#"}>
                                                            <img src={data.image2} alt="" />{" "} 
                                                            <span>By {data.author}</span>
                                                        </Link>
                                                    </li>{" "}
                                                    <li className="post-date"><Link to={"#"}> {data.date}</Link></li>
                                                </ul>
                                            </div>
                                            <h4 className="dz-title"><Link to={"/blog-details"}>{data.title}</Link></h4>
                                            <p>A wonderful serenity has taken of my entire soul, like these.</p>
                                            <Link to={"/blog-details"} className="btn btn-primary btn-skew"><span>Read More</span></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-md-6 col-xl-4 m-b30">
                                <div className="dz-card style-1 overlay-shine ">
                                    <div className="dz-media video-bx2 h-auto">
                                        <Link to={"/blog-details"}><img src={IMAGES.bloggrid5} alt="" /></Link>
                                        <div className="video-btn sm">
                                            <Link to={"#"} className="popup-youtube" 
                                                onClick={()=> setOpen(true)} >
                                                <i className="fa fa-play"/>                                                
                                            </Link>

                                        </div>
                                    </div>
                                    <div className="dz-info">
                                        <div className="dz-meta">
                                            <ul>
                                                <li className="post-author">
                                                    <Link to={"#"}>
                                                        <img src={IMAGES.avatar3} alt="" />{" "}
                                                        <span>By uvee</span>
                                                    </Link>
                                                </li>{" "}
                                                <li className="post-date"><Link to={"#"}> 25 May 2023</Link></li>
                                            </ul>
                                        </div>
                                        <h4 className="dz-title"><Link to={"/blog-details"}>Easy Ways To Make Fitness Faster.</Link></h4>
                                        <p>A wonderful serenity has taken of my entire soul, like these.</p>
                                        <Link to={"/blog-details"} className="btn btn-primary btn-skew"><span>Read More</span></Link>
                                    </div>
                                </div>
                            </div>
                            {cardBlog2.map((data, index)=>(
                                <div className="col-md-6 col-xl-4 m-b30" key={index}>
                                    <div className="dz-card style-1 overlay-shine">
                                        <div className="dz-media">
                                            <Link to={"/blog-details"}><img src={data.image1} alt="" /></Link>
                                        </div>
                                        <div className="dz-info">
                                            <div className="dz-meta">
                                                <ul>
                                                    <li className="post-author">
                                                        <Link to={"#"}>
                                                            <img src={data.image2} alt="" />{" "}
                                                            <span>By {data.author}</span>
                                                        </Link>
                                                    </li>{" "}
                                                    <li className="post-date"><Link to={"#"}>{data.date}</Link></li>
                                                </ul>
                                            </div>
                                            <h4 className="dz-title"><Link to={"/blog-details"}>{data.title}</Link></h4>
                                            <p>A wonderful serenity has taken of my entire soul, like these.</p>
                                            <Link to={"/blog-details"} className="btn btn-primary btn-skew"><span>Read More</span></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-md-6 col-xl-4 m-b30">
                                <div className="dz-card overlay-shine style-1 m-b40 ">                                   
                                    <BlogGridSlider />
                                    <div className="dz-info">
                                        <div className="dz-meta">
                                            <ul>
                                                <li className="post-author">
                                                    <Link to={"#"}>
                                                        <img src={IMAGES.avatar1} alt="" /> 
                                                        <span>By Robot</span>
                                                    </Link>
                                                </li>{" "}
                                                <li className="post-date"><Link to={"#"}> 14 May 2023</Link></li>
                                            </ul>
                                        </div>
                                        <h4 className="dz-title"><Link to={"/blog-details"}>Workout Exercises for Fat Loss.</Link></h4>
                                        <p>A wonderful serenity has taken of my entire soul, like these.</p>
                                        <Link to={"/blog-details"} className="btn btn-primary btn-skew"><span>Read More</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">		
                            <div className="col-xl-12 col-lg-12">		
                                <nav aria-label="Blog Pagination">
                                    <ul className="pagination text-center m-b30 m-t50 m-lg-t10">
                                        <li className="page-item"><Link to={"#"} className="page-link prev"><i className="fas fa-chevron-left"></i></Link></li>
                                        <li className="page-item"><Link to={"#"} className="page-link active"><span>1</span></Link></li>
                                        <li className="page-item"><Link to={"#"} className="page-link"><span>2</span></Link></li>
                                        <li className="page-item"><Link to={"#"} className="page-link"><span>3</span></Link></li>
                                        <li className="page-item"><Link to={"#"} className="page-link"><span>4</span></Link></li>
                                        <li className="page-item"><Link to={"#"} className="page-link next"><i className="fas fa-chevron-right"></i></Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>	
                    </div>
                </section>
                <section className="call-action style-1 footer-action">
			        <div className="container">
                        <NewsLetter />
                    </div>
                </section>
            </div>   
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="X_9VoqR5ojM" onClose={() => setOpen(false)} />
        </>
    );
};

export default BlogGrid;