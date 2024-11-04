import React, { useEffect } from "react";
import classes from "./Attachments.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAttachment,
  setDocType,
} from "../../store/slices/siteEmailSlice";

const Attachments = () => {
  const data = useSelector((state) => state.siteEmail);
  const dispatch = useDispatch();

  const handleAttachmentChange = (name) => {
    dispatch(toggleAttachment({ attachmentName: name }));
  };

  const handleDocTypeChange = (event) => {
    dispatch(setDocType(event.target.value));
  };

  return (
    <div className={classes.Attachments}>
      <div className="mb-3">
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

      {/* Render checkboxes for attachments */}
      {Object.entries(data.attachments).map(([key, value]) => (
        <div className="form-check" key={key}>
          {key === "ids" && data.docType === "local" && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>صورة ضوئية من بطاقات الرقم القومى.</label>
            </>
          )}

          {key === "ids" && data.docType === "foreign" && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>صورة ضوئية من جوازات السفر.</label>
            </>
          )}

          {key === "checklist" && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>قائمة البيانات العاملين.</label>
            </>
          )}

          {key === "entranceList" && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>قائمة بيانات السيارات.</label>
            </>
          )}

          {key === "carLicense" && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>صورة ضوئية من رخص السيارات.</label>
            </>
          )}

          {key === "drivingLicense" && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>صورة ضوئية من رخص القيادة.</label>
            </>
          )}

          {key === "commercialSheet" && data.companyExists && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>صورة ضوئية من السجل التجارى.</label>
            </>
          )}

          {key === "taxId" && data.companyExists && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>صورة ضوئية من البطاقة الضريبية.</label>
            </>
          )}

          {key === "managerId" && data.companyExists && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>
                صورة ضوئية من بطاقات الرقم القومى للمدير المسئول.
              </label>
            </>
          )}

          {key === "companyDataList" && data.companyExists && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={() => handleAttachmentChange(key)}
              />
              <label htmlFor={key}>نموذج بيانات الشركة.</label>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Attachments;
