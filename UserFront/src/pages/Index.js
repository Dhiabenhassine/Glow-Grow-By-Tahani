import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";


//layouts
import Header, { Mainheader } from "./../layouts/Header";
import Footer from "./../layouts/Footer";
import Footer2 from "../layouts/Footer2";
import ScrollToTop from "./../layouts/ScrollToTop";


//Pages
import AboutUs from "./AboutUs";
import Team from "./Team";
import Pricing from "./Pricing";
import Faq from "./Faq";
import Schedule from "./Schedule";
import ErrorPage from "./ErrorPage";
import UnderConstruction from "./Profile";
import Categogies from "./Categogies";
import CategoryDetails from "./CategoryDetails";
import Services from "./Services";
import ServicesDetails from "./ServicesDetails";
import BlogGrid from "./BlogGrid";
import BlogLargeSidebar from "./BlogLargeSidebar";
import BlogListSidebar from "./BlogListSidebar";
import BlogDetail from "./BlogDetail";
import Appointment from "./Appointment";
import WeightCalculator from "./WeightCalculator";
import ContactUs from "./ContactUs";
import Home2 from "./Home2";
import Header2 from "../layouts/Header2";
import Home3 from "./Home3";
import Login2 from "../pages/login2"

function Index() {
  //var baseName = "/";
  const scrollTopBtn = useRef(null);

  window.onscroll = () => {
    window.scrollY > 650
      ? scrollTopBtn.current.setAttribute("style", "display:block")
      : scrollTopBtn.current.setAttribute("style", "display:none");
  };
  return (
    <BrowserRouter
    // basename={baseName}
     >
      <Routes>
        <Route path="/error-404" exact element={<ErrorPage />} />
        <Route path="/Profile" exact element={<UnderConstruction />}/>
        <Route path="/appointment" exact element={<Appointment />} />
        <Route path="/login" exact element={<Login2 />} />
        <Route element={<MainLayout />}>
          <Route path="/" exact element={<Home2 />} />
          <Route path="/about-us" exact element={<AboutUs />} />
          <Route path="/team" exact element={<Team />} />
          <Route path="/faq" exact element={<Faq />} />
          <Route path="/pricing" exact element={<Pricing />} />
          <Route path="/schedule" exact element={<Schedule />} />
          <Route path="/Packages" exact element={<Categogies />} />
          <Route
            path="/Packages-details/:id"
            exact
            element={<CategoryDetails />}
          />
          <Route path="/services" exact element={<Services />} />
          <Route path="/services-details" exact element={<ServicesDetails />} />
          <Route path="/blog-grid" exact element={<BlogGrid />} />
          <Route
            path="/blog-large-sidebar"
            exact
            element={<BlogLargeSidebar />}
          />
          <Route
            path="/blog-list-sidebar"
            exact
            element={<BlogListSidebar />}
          />
          <Route path="/blog-details" exact element={<BlogDetail />} />
          <Route
            path="/weight-calculator"
            exact
            element={<WeightCalculator />}
          />
          <Route path="/contact-us" exact element={<ContactUs />} />
        </Route>
        <Route element={<MainLayout2 />}>
          <Route path="/home-2" exact element={<Home2 />} />
        </Route>
        <Route element={<MainLayout3 />}>
          <Route path="/home-3" exact element={<Home3 />} />
        </Route>
      </Routes>
      {/* <Switcher /> */}
      <ScrollToTop />
      <button
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        ref={scrollTopBtn}
        className="scroltop icon-up"
        type="button"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <div className="page-wraper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
function MainLayout2() {
  return (
    <div className="page-wraper">
      <Header2 />
      <Outlet />
      <Footer2 />
    </div>
  );
}
function MainLayout3() {
  const [headerFix, setheaderFix] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);
  return (
    <div className="page-wraper">
      <header className="site-header mo-left header header-transparent style-1">
        <div
          className={`sticky-header mt-3 main-bar-wraper navbar-expand-lg ${
            headerFix ? "is-fixed" : ""
          }`}
        >
          <Mainheader />
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Index;
