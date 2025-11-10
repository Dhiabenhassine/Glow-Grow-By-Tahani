import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';
import BlogSidebar from '../elements/BlogSidebar';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';


const mediaBlog = [
    {image1: IMAGES.bloglarg1, image2: IMAGES.avatar1, author: "Jone Doe", title:"Learn About Fitness From These Mistakes In 60 Seconds.", date:"17 May 2023", },
    {image1: IMAGES.bloglarg2, image2: IMAGES.avatar2, author: "Frenchi", title:"Learn Truth About Fitness In The Next 60 Seconds.", date:"18 May 2023", },
    {image1: IMAGES.bloglarg5, image2: IMAGES.avatar3, author: "Bucher", title:"5 Things Everyone Gets Wrong About Fitness.", date:"22 May 2023", },
    {image1: IMAGES.bloglarg4, image2: IMAGES.avatar1, author: "Jemmy", title:"15 Hilarious Videos About Fitness.", date:"24 May 2023", },
];

const BlogLargeSidebar = () => {
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Blog Large Sidebar" parentTitle="Blog" />
                <section className="content-inner">
                    <div className="container">
                        <div className="row ">
                            <div className="col-xl-8 col-lg-8">
                                <div className="row">
                                    {mediaBlog.map((item, ind)=>(
                                        <div className="col-lg-12 m-b40" key={ind}>
                                            <div className="dz-card style-1 overlay-shine m-b40">
                                                <div className="dz-media">
                                                    <Link to={"/blog-details"}><img src={item.image1} alt="" /></Link>
                                                </div>
                                                <div className="dz-info">
                                                    <div className="dz-meta">
                                                        <ul>
                                                            <li className="post-author">
                                                                <Link to={"#"}>
                                                                    <img src={item.image2} alt="" /> {" "}
                                                                    <span>By {item.author}</span>
                                                                </Link>
                                                            </li>{" "}
                                                            <li className="post-date"><Link to={"#"}> {item.date}</Link></li>{" "}
                                                            <li className="post-comment"><Link to={"#"}>{1+ind} comment</Link></li>
                                                        </ul>
                                                    </div>
                                                    <h4 className="dz-title"><Link to={"/blog-details"}>{item.title}</Link></h4>
                                                    <p>Donec accumsan enim sit amet dolor rhoncus scelerisque. Suspendisse dictum, enim a interdum facilisis.</p>
                                                    <Link to={"/blog-details"} className="btn btn-primary btn-skew"><span>READ MORE</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-lg-12 m-b40">
                                        <nav aria-label="Blog Pagination">
                                            <ul className="pagination text-center m-t20">
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
                            <div className="col-xl-4 col-lg-4">
                                <BlogSidebar />
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
        </>
    );
};

export default BlogLargeSidebar;