import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { IMAGES } from '../constants/theme';
import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';

const WeightCalculator = () => {
    const [selectBtn, setSelectBtn] = useState('Male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate input
        if (!height || !weight) {
            alert('Please enter both height and weight.');
            return;
        }

        // Calculate BMI (kg/m²)
        const heightInMeters = height / 100;
        const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBmi(calculatedBmi);

        // Determine BMI category
        let bmiStatus = '';
        if (calculatedBmi < 18.5) bmiStatus = 'Underweight';
        else if (calculatedBmi >= 18.5 && calculatedBmi < 25) bmiStatus = 'Healthy';
        else if (calculatedBmi >= 25 && calculatedBmi < 30) bmiStatus = 'Overweight';
        else bmiStatus = 'Obese';

        setStatus(bmiStatus);
    };

    return (
        <div className="page-content bg-white">
            <PageTitle activePage="Weight Calculator" parentTitle="Pages" />
            <section
                className="content-inner overflow-hidden"
                style={{ backgroundImage: `url(${IMAGES.BgImage1})` }}
            >
                <div className="container">
                    <div className="row justify-content-between align-items-center m-b20">
                        <div className="col-lg-6">
                            <div className="section-head">
                                <h2 className="title">Body Mass Index</h2>
                                <p>
                                    Calculate your BMI and understand your body’s weight category instantly.
                                </p>
                            </div>
                            <form className="dzForm calculator-form p-r10" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label className="form-label text-primary">Height</label>
                                        <div className="input-group input-line">
                                            <input
                                                name="dzHeight"
                                                id="height"
                                                type="number"
                                                className="form-control"
                                                placeholder="Height / Cm"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label text-primary">Weight / Kg</label>
                                        <div className="input-group input-line">
                                            <input
                                                name="weight"
                                                id="weight"
                                                type="number"
                                                className="form-control"
                                                placeholder="Your Weight"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label text-primary">Age</label>
                                        <div className="input-group input-line">
                                            <input
                                                name="Age"
                                                id="age"
                                                type="number"
                                                className="form-control"
                                                placeholder="Age"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label text-primary">Gender</label>
                                        <div className="mb-4 mb-sm-0">
                                            <Dropdown className="select-dropdown style-1">
                                                <Dropdown.Toggle as="div" className="select-dropdown-toggle">
                                                    {selectBtn} <i className="fa-sharp fa-solid fa-caret-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="mt-2">
                                                    <Dropdown.Item onClick={() => setSelectBtn('Male')}>
                                                        Male
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSelectBtn('Female')}>
                                                        Female
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSelectBtn('Other')}>
                                                        Other
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <button
                                            name="submit"
                                            type="submit"
                                            className="btn btn-secondary btn-skew m-b30"
                                        >
                                            <span>Calculate BMI</span>
                                        </button>
                                    </div>

                                    {/* BMI Result */}
                                    {bmi && (
                                        <div className="col-sm-12">
                                            <div className="dzFormBmi text-center mt-3">
                                                <h4>Your BMI: {bmi}</h4>
                                                <p>Status: <strong>{status}</strong></p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-6 m-md-t40">
                            <div className="calculate-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>BMI</th>
                                            <th>Weight Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Below 18.5</td>
                                            <td>Underweight</td>
                                        </tr>
                                        <tr>
                                            <td>18.5 - 24.9</td>
                                            <td>Healthy</td>
                                        </tr>
                                        <tr>
                                            <td>25.0 - 29.9</td>
                                            <td>Overweight</td>
                                        </tr>
                                        <tr>
                                            <td>30.0 and above</td>
                                            <td>Obese</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="weight-info">
                                    <span>
                                        <b>BMR</b> Metabolic Rate / <b>BMI</b> Body Mass Index
                                    </span>
                                </div>
                            </div>
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
    );
};

export default WeightCalculator;
