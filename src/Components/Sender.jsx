import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShiftNumber } from "../store/slices/mainSlice";
import { setSender } from "../store/slices/mainSlice";

import classes from "./Sender.module.css";

const Sender = () => {
  const data = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const maintainUserAcrossRefreshes = async () => {
      if (localStorage.getItem("name")) {
        dispatch(setSender({ name: localStorage.getItem("name") }));
        console.log("settign user : ", localStorage.getItem("name"));
      }
    };
    maintainUserAcrossRefreshes();
  }, [dispatch, data.officePersonnel]);

  const handleSenderChange = (e) => {
    localStorage.setItem("name", e.target.value);
    dispatch(setSender({ name: e.target.value }));
  };

  useEffect(() => {
    const maintainUserAcrossRefreshes = async () => {
      if (localStorage.getItem("shiftNumber")) {
        dispatch(
          setShiftNumber({ shiftNumber: +localStorage.getItem("shiftNumber") })
        );
      }
    };

    maintainUserAcrossRefreshes();
  }, [dispatch, data.officePersonnel]);

  const shiftNumberChangeHandler = (e) => {
    localStorage.setItem("shiftNumber", +e.target.value);
    dispatch(setShiftNumber({ shiftNumber: e.target.value }));
  };

  return (
    <div className={classes.sender}>
      <div>
        <label htmlFor="shiftNumberSelect" className="form-label">
          الشيفت
        </label>
        <select
          className="form-select"
          id="shiftNumberSelect"
          required
          value={data.shiftNumber || ""}
          onChange={shiftNumberChangeHandler}
        >
          <option value="" disabled defaultValue={true}>
            إختر رقم الشيفت
          </option>
          <option value={1}>أول</option>
          <option value={2}>ثانى</option>
        </select>
      </div>

      <div>
        <label htmlFor="senderSelect" className="form-label">
          اسم المرسل
        </label>
        <select
          className="form-select"
          id="senderSelect"
          required
          value={data.sender.name}
          onChange={handleSenderChange}
        >
          <option value="" disabled defaultValue={true}>
            إختر اسم المرسل
          </option>
          {data.officePersonnel
            .filter((personnel) => {
              if (data.shiftNumber) {
                return +personnel.shiftNumber === +data.shiftNumber;
              } else {
                return false;
              }
            })
            .map((personnel) => (
              <option key={personnel.name} value={personnel.name}>
                {personnel.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Sender;
