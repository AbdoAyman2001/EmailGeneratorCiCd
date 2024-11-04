import React, { useState, useEffect } from "react";
import Sender from "../Sender";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Transfer.module.css";
import {
  setDocType,
  updateCompanyName,
  updateLetterNumber,
  toggleAttachment,
} from "../../store/slices/transferSlice";

const Form = ({ isSubmitting }) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.transfer);

  const handleDocTypeChange = (event) => {
    dispatch(setDocType(event.target.value));
  };

  const handleAttachmentChange = (name) => {
    dispatch(toggleAttachment({ attachmentName: name }));
  };

  return (
    <div className={classes.container}>
      <Sender />
      <div className={`mb-3`}>
        <label htmlFor="nationality-select" className="form-label">
          الجنسية :
        </label>
        <select
          className="form-select"
          id="nationality-select"
          value={data.docType}
          onChange={handleDocTypeChange}
        >
          <option value="local">مصرى</option>
          <option value="foreign">أجنبى</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="letterNumber" className="form-label">
          رقم الخطاب :
        </label>
        <input
          required
          type="number"
          id="letterNumber"
          className="form-control"
          value={data.letterNumber || ""}
          onChange={(e) => {
            dispatch(updateLetterNumber({ letterNumber: e.target.value }));
          }}
        />
      </div>

      {data.docType === "foreign" && (
        <div className={`mb-3`}>
          <label htmlFor="companyName" className="form-label">
            الشركة :
          </label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            value={data.companyName}
            required={data.docType === "foreign"}
            onChange={(e) => {
              dispatch(
                updateCompanyName({ companyName: e.target.value.toUpperCase() })
              );
            }}
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nationality-select" className="form-label">
          المرفقات :
        </label>

        {Object.entries(data.attachments).map(([key, value]) => (
          <div className="form-check" key={key}>
            {key === "ids" && (
              <>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={key}
                  id={key}
                  checked={value}
                  onChange={() => handleAttachmentChange(key)}
                />
                {data.docType === "local" ? (
                  <label htmlFor={key}>
                    مرفق صور ضوئية من بطاقات الرقم القومي.
                  </label>
                ) : (
                  <label htmlFor={key}>مرفق صور ضوئية من جوازات السفر.</label>
                )}
              </>
            )}

            {key === "dataList" && (
              <>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={key}
                  id={key}
                  checked={value}
                  onChange={() => handleAttachmentChange(key)}
                />
                <label htmlFor={key}>قائمة البيانات.</label>
              </>
            )}

            {key === "transferDataList" && (
              <>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={key}
                  id={key}
                  checked={value}
                  onChange={() => handleAttachmentChange(key)}
                />
                <label htmlFor={key}>قائمة بيانات التحويل.</label>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={classes.buttonContainer}>
        <button
          type="submit"
          className={`btn btn-primary ${classes.send}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "جارى الإرسال ..." : "إرسال"}
        </button>
      </div>
    </div>
  );
};

export default Form;
