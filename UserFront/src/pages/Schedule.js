import React from 'react';

import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import ScheduleTable from '../elements/ScheduleTable';

const Schedule = () => {
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Schedule" parentTitle="Pages" />    
                <div className="content-inner-1">
                    <div className="container">
                        <div className="schedule-table table-responsive">
                            <ScheduleTable />
                        </div>
                    </div>
                </div>
                <section className="call-action style-1 footer-action">
			        <div className="container">
                        <NewsLetter />
                    </div>
                </section>
            </div>   
        </>
    );
};

export default Schedule;