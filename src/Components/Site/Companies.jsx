import React, { useEffect, useState } from "react";
import classes from "./Companies.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLetterNumber,
  addCompany,
  removeCompany,
  updateCompanyName,
  setCompanyExists,
  setHighPriority,
} from "../../store/slices/siteEmailSlice";

const Companies = () => {
  const data = useSelector((state) => state.siteEmail);
  const dispatch = useDispatch();

  const [newCompanyName, setNewCompanyName] = useState("");
  const handleCompanyChange = (index, newName) => {
    dispatch(updateCompanyName({ index, name: newName }));
  };
  const handleAddCompany = (newName) => {
    if (newName.trim() !== "") {
      dispatch(addCompany(newName.trim()));
      setNewCompanyName(""); // Clear input field after adding
    }
  };

  const letterNumberChangeHandler = (e) => {
    if (!isNaN(+e.target.value)) {
      dispatch(updateLetterNumber(+e.target.value));
    }
  };


  return (
    <>
      <div className={`mb-3 ${classes.companiesContainer}`}>
        <label className="form-label">الشركات : </label>
        <div className={classes.companies}>
          {data.companies.map((company, index) => (
            <div key={index} className={classes.inputGroup}>
              <input
                type="text"
                className="form-control"
                value={company}
                onChange={(e) => handleCompanyChange(index, e.target.value)}
                placeholder={`اسم المقاول ${index + 1}`}
              />
              <button
                type="button"
                className={`btn btn-danger ${classes.removeButton}`}
                onClick={() => dispatch(removeCompany(index))}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
        {/* Input for adding a new company */}
        <input
          type="text"
          className={`form-control ${classes.newCompanyInput}`}
          placeholder="إضافة مقاول جديد"
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCompany(newCompanyName);
            }
          }}
          onBlur={(e) => {
            e.preventDefault();
            handleAddCompany(newCompanyName);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="letterNumber" className="form-label">
          رقم الخطاب
        </label>
        <input
          type="text"
          className="form-control"
          id="letterNumber"
          value={data.letterNumber}
          min="0"
          required
          onChange={letterNumberChangeHandler}
          placeholder="رقم الخطاب"
        />
        <div className="invalid-feedback">اختر رقم خطاب صالح</div>
      </div>

      <div className={classes.checkBoxesContainer}>
        <div className={`mb-3`}>
          <div className={classes.OptionsContainer}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="HighPriority"
                id="HighPriority"
                checked={data.highPriority}
                onChange={(e) =>
                  dispatch(setHighPriority({ highPriority: e.target.checked }))
                }
              />
              <label className="form-check-label" htmlFor="HighPriority">
                <strong
                  style={{
                    fontWeight: "bolder",
                    fontFamily: "sans-serif",
                    fontSize: "1.2rem",
                    color: "red",
                  }}
                >
                  خطاب عاجل ؟؟
                </strong>
              </label>
            </div>
          </div>
        </div>

        <div className={`mb-3`}>
          <div className={classes.OptionsContainer}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="CompanyExists"
                id="CompanyExists"
                checked={data.companyExists}
                onChange={(e) =>
                  dispatch(
                    setCompanyExists({ companyExists: e.target.checked })
                  )
                }
              />
              <label className="form-check-label" htmlFor="CompanyExists">
                <strong
                  style={{
                    fontWeight: "bolder",
                    fontFamily: "sans-serif",
                    fontSize: "1.2rem",
                    color: "red",
                  }}
                >
                  يوجد ورق شركة ؟؟
                </strong>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
