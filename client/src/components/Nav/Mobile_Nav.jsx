import React from "react";
import style from "./Mobile_Nav.module.css";
import icon_menu from "../../icons/icon_menu.png";
import { useState, useEffect } from "react";
import icon_user from "../../icons/icon_user.png";
import { Link } from "react-router-dom";
import icon_dashboard from "../../icons/icon_dashboard.png";
import icon_operation from "../../icons/icon_operationNav.png";
export default function MobileNav({ logged, toggle, logout }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(toggle);
  }, []);

  return (
    <div className={`${active ? `${style.div_container}` : null}`}>
      {logged ? (
        <div className={style.user_nav}>
          <img src={logged.Picture ? logged.Picture : icon_user} alt="" />
          <div className={style.logOut}>
            <button className={style.buttonLog} onClick={() => logout()}>
              Log out 🚀{" "}
            </button>
          </div>
        </div>
      ) : null}
      <div className={style.div_link}>
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
      </div>
    </div>
  );
}
