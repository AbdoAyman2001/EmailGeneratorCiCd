import React, { useState, useEffect } from "react";
import classes from "./Cars.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuthorizedAreas,
  updateCarCount,
} from "../../store/slices/siteEmailSlice";

const Cars = () => {
  const data = useSelector((state) => state.siteEmail);
  const dispatch = useDispatch();

  return (
    <div className={classes.Cars}>
      <div className="mb-3">
        <label htmlFor="carCount" className="form-label">
          عدد السيارات
        </label>
        <input
          type="text"
          className="form-control"
          id="carCount"
          value={data.carCount}
          min="0"
          onChange={(e) => {
            if (!isNaN(+e.target.value)) {
              dispatch(updateCarCount(+e.target.value));
            }
          }}
          placeholder="أدخل عدد السيارات"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="authorizedAreasSelect" className="form-label">
          المناطق المسموح بها
        </label>
        <select
          className="form-select"
          id="authorizedAreasSelect"
          value={data.authorizedAreas}
          onChange={(e) => dispatch(updateAuthorizedAreas(e.target.value))}
        >
          <option value="" disabled defaultValue={true}>
            اختر منظقة الدخول
          </option>
          <option value="ABC">ABC</option>
          <option value="AB">AB</option>
          <option value="C">C</option>
        </select>
      </div>
    </div>
  );
};

export default Cars;
