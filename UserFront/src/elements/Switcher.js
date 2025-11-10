import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { IMAGES } from "./../constants/theme";

const logo1 = require("./../assets/images/logo.png");
const logoWhite1 = require("./../assets/images/logo-white.png");
const logo2 = require("./../assets/images/logo-2.png");
const logoWhite2 = require("./../assets/images/logo-white-2.png");
const logo3 = require("./../assets/images/logo-3.png");
const logoWhite3 = require("./../assets/images/logo-white-3.png");
const logo4 = require("./../assets/images/logo-4.png");
const logoWhite4 = require("./../assets/images/logo-white-4.png");
const logo5 = require("./../assets/images/logo-5.png");
const logoWhite5 = require("./../assets/images/logo-white-5.png");
const logo6 = require("./../assets/images/logo-6.png");
const logoWhite6 = require("./../assets/images/logo-white-6.png");
const logo7 = require("./../assets/images/logo-7.png");
const logoWhite7 = require("./../assets/images/logo-white-7.png");
// const logo8 = require('./../assets/images/logo-8.png');
// const logoWhite8 = require('./../assets/images/logo-white-8.png');
// const logo9 = require('./../assets/images/logo-9.png');
// const logoWhite9 = require('./../assets/images/logo-white-9.png');

const initialState = false;
const reducer = (state, action) => {
  if (action.type === "openswitcher") {
    return { ...state, openswitcher: !state.openswitcher };
  }

  return state;
};

const bgColorBlog = [
  {
    colorValue: "#ff8139",
    style: "1",
    bgimage1: IMAGES.smallbgimg1,
    bgimage2: IMAGES.largebgimg1,
    patterimage1: IMAGES.smallpattern1,
    patterimage2: IMAGES.largepattern1,
  },
  {
    colorValue: "#ffcc00",
    style: "2",
    bgimage1: IMAGES.smallbgimg2,
    bgimage2: IMAGES.largebgimg2,
    patterimage1: IMAGES.smallpattern2,
    patterimage2: IMAGES.largepattern2,
  },
  {
    colorValue: "#06c6d1",
    style: "3",
    bgimage1: IMAGES.smallbgimg3,
    bgimage2: IMAGES.largebgimg3,
    patterimage1: IMAGES.smallpattern3,
    patterimage2: IMAGES.largepattern3,
  },
  {
    colorValue: "#b8c724",
    style: "4",
    bgimage1: IMAGES.smallbgimg4,
    bgimage2: IMAGES.largebgimg4,
    patterimage1: IMAGES.smallpattern4,
    patterimage2: IMAGES.largepattern4,
  },
  {
    colorValue: "#f7244f",
    style: "5",
    bgimage1: IMAGES.smallbgimg5,
    bgimage2: IMAGES.largebgimg5,
    patterimage1: IMAGES.smallpattern5,
    patterimage2: IMAGES.largepattern5,
  },
  {
    colorValue: "#b65fbd",
    style: "6",
    bgimage1: IMAGES.smallbgimg6,
    bgimage2: IMAGES.largebgimg6,
    patterimage1: IMAGES.smallpattern6,
    patterimage2: IMAGES.largepattern6,
  },
  {
    colorValue: "#977fff",
    style: "7",
    bgimage1: IMAGES.smallbgimg7,
    bgimage2: IMAGES.largebgimg7,
    patterimage1: IMAGES.smallpattern7,
    patterimage2: IMAGES.largepattern7,
  },
];

function Switcher() {
  const [changeColor, setChangeColor] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateVal, setStateVal] = useState(false);
  const Location = useLocation();
  //   const [addTheme, setTheme] = useState("");

  function handleChangeTheme(version) {
    var thememode = document.body.classList;
    var navUl = [].slice.call(document.querySelectorAll(".main-theme-version"));
    navUl.forEach((el) => el.classList.remove("active"));
    document.getElementsByClassName(version)[0].classList.add("active");
    if (version === "light-theme") {
      thememode.remove("layout-dark");
      thememode.add("layout-light");
    } else if (version === "dark-theme") {
      thememode.remove("layout-light");
      thememode.add("layout-dark");
    }
  }

  function HeaderPostion(postion, ind) {
    var headermode =
      document.getElementsByClassName("main-bar-wraper")[0].classList;
    var navUl = [].slice.call(
      document.querySelectorAll(".switcher-header-layout-btn")
    );
    navUl.forEach((el) => el.classList.remove("active"));
    document.getElementsByClassName(postion)[0].classList.add("active");
    // if(postion === 'header-fixed'){
    // 	headermode.remove('sticky-header');
    // 	headermode.add('sticky-no');
    // }else if(postion === 'header-static'){
    // 	headermode.remove('sticky-no');
    // 	headermode.add('sticky-header');
    // }
    if (postion === "header-fixed") {
      headermode.remove("sticky-no");
      headermode.add("sticky-header");
    } else if (postion === "header-static") {
      headermode.remove("sticky-header");
      headermode.add("sticky-no");
    }
    HeaderCookie(postion, ind);
  }

  function ChnageDirectionRtl(direction) {
    const directionChnage = document.getElementsByTagName("html");
    var switcherdirection = [].slice.call(
      document.querySelectorAll(".dir-theme-change")
    );
    switcherdirection.forEach((el) => el.classList.remove("active"));
    document.getElementsByClassName(direction)[0].classList.add("active");
    if (direction === "rtl-theme") {
      directionChnage[0].setAttribute("dir", "rtl");
    } else if (direction === "ltr-theme") {
      directionChnage[0].removeAttribute("dir", "rtl");
    }
  }

  function handleThemeLayout(layout, ind) {
    var changeLayout = document.body.classList;
    var switcherlayout = [].slice.call(
      document.querySelectorAll(".layout-theme-change")
    );
    switcherlayout.forEach((el) => el.classList.remove("active"));
    document.getElementsByClassName(layout)[0].classList.add("active");

    if (layout === "wide-layout") {
      changeLayout.remove("boxed");
      changeLayout.remove("frame");
      changeLayout.add("wide-layout");
    } else if (layout === "boxed") {
      changeLayout.remove("wide-layout");
      changeLayout.remove("frame");
      changeLayout.add("boxed");
    } else if (layout === "frame") {
      changeLayout.remove("boxed");
      changeLayout.remove("wide-layout");
      changeLayout.add("frame");
    }
    layoutCookie(layout, ind);
  }

  function dzhandleThemeBgColor(action, value, ind) {
    var backgchnage = document.body.classList;

    if (backgchnage.contains("boxed") || backgchnage.contains("frame")) {
      if (action === "bgcolor") {
        document.body.style.backgroundColor = value;
        document.body.style.backgroundImage = "";
      } else if (action === "bgImage") {
        document.body.style.backgroundImage = "url(" + value + ")";
        document.body.setAttribute("id", "bg");
      } else if (action === "bgPattern") {
        document.body.style.backgroundImage = "url(" + value + ")";
        document.body.setAttribute("id", "bg");
        document.body.style.backgroundSize = "auto";
      }
    }
    bgCookie(value, ind, action);
  }

  function dzPrimaryColor(action, value, currentEvent, ind) {
    var colorTheme = document.body;
    colorTheme.setAttribute("data-theme-color", value);
    var colorThemeSelectorArr = [].slice.call(
      document.querySelectorAll(".color-skins > li")
    );
    colorThemeSelectorArr.forEach((el) => el.classList.remove("active"));

    var logoSelectorArr = currentEvent.target
      .getAttribute("data-logo-selector")
      .split(",");
    var logoSrcArr = currentEvent.target
      .getAttribute("data-logo-image")
      .split(",");
    var arrCount = logoSelectorArr.length;

    // for (var i = 0; i < arrCount; i++) {
    //   if (document.querySelector(logoSelectorArr[i]) != null) {
    //     var imageSrc = eval(logoSrcArr[i]);
    //     const logoSelct = document.querySelectorAll(logoSelectorArr);
    //     logoSelct.forEach((el) => el.setAttribute("src", imageSrc));
    //   }
    // }
    const logoArr = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

    document
      .querySelectorAll(".select_logo")
      .forEach((el) => el.setAttribute("src", logoArr[ind]));

    setTimeout(function () {
      currentEvent.target.parentNode.classList.add("active");
    }, 200);
    addThemeCookie(value, ind);
  }

  //   add theme cookies

  const [index, setIndex] = useState(Number);
  const [layoutInd, setLayoutInd] = useState(Number);
  const [bgColorInd, setBgColorInd] = useState(null);
  const [bgImgInd, setBgImgInd] = useState(null);
  const [bgPatternInd, setBgPatternInd] = useState(null);
  const [headerInd, setHeaderInd] = useState(Number);
  function addThemeCookie(value, ind) {
    localStorage.setItem("theme", value);
    localStorage.setItem("themeInd", ind);
  }

  //   add layout cookies
  function layoutCookie(layout, ind) {
    localStorage.setItem("layout", layout);
    localStorage.setItem("layoutInd", ind);
  }

  //   add background cookies
  function bgCookie(value, ind, action) {
    localStorage.setItem("bgColor", value);
    localStorage.setItem("bgColorInd", ind);
    localStorage.setItem("bgAction", action);
  }

  const HeaderCookie = (position, ind) => {
    localStorage.setItem("position", position);
    localStorage.setItem("headerInd", ind);
  };
  // get get cookeis
  function getCookie() {
    let body = document.body;
    let getVal = localStorage.getItem("theme");
    let themeInd = localStorage.getItem("themeInd");
    let layout = localStorage.getItem("layout");
    let layoutInd = localStorage.getItem("layoutInd");
    let bgColor = localStorage.getItem("bgColor");
    let bgColorInd = localStorage.getItem("bgColorInd");
    let bgAction = localStorage.getItem("bgAction");
    let headerPosition = localStorage.getItem("position");
    let headerIndex = localStorage.getItem("headerInd");
    getVal === null
      ? body.setAttribute("data-theme-color", "color_1")
      : body.setAttribute("data-theme-color", getVal);
    //  theme buttons add active
    setIndex(themeInd === null ? 0 : themeInd);
    // layout
    getVal === null
      ? body.removeAttribute("class")
      : body.setAttribute("class", layout);
    //   layout add active
    setLayoutInd(layoutInd === null ? 0 : layoutInd);

    // header position
    let headermode = document.querySelector(".main-bar-wraper");

    if (headermode !== null) {
      if (headerPosition === "header-fixed") {
        headermode.classList.remove("sticky-no");
        headermode.classList.add("sticky-header");
      } else if (headerPosition === "header-static") {
        headermode.classList.remove("sticky-header");
        headermode.classList.add("sticky-no");
      }
    }
    setHeaderInd(headerIndex === null ? 1 : headerIndex);

    // set logo
    const logoArr = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

    document
      .querySelectorAll(".select_logo")
      .forEach((el) => el.setAttribute("src", logoArr[index]));
    let footerOneLogo = document.querySelector(".select_logo_dark");

    if (footerOneLogo !== null) {
      footerOneLogo.setAttribute("src", logoArr[themeInd]);
    }

    // bg pattern and color
    switch (bgAction) {
      case "bgcolor":
        getVal === null
          ? body.setAttribute("style", `background:''`)
          : body.setAttribute("style", `background:${bgColor}`);
        setBgColorInd(bgColorInd);
        setBgImgInd(null);
        setBgPatternInd(null);
        break;
      case "bgImage":
        body.setAttribute("style", `background-image: url(${bgColor})`);
        setBgColorInd(null);
        setBgPatternInd(null);
        setBgImgInd(bgColorInd);
        break;
      case "bgPattern":
        body.setAttribute("style", `background-image: url(${bgColor})`);
        setBgPatternInd(bgColorInd);
        setBgColorInd(null);
        setBgImgInd(null);
        break;
      default:
        break;
    }
  }

  useEffect(getCookie, [
    index,
    layoutInd,
    bgColorInd,
    bgImgInd,
    bgPatternInd,
    headerInd,
  ]);
  useEffect(getCookie, [Location.pathname]);

  useEffect(() => {
    let logoWhiteArr = [
      logoWhite1,
      logoWhite2,
      logoWhite3,
      logoWhite4,
      logoWhite5,
      logoWhite6,
      logoWhite7,
    ];
    let footerLogo = document.querySelector(".select_logo_white");
    if (footerLogo !== null) {
      footerLogo.setAttribute("src", logoWhiteArr[index]);
    }
  }, [index]);
  //  Delete All Cookie
  const DeleteAllCookie = () => {
    localStorage.setItem("theme", "color_1");
    localStorage.setItem("layout", "width");
    localStorage.setItem("bgColor", "color");
    localStorage.setItem("bgAction", "bgcolor");
    localStorage.setItem("position", "position");
    localStorage.setItem("themeInd", 0);
    localStorage.setItem("layoutInd", 0);
    localStorage.setItem("bgColorInd", null);
    localStorage.setItem("headerInd", 1);
    let bgAction = localStorage.getItem("bgAction");
    switch (bgAction) {
      case "bgcolor":
        setBgColorInd(null);
        setBgImgInd(null);
        setBgPatternInd(null);
        break;
      case "bgImage":
        setBgColorInd(null);
        setBgPatternInd(null);
        setBgImgInd(null);
        break;
      case "bgPattern":
        setBgPatternInd(null);
        setBgColorInd(null);
        setBgImgInd(null);
        break;
      default:
        break;
    }
    window.location.reload();
    getCookie();
  };

  return (
    <>
      <div
        id="dzSwitcher-right"
        className={`styleswitcher ${state.openswitcher ? "open" : ""}`}
        style={{
          left: `${state.openswitcher ? "30px" : ""}`,
          transition: "all .5s",
        }}
        onClick={() => setStateVal(!stateVal)}
      >
        <div
          className="overlay-switch"
          onClick={() => dispatch({ type: "openswitcher" })}
        ></div>
        <div
          className="switcher-btn-bx"
          onClick={() => dispatch({ type: "openswitcher" })}
        >
          <Link to={"#"} className="switch-btn closed">
            <span className="fas fa-cog"></span>
          </Link>
        </div>
        <div className="styleswitcher-inner">
          <div className="sw-main-title">
            Theme Setting
            <button
              className="dez-page btn btn-primary btn-sm"
              onClick={DeleteAllCookie}
            >
              Delete All Cookie
            </button>
          </div>
          <div className="theme-design row">
            <div className="theme-box col-md-12">
              <h5 className="switcher-title">
                <span>Theme</span>
              </h5>
              <ul val="themeFullColor" className="color-skins theme-panel-save">
                <li className={index == 0 ? "active" : ""}>
                  <Link
                    to={"#"}
                    className="theme-skin skin-1 theme-color"
                    onClick={(el) => {
                      dzPrimaryColor("primaryColor", "color_1", el, 0);
                    }}
                    data-color-theme="skin-1"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo1, logoWhite1,logoWhite1"
                  ></Link>
                </li>
                <li className={index == "1" ? "active" : ""}>
                  <Link
                    to={"#"}
                    onClick={(el) => {
                      dzPrimaryColor("primaryColor", "color_2", el, 1);
                    }}
                    className="theme-skin skin-2 theme-color"
                    data-color-theme="skin-2"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo2,logoWhite2,logoWhite2"
                  ></Link>
                </li>
                <li className={index == "2" ? "active" : ""}>
                  <Link
                    to={"#"}
                    onClick={(el) =>
                      dzPrimaryColor("primaryColor", "color_3", el, 2)
                    }
                    className="theme-skin skin-3 theme-color"
                    data-color-theme="skin-3"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo3, logoWhite3,logoWhite3"
                  ></Link>
                </li>
                <li className={index == "3" ? "active" : ""}>
                  <Link
                    to={"#"}
                    onClick={(el) =>
                      dzPrimaryColor("primaryColor", "color_4", el, 3)
                    }
                    className="theme-skin skin-4 theme-color"
                    data-color-theme="skin-4"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo4, logoWhite4,logoWhite4"
                  ></Link>
                </li>
                <li className={index == "4" ? "active" : ""}>
                  <Link
                    to={"#"}
                    onClick={(el) =>
                      dzPrimaryColor("primaryColor", "color_5", el, 4)
                    }
                    className="theme-skin skin-5 theme-color"
                    data-color-theme="skin-5"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo5, logoWhite5,logoWhite5"
                  ></Link>
                </li>
                <li className={index == "5" ? "active" : ""}>
                  <Link
                    to={"#"}
                    onClick={(el) =>
                      dzPrimaryColor("primaryColor", "color_6", el, 5)
                    }
                    className="theme-skin skin-6 theme-color"
                    data-color-theme="skin-6"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo6, logoWhite6,logoWhite6"
                  ></Link>
                </li>
                <li className={index == "6" ? "active" : ""}>
                  <Link
                    to={"#"}
                    onClick={(el) =>
                      dzPrimaryColor("primaryColor", "color_7", el, 6)
                    }
                    className="theme-skin skin-7 theme-color"
                    data-color-theme="skin-7"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo7, logoWhite7,logoWhite7"
                  ></Link>
                </li>
                {/* <li>
                  <Link
                    to={"#"}
                    onClick={(el) =>
                      dzPrimaryColor("primaryColor", "color_8", el)
                    }
                    className="theme-skin skin-8 theme-color"
                    data-color-theme="skin-8"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo8, logoWhite8,logoWhite8"
                  ></Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    onClick={(el) =>
                      dzPrimaryColor("primaryColor", "color_9", el)
                    }
                    className="theme-skin skin-9 theme-color"
                    data-color-theme="skin-9"
                    data-logo-selector=".logo-dark img, .logo-white img, .layout-dark .header-nav .logo-dark img"
                    data-logo-image="logo9, logoWhite9,logoWhite9"
                  ></Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="theme-design row theme-layout-wrapper">
            <div className="theme-box col-md-12">
              <h5 className="switcher-title">
                <span>Theme Layout</span>
              </h5>
              <ul val="layout" className="layout layout-view theme-panel-save">
                <li
                  className={`wide-layout layout-theme-change ${
                    layoutInd == "0" ? "active" : ""
                  }`}
                >
                  <Link
                    to={"#"}
                    dir="wide-layout"
                    onClick={() => handleThemeLayout("wide-layout", 0)}
                  >
                    <div></div>
                    <span>Wide</span>
                  </Link>
                </li>
                <li
                  className={`boxed layout-theme-change ${
                    layoutInd == "1" ? "active" : ""
                  }`}
                >
                  <Link
                    to={"#"}
                    dir="boxed"
                    onClick={() => handleThemeLayout("boxed", 1)}
                  >
                    <div>
                      <span></span>
                    </div>
                    <span>Boxed</span>
                  </Link>
                </li>
                <li
                  className={`frame layout-theme-change ${
                    layoutInd == "2" ? "active" : ""
                  }`}
                >
                  <Link
                    to={"#"}
                    dir="frame"
                    onClick={() => handleThemeLayout("frame", 2)}
                  >
                    <div>
                      <span></span>
                    </div>
                    <span>Frame</span>
                  </Link>
                </li>
              </ul>
              <div
                id="ThemeRangeSlider"
                className="price-slide-2 range-slider px-2 mb-3"
                style={{ display: "none" }}
              >
                <div className="price">
                  <input
                    type="text"
                    id="FramePadding"
                    className="amount"
                    readOnly=""
                    defaultValue="20px"
                  />
                  <div id="slider-range-3"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="theme-design row theme-view-wrapper">
            {/* <div className="col-xl-6 theme-box">
              <h5 className="switcher-title">
                <span>Theme View</span>
              </h5>
              <ul
                className="theme-panel-save tab-checkbx theme-view-ltr-rtl"
                val="mode"
              >
                <li className="ltr-theme dir-theme-change active">
                  <Link
                    to={"#"}
                    onClick={() => ChnageDirectionRtl("ltr-theme")}
                  >
                    LTR
                  </Link>
                </li>
                <li className="rtl-theme dir-theme-change">
                  <Link
                    to={"#"}
                    onClick={() => ChnageDirectionRtl("rtl-theme")}
                  >
                    RTL
                  </Link>
                </li>
              </ul>
            </div> */}
            {/* <div className="col-xl-6 theme-box">
              <h5 className="switcher-title">
                <span>Dark Mode</span>
              </h5>
              <ul
                className="theme-panel-save theme-version tab-checkbx"
                val="themeVersion"
              >
                <li className="light-theme active main-theme-version">
                  <Link
                    to={"#"}
                    dir="light"
                    logo="images/logo.png"
                    onClick={() => handleChangeTheme("light-theme")}
                  >
                    Light
                  </Link>
                </li>
                <li className="dark-theme main-theme-version">
                  <Link
                    to={"#"}
                    dir="dark"
                    logo="images/logo-white.png"
                    onClick={() => handleChangeTheme("dark-theme")}
                  >
                    Dark
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className="col-xl-6 theme-box">
              <h5 className="switcher-title">
                <span>Header</span>
              </h5>
              <ul
                val="header"
                className="tab-checkbx header-view theme-panel-save"
              >
                <li
                  className={`switcher-header-layout-btn header-fixed ${
                    headerInd == 1 ? "active" : ""
                  }`}
                >
                  <Link
                    to={"#"}
                    dir="sticky-header"
                    onClick={() => HeaderPostion("header-fixed", 1)}
                  >
                    Fixed
                  </Link>
                </li>
                <li
                  className={`switcher-header-layout-btn header-static ${
                    headerInd == 2 ? "active" : ""
                  }`}
                >
                  <Link
                    to={"#"}
                    dir="sticky-no"
                    onClick={() => HeaderPostion("header-static", 2)}
                  >
                    Static
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="theme-design row mb-0 theme-background-wrapper">
            <div className="col-md-12 theme-box mb-4">
              <h5 className="switcher-title">
                <span>Background Color</span>
              </h5>
              <ul val="bgColor" className="bg-color-switcher theme-panel-save">
                {bgColorBlog.map((item, ind) => (
                  <li
                    className={`${
                      changeColor == item.colorValue ? "active" : ""
                    } ${bgColorInd == ind ? "active" : ""}`}
                    key={ind}
                  >
                    <Link
                      to={"#"}
                      className={`bg-color-${item.style}`}
                      dir={item.colorValue}
                      onClick={() => {
                        dzhandleThemeBgColor("bgcolor", item.colorValue, ind);
                        setChangeColor(item.colorValue);
                      }}
                    ></Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-12 theme-box mb-4">
              <h5 className="switcher-title">
                <span>Background Image</span>
              </h5>
              <ul
                val="bgImage"
                className="background-switcher theme-panel-save"
              >
                {bgColorBlog.map((item, ind) => (
                  <li
                    className={`${
                      changeColor == item.bgimage1 ? "active" : ""
                    } ${bgImgInd == ind ? "active" : ""}`}
                    key={ind}
                  >
                    <img
                      src={item.bgimage1}
                      alt={"small" + (ind + 1)}
                      onClick={() => {
                        dzhandleThemeBgColor("bgImage", item.bgimage2, ind);
                        setChangeColor(item.bgimage1);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-12 theme-box">
              <h5 className="switcher-title">
                <span>Background Pattern</span>
              </h5>
              <ul val="bgPatten" className="pattern-switcher theme-panel-save">
                {bgColorBlog.map((item, ind) => (
                  <li
                    className={`${
                      changeColor == item.patterimage2 ? "active" : ""
                    }  ${bgPatternInd == ind ? "active" : ""}`}
                    key={ind}
                  >
                    <img
                      src={item.patterimage1}
                      alt={"pattern" + (ind + 1)}
                      //dir="images/pattern/pt1.jpg"
                      onClick={() => {
                        dzhandleThemeBgColor(
                          "bgPattern",
                          item.patterimage2,
                          ind
                        );
                        setChangeColor(item.patterimage2);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Switcher;
