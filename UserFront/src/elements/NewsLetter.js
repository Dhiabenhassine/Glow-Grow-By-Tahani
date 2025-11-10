import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const NewsLetter = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('gmail', 'YOUR_TEMPLATE_ID', e.target, process.env.APP_MAILCHIMP_API_KEY)
      .then((result) => console.log(result.text))
      .catch((error) => console.log(error.text));
    e.target.reset();
    Swal.fire({
      title: 'Good job!',
      text: 'Form successfully submitted',
      icon: 'success',
    });
  };

  return (
    <div >
      <form ref={form} onSubmit={sendEmail}>
    <div className="container">
            <div className="inner-content wow fadeInUp" data-wow-delay="0.8s">
              <div className="row justify-content-between align-items-center">
                <div className="text-center text-lg-start col-xl-6 m-lg-b20">
                  <h2 className="title">Subscribe To Our Newsletter</h2>
                  <p>
                    It is a long established fact that a reader will distracted.
                  </p>
                </div>
                <div className="text-center text-lg-end col-xl-6">
                  <form
                    className="dzSubscribe"
                    action="assets/script/mailchamp.php"
                    method="post"
                  >
                    <div className="dzSubscribeMsg"></div>
                    <div className="form-group mb-0">
                      <div className="input-group mb-0">
                        <div className="input-skew ">
                          <input
                            name="dzEmail"
                            required="required"
                            type="email"
                            className="form-control"
                            placeholder="Your Email Address"
                          />
                        </div>
                        <div className="input-group-addon">
                          <button
                            name="submit"
                            value="Submit"
                            type="submit"
                            onClick={(e) => e.preventDefault()}
                            className="btn btn-secondary btn-lg btn-skew"
                          >
                            <span>Subscribe Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </form>
    </div>
  );
};

export default NewsLetter;
