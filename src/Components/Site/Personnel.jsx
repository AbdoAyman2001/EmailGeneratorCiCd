import React, { useState, useEffect } from "react";
import classes from "./Personnel.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRecipientName,
  addRecipient,
  removeRecipient,
  updatePeopleCount,
  updateGender,
  updateLetterNumber,
} from "../../store/slices/siteEmailSlice";

const Personnel = ({ validated }) => {
  // const [isNewNameActive, setIsNewNameActive] = useState(false);
  const [newName, setNewName] = useState(""); // Use state to manage the new name input
  const data = useSelector((state) => state.siteEmail);
  const dispatch = useDispatch();

  const handleNameChange = (index, newName) => {
    dispatch(
      updateRecipientName({ index, name: { name: newName, email: "" } })
    );
  };

  const handleAddName = (newName) => {
    if (newName.trim() !== "") {
      dispatch(addRecipient({ name: newName.trim(), email: "" }));
      setNewName("");
    }
  };

  const handleRemoveName = (index) => {
    dispatch(removeRecipient(index));
  };

  return (
    <>
      <div className={`mb-3 ${classes.numberOfPeople}`}>
        <label htmlFor="numberOfPeopleField" className="form-label">
          عدد الأشخاص
        </label>
        <input
          type="text"
          className="form-control"
          id="numberOfPeopleField"
          onChange={(e) => {
            if (!isNaN(+e.target.value)) {
              dispatch(updatePeopleCount(+e.target.value));
            }
          }}
          value={data.peopleCount}
          min={1}
          required
          placeholder="عدد الأشخاص"
        />
        <div className="invalid-feedback">اختر عدد أشخاص صالح</div>
      </div>

      <div className={`mb-3`}>
        <label className="form-label">النوع</label>
        <div className={classes.OptionsContainer}>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="genderMale"
              value="M"
              checked={data.gender === "M"}
              onChange={(e) => dispatch(updateGender(e.target.value))}
            />
            <div className="invalid-feedback">اختر نوع صالح</div>
            <label className="form-check-label" htmlFor="genderMale">
              ذكر
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="genderFemale"
              value="F"
              checked={data.gender === "F"}
              onChange={(e) => dispatch(updateGender(e.target.value))}
            />
            <label className="form-check-label" htmlFor="genderFemale">
              أنثى
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personnel;
