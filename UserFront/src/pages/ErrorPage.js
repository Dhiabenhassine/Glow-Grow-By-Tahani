import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';
import Header from '../layouts/Header';

const ErrorPage = () => {
    return (
        <>
            <div className="page-wraper">
                <Header />
                <div className="page-content bg-white">		
                    <section className="error-page" data-text="ERROR" style={{backgroundImage: "url("+ IMAGES.BgAppoint+")"}}>
                        <div className="container">
                            <div className="inner-content text-center" data-text="">
                                <div className="dz_error">404</div>
                                <h2 className="error-head">We are sorry. But the page you are looking for cannot be found.</h2>
                                <Link to={"/"} className="btn btn-primary btn-skew"><span>BACK TO HOMEPAGE</span></Link>
                            </div>
                        </div>
                    </section>
                
                </div>
                <footer className="site-footer style-1 bg-img-fix footer-action" id="footer">
                    <div className="footer-bottom">
                        <div className="text-center"> 
                            <span className="copyright-text">Copyright © 2023 <Link to="https://themeforest.net/user/hugebinary" target="_blank" rel="noreferrer">DexignZone</Link>. All rights reserved.</span> 
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default ErrorPage;