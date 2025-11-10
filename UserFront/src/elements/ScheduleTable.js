import React from 'react';
import {Link} from 'react-router-dom';

const ScheduleTable = () => {
    return (
        <>
            <table className="table-responsive-md ck-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="row_1">
                        <td className="event-time"> 06:00 - 07:00 </td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title">Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title">Crossfit Class</Link>
                            <span className="subtitle">Madison Fren</span>
                            <div className="event-tag">Hit Training</div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="event" rowspan="4">
                            <Link to={"#"} className="title">Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                    </tr>
                    <tr className="row_2">
                        <td className="event-time"> 07:00 - 08:00 </td>
                        <td className="event" rowspan="3">
                            <Link to={"#"} className="title">Power Lifting</Link>
                            <span className="subtitle">Joe Bell</span>
                            <div className="event-tag">Strenght</div>
                        </td>
                        <td></td>
                        <td className="event" rowspan="3">
                            <Link to={"#"} className="title">Power Lifting</Link>
                            <span className="subtitle">Joe Bell</span>
                            <div className="event-tag">Strenght</div>
                        </td>
                        <td className="event">
                            <Link to={"#"} className="title">Cardio Burn</Link>
                            <span className="subtitle">Anna Simms Jr.</span>
                            <div className="event-tag">Aerobic</div>
                        </td>
                    </tr>
                    <tr className="row_3">
                        <td className="event-time"> 08:00 - 09:00 </td>
                        <td></td>
                        <td className="event" rowspan="4">
                            <Link to={"#"} className="title" >Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="row_4">
                        <td className="event-time"> 09:00 - 10:00 </td>
                        <td></td>
                        <td className="event" rowspan="6">
                            <Link to={"#"} className="title" >Crossfit Class</Link>
                            <span className="subtitle">Madison Fren</span>
                            <div className="event-tag">Hit Training</div>
                        </td>
                        <td></td>
                    </tr>
                    <tr className="row_5">
                        <td className="event-time"> 10:00 - 11:00 </td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title" >Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                        <td></td>
                        <td className="event">
                            <Link to={"#"} className="title">Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title">Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                        <td></td>
                    </tr>
                    <tr className="row_6">
                        <td className="event-time"> 11:00 - 12:00 </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="row_7">
                        <td className="event-time"> 12:00 - 13:00 </td>
                        <td className="event">
                            <Link to={"#"} className="title" >Power Lifting</Link>
                            <span className="subtitle">Joe Bell</span>
                            <div className="event-tag">Strength</div>
                        </td>
                        <td></td>
                        <td className="event">
                            <Link to={"#"} className="title" >Cardio Burn</Link>
                            <span className="subtitle">Anna Simms Jr.</span>
                            <div className="event-tag">Aerobic</div>
                        </td>
                        <td className="event">
                            <Link to={"#"} className="title">Crossfit Class</Link>
                            <span className="subtitle">Madison Fren</span>
                            <div className="event-tag">Hit Training</div>
                        </td>
                        <td className="event">
                            <Link to={"#"} className="title" >Crossfit Class</Link>
                            <span className="subtitle">Madison Fren</span>
                            <div className="event-tag">Hit Training</div>
                        </td>
                        <td></td>
                    </tr>
                    <tr className="row_8">
                        <td className="event-time"> 13:00 - 14:00 </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="row_9">
                        <td className="event-time"> 14:00 - 15:00 </td>
                        <td></td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title">Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title">Open Gym</Link>
                            <div className="event-tag">Gym</div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="row_10">
                        <td className="event-time"> 15:00 - 16:00 </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="row_11">
                        <td className="event-time"> 18:00 - 19:00 </td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title" >Crossfit Class</Link>
                            <span className="subtitle">Madison Fren</span>
                            <div className="event-tag">Hit Training</div>
                        </td>
                        <td className="event" rowspan="2">
                            <Link to={"#"} className="title">Power Lifting</Link>
                            <span className="subtitle">Joe Bell</span>
                            <div className="event-tag">Strength</div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="row_12">
                        <td className="event-time"> 19:00 - 20:00 </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="row_13">
                        <td className="event-time"> 20:00 - 21:00 </td>
                        <td className="event">
                            <Link to={"#"} className="title">Cardio Burn</Link>
                            <span className="subtitle">Anna Simms Jr.</span>
                            <div className="event-tag">Aerobic</div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="event">
                            <Link to={"#"} className="title" >Cardio Burn</Link>
                            <span className="subtitle">Anna Simms Jr.</span>
                            <div className="event-tag">Aerobic</div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default ScheduleTable;