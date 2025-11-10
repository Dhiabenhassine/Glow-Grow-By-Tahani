import React from 'react';
import {Accordion} from 'react-bootstrap';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';

const accordBlog = [

    {
        content : [
            {
                title : "Pellentesque commodo nec tellus amet tincidunt ?"
            },
            {
                title : "Etiam nec lacus sit amet mi facilisis sodales ?"
            },
            {
                title : "Nunc blandit ac diam sit amet commodo ?"
            },
            {
                title : "Nullam auctor sapien magna, luctus risus feugiat ?"
            },
            {
                title : "Aliquam cursus lectus lacinia rhoncus imperdiet ?"
            },
        ],
    },
    {
        content : [
            {
                title : "Phasellus viverra urna tincidunt orci laoreet ?"
            },
            {
                title : "Donec venenatis, mi eu pretium molestie ?"
            },
            {
                title : "Phasellus fermentum ullamcorper scelerisque ?"
            },
            {
                title : "Cras viverra volutpat vehicula ?"
            },
            {
                title : "Proin magna est, rutrum vitae magna et, blandit ?"
            },
        ],
    }

];

const Faq = () => {
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Faq" parentTitle="Pages" />
                <section className="content-inner-1 overflow-hidden">
                    <div className="container">
                        <div className="row">                            
                            {accordBlog.map((data, index)=>{
                                return(
                                    <div className="col-lg-6" key={index}>
                                        <Accordion className="dz-accordion dz-accordion-skew" id="accordionFaq2" defaultActiveKey={0}>
                                            {data.content.map((item, index)=>(
                                                <Accordion.Item className="accordion-item" key={index} eventKey={index}>
                                                    <Accordion.Header as="h2"  id="headingOne1">
                                                        {item.title}
                                                        <span className="toggle-close"></span>
                                                    </Accordion.Header>
                                                    <div id="collapseOne1" className="accordion-collapse " eventKey={index}>
                                                        <Accordion.Body >
                                                            <p className="m-b0">
                                                                Vestibulum nibh risus, lobortis in neque eleifend, varius vulputate sem. Donec maximus, sapien id auctor ornare, odio mi luctus massa, id rhoncus velit purus eu turpis onec aliquet mauris est.
                                                            </p>
                                                        </Accordion.Body>
                                                    </div>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion> 
                                    </div>
                                )
                            })}
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

export default Faq;