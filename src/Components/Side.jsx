import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Site from "../assets/construction2.svg";
import family from "../assets/family2.svg";
import relocation from "../assets/Home.svg";
import cars from "../assets/cars.svg";
import responseLetter from "../assets/responseletter.png";
import transfer from "../assets/transfer.svg"; // Import the new icon
import classes from "./Side.module.css";

const Side = () => {
  const location = useLocation();

  const [isShown, setIsShown] = useState(false);
  const [isSiteActive, setIsSiteActive] = useState(false);
  const [isFamilyActive, setIsFamilyActive] = useState(false);
  const [isRelocationActive, setIsRelocationActive] = useState(false);
  const [isThreeMonthsActive, setIsThreeMonthActive] = useState(false);
  const [isResponseLetterActive, setisResponseLetterActive] = useState(false);
  const [isTransferActive, setIsTransferActive] = useState(false); // New state

  useEffect(() => {
    // Reset all
    setIsSiteActive(false);
    setIsFamilyActive(false);
    setIsRelocationActive(false);
    setIsThreeMonthActive(false);
    setisResponseLetterActive(false);
    setIsTransferActive(false); // Reset the new state

    // Set the active path
    if (location.pathname === "/Site") setIsSiteActive(true);
    else if (location.pathname === "/Family") setIsFamilyActive(true);
    else if (location.pathname === "/Relocation") setIsRelocationActive(true);
    else if (location.pathname === "/ThreeMonths") setIsThreeMonthActive(true);
    else if (location.pathname === "/ResponseLetter")
      setisResponseLetterActive(true);
    else if (location.pathname === "/Transfer") setIsTransferActive(true); // Handle the new route
  }, [location]);

  return (
    <div
      className="col-md-3"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 bg-light ${
          classes.sidebar
        } ${isShown ? classes.shown : classes.hidden}`}
      >
        <ul className={`nav nav-pills flex-column gap-3 ${classes.listItems}`}>
          <li className={isSiteActive ? classes.active : ""}>
            <NavLink to={"/Site"} className={`nav-link ${classes.navLink}`}>
              <img src={Site} alt="Site" className={classes.navImage} />
              {isShown && <span className={classes.navText}>موقع</span>}
            </NavLink>
          </li>
          <li className={isTransferActive ? classes.active : ""}>
            <NavLink to={"/Transfer"} className={`nav-link ${classes.navLink}`}>
              <img src={transfer} alt="Transfer" className={classes.navImage} />
              {isShown && <span className={classes.navText}>انتقال</span>}
            </NavLink>
          </li>

          <li className={isFamilyActive ? classes.active : ""}>
            <NavLink to={"/Family"} className={`nav-link ${classes.navLink}`}>
              <img src={family} alt="Family" className={classes.navImage} />
              {isShown && <span className={classes.navText}>عائلات</span>}
            </NavLink>
          </li>

          <li className={isRelocationActive ? classes.active : ""}>
            <NavLink
              to={"/Relocation"}
              className={`nav-link ${classes.navLink}`}
            >
              <img
                src={relocation}
                alt="Relocation"
                className={classes.navImage}
              />
              {isShown && <span className={classes.navText}>تسكين</span>}
            </NavLink>
          </li>

          <li className={isThreeMonthsActive ? classes.active : ""}>
            <NavLink
              to={"/ThreeMonths"}
              className={`nav-link ${classes.navLink}`}
            >
              <img src={cars} alt="Cars" className={classes.navImage} />
              {isShown && <span className={classes.navText}>عربيات</span>}
            </NavLink>
          </li>

          <li className={isResponseLetterActive ? classes.active : ""}>
            <NavLink
              to={"/ResponseLetter"}
              className={`nav-link ${classes.navLink}`}
            >
              <img
                src={responseLetter}
                alt="Response Letter"
                className={classes.navImage}
              />
              {isShown && <span className={classes.navText}>خطاب رد</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Side;
