import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';

const categoryBlog = [
    {title:'Business(10)'},
    {title:'Case Study (13)'},
    {title:'Insights (9)'},
    {title:'World (3)'},
    {title:'Tax Solutions (12)'},
    {title:'Creative (6)'},
];
const widegtBlog = [
    {images: IMAGES.recentblog1, title:"How To Teach Fitness Like A Pro.", date:"17 May, 2023"},
    {images: IMAGES.recentblog2, title:"Quick and Easy Fix For Your Fitness.", date:"07 Jan, 2023"},
    {images: IMAGES.recentblog3, title:"Things That Make You Love Fitness.", date:"25 Aug, 2023"},
];

const tagesBlog = [
    {tagename:"Business"},
    {tagename:"Corporate"},
    {tagename:"Blog"},
    {tagename:"Marketing"},
    {tagename:"Creative"},
    {tagename:"Web"},
    {tagename:"Workers"},
    {tagename:"Modern"},
];

const BlogSidebar = () => {
    return (
        <>
            <aside className="side-bar sticky-top right">
                <div className="widget">
                    <div className="widget-title">
                        <h4 className="title">Search</h4>
                    </div>
                    <div className="search-bx">
                        <form role="search" method="post">
                            <div className="input-group">
                                <div className="input-skew">
                                    <input name="text" className="form-control" placeholder="Search.." type="text" />
                                </div>
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-primary sharp radius-no"><i className="fa-solid fa-magnifying-glass scale3"></i></button>
                                </span> 
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="widget widget_categories">
                    <div className="widget-title">
                        <h4 className="title">Categories</h4>
                    </div>
                    <ul>
                        {categoryBlog.map((item, ind)=>(
                            <li className="cat-item" key={ind}><Link to={"#"}>{item.title}</Link></li>
                        ))}
                    </ul>
                </div>
                
                <div className="widget recent-posts-entry">
                    <div className="widget-title">
                        <h4 className="title">Recent Post</h4>                        
                    </div>
                    <div className="widget-post-bx">
                        {widegtBlog.map((item,index)=>(
                            <div className="widget-post clearfix" key={index}>
                                <div className="dz-media"> 
                                    <img src={item.images} alt="" />
                                </div>
                                <div className="dz-info">
                                    <h6 className="title"><Link to={"/blog-details"}>{item.title}</Link></h6>
                                    <div className="dz-meta">
                                        <ul>
                                            <li className="post-date"><Link to={"#"}> {item.date}</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}                        
                    </div>
                </div>
                
                <div className="widget widget_tag_cloud">
                    <div className="widget-title">
                        <h4 className="title">Popular Tags</h4>
                    </div>
                    <div className="tagcloud"> 
                        {tagesBlog.map((item, i)=>(
                            <Link to={"#"} key={i}><span>{item.tagename}</span></Link>
                        ))}                        
                    </div>
                </div>
            </aside>   
        </>
    );
};

export default BlogSidebar;