import React, { useState, useEffect } from "react";
import classes from "./ThreeMonths.module.css";
import EmailThreeMonths from "./EmailThreeMonths";
import { ParsingComponent } from "../Site/ParsingComponent";

import {
  setConfig,
  updateCarCount,
  updateLetterCode,
  addCompany,
  updateCompanyName,
  removeCompany,
  setDocType,
  updateAuthorizedAreas,
  toggleAttachment,
  updateLetterNumber,
} from "../../store/slices/threeMonthsEmailSlice";
import Sender from "../Sender";
import { useDispatch, useSelector } from "react-redux";

const ThreeMonths = () => {
  const [newCompanyName, setNewCompanyName] = useState("");
  const [validated, setValidated] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.threeMonthsEmail);
  const mainData = useSelector((state) => state.mainSlice);

  const letterNumberChangeHandler = (e) => {
    if (!isNaN(+e.target.value)) {
      dispatch(updateLetterNumber(+e.target.value));
    }
  };

  const handleAttachmentChange = (name) => {
    dispatch(toggleAttachment({ attachmentName: name }));
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await window.electron.ipcRenderer.invoke(
          "getConfig",
          "threeMonths"
        );
        console.log("threeMonths : ", config);
        dispatch(setConfig(config));
      } catch (error) {
        console.error("Failed to load external config, using default:", error);
      }
    };

    fetchConfig();
  }, [dispatch]);

  const handleDocTypeChange = (event) => {
    dispatch(setDocType(event.target.value));
  };

  const handleCompanyChange = (index, newName) => {
    dispatch(updateCompanyName({ index, name: newName }));
  };
  const handleAddCompany = (newName) => {
    if (newName.trim() !== "") {
      dispatch(addCompany(newName.trim()));
      setNewCompanyName(""); // Clear input field after adding
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }

    if (!e.nativeEvent.submitter && e.nativeEvent.submitter.type === "submit")
      return;

    setValidated(true);

    if (!form.checkValidity()) return;

    // Wrap the EmailText component in a Provider when rendering to string
    const emailBody = EmailThreeMonths({ data: { ...data, ...mainData } });

    // const emailBody = siteTemplate;

    const ccString = data.cc.join(";");
    const to = [];
    data.recipientName.forEach((r) => to.push(r.email));
    const toString = to.join(";");

    // Example data, replace withyour actual data collection logic

    const emailData = {
      emailBody, // HTML content of the email
      to: toString,
      cc: ccString,
      subject: `دخول سيارة خطاب رقم (${data.letterNumber})`,
    };

    setIsSubmitting(true);
    // try {
    const result = await window.electron.ipcRenderer.invoke(
      "open-outlook",
      emailData
    );
    // } catch (error) {
    // window.alert(`Error happened : ${error}`);
    // }
    setIsSubmitting(false);
    setValidated(false);
  };

  return (
    <div className={classes.cars}>
      <div className={classes.formContainer}>
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`${classes.form} needs-validation ${
            validated ? "was-validated" : ""
          }`}
        >
          <Sender />

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
          </div>

          <div className="mb-3">
            <label htmlFor="carCount" className="form-label">
              عدد السيارات
            </label>
            <input
              type="text"
              required
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
              required
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

          <div className="mb-3">
            <label htmlFor="nationality-select" className="form-label">
              المرفقات :
            </label>

            {Object.entries(data.attachments).map(([key, value]) => (
              <div className="form-check" key={key}>
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
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${classes.send}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جارى الإرسال ..." : "إرسال"}
          </button>
        </form>
      </div>

      <div className={classes.preview}>
        <ParsingComponent
          htmlContent={EmailThreeMonths({ data: { ...data, ...mainData } })}
        />
      </div>
    </div>
  );
};

export default ThreeMonths;
