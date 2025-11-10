import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../constants/theme';

const PageTitle = ({parentTitle}) => {
    return (
        <>
            <div className="dz-bnr-inr style-1 text-center" data-text="FITNESS" style={{backgroundImage: "url("+IMAGES.BgBanner2 +")"}}>
                <div className="container">
                    <div className="dz-bnr-inr-entry">
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link >{parentTitle}</Link></li>{" "}
                            </ul>
                        </nav>
                        
                    </div>
                </div>
            </div>
          
        </>
    );
};

export default PageTitle;