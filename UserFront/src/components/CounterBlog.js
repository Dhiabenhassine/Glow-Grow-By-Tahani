
import React from 'react';
import CountUp from 'react-countup';

const counterData = [
    {number: "987", title:"Happy Clients", styleChange:"col-6"},
    {number: "845", title:"Cup Of Coffee", styleChange:"col-6"},
    {number: "789", title:"Online Sessions Done", styleChange:"col-12"},
];

const CounterBlog = () => {
    return (
        <>
            {counterData.map((item, ind)=>(
                <div className={`col-sm-4 m-b30 ${item.styleChange}`} key={ind}>                
                    <div className="counter-box">
                        <h3 className="title counter">
                            <CountUp end={item.number} duration={3}/>    
                        </h3>
                        <p>{item.title}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CounterBlog;