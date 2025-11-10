"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { IMAGES } from "../constants/theme"
import NewsLetter from "../elements/NewsLetter"
import PageTitle from "../elements/PageTitle"

const serviceContent = {
  Motivation: {
    title: "Motivation & Mental Strength",
    mainImage: IMAGES.bloglarg1,
    description:
      "We believe that mental strength is just as important as physical strength. Our motivation programs are designed to help you overcome mental barriers and achieve your fitness goals with the right mindset.",
    detailText:
      "Our expert coaches will work with you to develop a positive mindset, set achievable goals, and maintain consistency. We provide personalized motivation strategies, goal-setting workshops, and mental coaching sessions to keep you inspired throughout your fitness journey.",
    sectionTitle: "Benefits of Our Motivation Program",
    benefits: [
      "Personalized goal-setting sessions with expert coaches",
      "Weekly motivation workshops and group support",
      "Mental strength training and mindfulness techniques",
    ],
    additionalInfo:
      "Join our community of motivated individuals who support each other in achieving their fitness dreams. Our motivation program has helped thousands of members stay committed and reach their goals.",
    ctaTitle: "Ready to Transform Your Mindset?",
    ctaText:
      "Start your journey with our motivation program and discover the mental strength you need to succeed in your fitness goals.",
    sideImage: IMAGES.bloggrid1,
  },
  Workout: {
    title: "Professional Workout Programs",
    mainImage: IMAGES.bloglarg2,
    description:
      "Our workout programs are designed by certified trainers to help you achieve maximum results. Whether you're a beginner or advanced athlete, we have the perfect program for you.",
    detailText:
      "We offer a variety of workout styles including strength training, cardio, HIIT, functional fitness, and more. Each program is tailored to your fitness level and goals, ensuring safe and effective progress.",
    sectionTitle: "What Makes Our Workouts Special",
    benefits: [
      "Customized workout plans based on your fitness level",
      "Access to state-of-the-art equipment and facilities",
      "Expert guidance from certified personal trainers",
    ],
    additionalInfo:
      "Our workout programs are constantly updated with the latest fitness science and techniques. We track your progress and adjust your program to ensure continuous improvement and prevent plateaus.",
    ctaTitle: "Start Your Workout Journey",
    ctaText:
      "Join our workout programs and experience the difference that professional training can make in your fitness journey.",
    sideImage: IMAGES.bloggrid2,
  },
  "Online Courses": {
    title: "Comprehensive Online Fitness Courses",
    mainImage: IMAGES.bloglarg3,
    description:
      "Access world-class fitness education from anywhere. Our online courses cover everything from basic fitness principles to advanced training techniques, nutrition, and wellness.",
    detailText:
      "Learn at your own pace with our extensive library of video courses, downloadable resources, and interactive content. Each course is taught by industry experts with years of experience in fitness and wellness.",
    sectionTitle: "Course Features",
    benefits: [
      "24/7 access to comprehensive video lessons and materials",
      "Certification programs recognized by fitness industry",
      "Interactive quizzes and practical assignments",
    ],
    additionalInfo:
      "Our online courses are perfect for fitness enthusiasts, aspiring trainers, or anyone looking to deepen their knowledge. Get lifetime access to course materials and updates.",
    ctaTitle: "Enroll in Online Courses",
    ctaText:
      "Expand your fitness knowledge with our expert-led online courses. Start learning today and take your fitness expertise to the next level.",
    sideImage: IMAGES.bloggrid3,
  },
  "Fat Loss": {
    title: "Effective Fat Loss Programs",
    mainImage: IMAGES.bloglarg4,
    description:
      "Achieve sustainable fat loss with our scientifically-backed programs. We focus on healthy, long-term results through proper nutrition, exercise, and lifestyle changes.",
    detailText:
      "Our fat loss programs combine cardio training, strength building, and nutritional guidance to help you burn fat while preserving muscle mass. We teach you sustainable habits that last a lifetime.",
    sectionTitle: "Fat Loss Program Benefits",
    benefits: [
      "Personalized meal plans and nutrition coaching",
      "Metabolic testing and body composition analysis",
      "Proven workout routines designed for fat burning",
    ],
    additionalInfo:
      "We don't believe in quick fixes or fad diets. Our approach focuses on creating a caloric deficit through smart nutrition and effective exercise while maintaining your energy and health.",
    ctaTitle: "Begin Your Fat Loss Journey",
    ctaText:
      "Transform your body with our proven fat loss programs. Get the support and guidance you need to achieve lasting results.",
    sideImage: IMAGES.bloggrid4,
  },
  "Perfect Diet": {
    title: "Customized Nutrition & Diet Plans",
    mainImage: IMAGES.bloglarg5,
    description:
      "Nutrition is the foundation of fitness success. Our registered dietitians create personalized meal plans that align with your goals, preferences, and lifestyle.",
    detailText:
      "We believe there's no one-size-fits-all diet. Our nutrition experts work with you to develop a sustainable eating plan that you can maintain long-term while achieving your fitness goals.",
    sectionTitle: "Nutrition Services",
    benefits: [
      "One-on-one consultations with registered dietitians",
      "Customized meal plans with recipes and shopping lists",
      "Ongoing support and plan adjustments as needed",
    ],
    additionalInfo:
      "Our diet plans consider your food preferences, allergies, budget, and schedule. We teach you how to make healthy choices and develop a positive relationship with food.",
    ctaTitle: "Get Your Perfect Diet Plan",
    ctaText: "Fuel your body right with a personalized nutrition plan. Start eating better and feeling better today.",
    sideImage: IMAGES.bloggrid5,
  },
  "Health Coach": {
    title: "Personal Health Coaching",
    mainImage: IMAGES.bloglarg6,
    description:
      "Work one-on-one with a dedicated health coach who will guide you through every aspect of your wellness journey. Get personalized support, accountability, and expert advice.",
    detailText:
      "Our certified health coaches provide comprehensive support covering fitness, nutrition, stress management, sleep optimization, and lifestyle habits. They're your partner in achieving total wellness.",
    sectionTitle: "Health Coaching Benefits",
    benefits: [
      "Weekly one-on-one coaching sessions and check-ins",
      "Holistic approach covering all aspects of wellness",
      "Accountability and motivation to keep you on track",
    ],
    additionalInfo:
      "Health coaching goes beyond just exercise and diet. We help you develop sustainable habits, overcome obstacles, and create a balanced lifestyle that supports your long-term health and happiness.",
    ctaTitle: "Work With a Health Coach",
    ctaText: "Get the personalized guidance and support you need to transform your health. Connect with a coach today.",
    sideImage: IMAGES.bloggrid6,
  },
  "Weight Gain": {
    title: "Healthy Weight Gain Programs",
    mainImage: IMAGES.bloglarg7,
    description:
      "Build muscle and gain weight the healthy way. Our weight gain programs focus on proper nutrition and strength training to help you add quality mass and build a stronger physique.",
    detailText:
      "Whether you're naturally thin, recovering from illness, or looking to build muscle mass, our programs provide the structure and support you need to gain weight safely and effectively.",
    sectionTitle: "Weight Gain Program Features",
    benefits: [
      "High-calorie meal plans designed for muscle growth",
      "Strength training programs focused on mass building",
      "Supplement guidance and nutritional support",
    ],
    additionalInfo:
      "We help you create a caloric surplus through nutrient-dense foods and effective resistance training. Our approach ensures you gain quality muscle mass, not just empty calories.",
    ctaTitle: "Start Building Mass",
    ctaText:
      "Transform your physique with our weight gain programs. Get the nutrition and training plan you need to build muscle and strength.",
    sideImage: IMAGES.bloggrid7,
  },
}

const ServicesDetails = () => {
  const [activeService, setActiveService] = useState("Motivation")

  const services = [
    "Motivation",
    "Workout",
    "Online Courses",
    "Fat Loss",
    "Perfect Diet",
    "Health Coach",
    "Weight Gain",
  ]

  const currentContent = serviceContent[activeService]

  return (
    <>
      <div className="page-content bg-white">
        <PageTitle activePage="Service Details" parentTitle="Services" />
        <div className="content-inner " style={{ backgroundImage: "url(" + IMAGES.BgImage1 + ")" }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7 order-lg-1">
                <div className="dz-media m-b30">
                  <img src={currentContent.mainImage || "/placeholder.svg"} alt={currentContent.title} />
                </div>
                <div className="dz-content">
                  <div className="m-b40">
                    <h2 className="title m-b15">{currentContent.title}</h2>
                    <p>{currentContent.description}</p>
                    <p>{currentContent.detailText}</p>
                  </div>

                  <div className="m-b40">
                    <h4 className="m-b15">{currentContent.sectionTitle}</h4>
                    <ul className="list-check-2 m-b30">
                      {currentContent.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <p>{currentContent.additionalInfo}</p>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-xl-6 m-b30">
                      <h4 className="m-b10">{currentContent.ctaTitle}</h4>
                      <p className="m-b0">{currentContent.ctaText}</p>
                    </div>
                    <div className="col-xl-6 m-b30">
                      <div className="dz-media">
                        <img src={currentContent.sideImage || "/placeholder.svg"} className="img-cover" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 m-b30">
                <aside className="side-bar left sticky-top">
                  <div className="widget service_menu_nav">
                    <ul>
                      {services.map((service) => (
                        <li key={service} className={activeService === service ? "active" : ""}>
                          <Link
                            to={"#"}
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveService(service)
                            }}
                          >
                            {service}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <svg width="250" height="70" viewBox="0 0 250 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 38L250 0L210 70L0 38Z" fill="url(#paint0_linear_306_1296)"></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_306_1296"
                          x1="118.877"
                          y1="35.552"
                          x2="250.365"
                          y2="35.552"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="1" stopColor="var(--primary)"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="widget_contact ">
                    <div className="widget-content">
                      <div className="icon-bx">
                        <i className="flaticon-contact-center"></i>
                      </div>
                      <h4>Do you need any help?</h4>
                      <div className="phone-number">+91 12345 678 98</div>
                      <h6 className="email">info@dexignzone.com</h6>
                      <div className="link-btn">
                        <Link to={"/contact-us"} className="btn btn-dark btn-skew">
                          <span>Contact Us</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
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
  )
}

export default ServicesDetails
