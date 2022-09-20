import React from "react";
import style from "../Nav/nav.module.css";
import { Link } from "react-router-dom";
import icon_dashboard from "../../icons/icon_dashboard.png";
import icon_operation from "../../icons/icon_operationNav.png";
import icon_user from "../../icons/icon_user.png";
import { useState, useEffect } from "react";
import MobileNav from "./Mobile_Nav";
import icon_menu from "../../icons/icon_menu.png";
import icon_close from "../../icons/icon_close.png";

export default function Nav() {
  const [logged, setLogged] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
  useEffect(() => {
    let userLog = JSON.parse(localStorage.getItem("user"));

    setLogged(userLog);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setLogged(null);
    window.location.replace("http://localhost:3000/");
  };

  const handleBurger = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <div>
      <nav className={style.MainNav}>
        <div className={style.nav_container}>
          {logged ? (
            <div className={style.user_nav}>
              <h1>Hi {logged.Name}!</h1>
              <div>
                <img src={logged.Picture ? logged.Picture : icon_user} alt="" />
              </div>
            </div>
          ) : null}
          <ul className={style.nav_links}>
            <li>
              <Link className={style.a} to="/Home">
                <img src={icon_dashboard} alt="" /> Dashboard{" "}
              </Link>
            </li>
            <li>
              <Link className={style.a} to="/Home/Operations/NewOperation">
                <img src={icon_operation} alt="" /> New operation{" "}
              </Link>
            </li>
          </ul>
          <div className={style.logOut}>
            <button className={style.buttonLog} onClick={() => logout()}>
              Log out 🚀{" "}
            </button>
          </div>
        </div>
      </nav>
      <div className={style.mobileNav}>
        {mobileNav ? (
          <img
            src={icon_close}
            className={style.hamburger}
            alt=""
            onClick={handleBurger}
          />
        ) : (
          <img
            src={icon_menu}
            className={style.hamburger}
            alt=""
            onClick={handleBurger}
          />
        )}
        {mobileNav ? (
          <MobileNav logged={logged} toggle={true} logout={logout} />
        ) : null}
      </div>
    </div>
  );
}
