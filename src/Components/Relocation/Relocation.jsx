import React, { useState, useEffect } from "react";
import classes from "./Relocation.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLetterNumber,
  addCompany,
  updateCompanyName,
  removeCompany,
  updateLetterSubject,
  setPeopleCount,
  setConfig,
  toggleAttachment,
  updateLetterDate,
} from "../../store/slices/relocationEmailSlice";
import EmailRelocation from "./EmailRelocation";
import Sender from "../Sender";
import { ParsingComponent } from "../Site/ParsingComponent";

const Relocation = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState();
  const [newCompanyName, setNewCompanyName] = useState("");

  const data = useSelector((state) => state.relocationEmail);
  const mainData = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await window.electron.ipcRenderer.invoke(
          "getConfig",
          "relocation"
        );
        console.log("relocation : ", config);
        dispatch(setConfig(config));
      } catch (error) {
        console.error("Failed to load external config, using default:", error);
      }
    };

    fetchConfig();
  }, [dispatch]);

  const handleCompanyChange = (index, newName) => {
    dispatch(updateCompanyName({ index, name: newName }));
  };
  const handleAddCompany = (newName) => {
    if (newName.trim() !== "") {
      dispatch(addCompany(newName.trim()));
      setNewCompanyName(""); // Clear input field after adding
    }
  };

  const handleAttachmentChange = (name) => {
    dispatch(toggleAttachment({ attachmentName: name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }

    if (!e.nativeEvent.submitter && e.nativeEvent.submitter.type === "submit")
      return;

    setIsValidated(true);

    if (!form.checkValidity()) return;

    // Wrap the EmailText component in a Provider when rendering to string
    const emailBody = EmailRelocation({ data: { ...data, ...mainData } });

    const ccString = data.cc.join(";");
    const to = [];
    data.recipientName.forEach((r) => to.push(r.email));
    const toString = to.join(";");

    // Example data, replace withyour actual data collection logic

    const emailData = {
      emailBody, // HTML content of the email
      to: toString,
      cc: ccString,
      subject: data.letterSubject,
    };

    setIsSubmitting(true);
    try {
      const result = await window.electron.ipcRenderer.invoke(
        "open-outlook",
        emailData
      );
    } catch (error) {
      window.alert(`Error happened : ${error}`);
    }
    setIsSubmitting(false);
    setIsValidated(false);
  };

  return (
    <div className={classes.relocation}>
      <div className={classes.formContainer}>
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`${classes.form} needs-validation ${
            isValidated ? "was-validated" : ""
          }`}
        >
          <div className="mb-3">
            <Sender data={data} />
          </div>
          {/* letter number */}

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
              type="number"
              className="form-control"
              id="letterNumber"
              value={data.letterNumber}
              min="0"
              required
              onChange={(e) => {
                if (!isNaN(+e.target.value))
                  dispatch(updateLetterNumber(+e.target.value));
              }}
              placeholder="رقم الخطاب"
            />
            <div className="invalid-feedback">اختر رقم خطاب صالح</div>
          </div>

          <div className="mb-3">
            <label htmlFor="letterSubject" className="form-label">
              عنوان الخطاب
            </label>
            <input
              type="text"
              className="form-control"
              id="letterSubject"
              value={data.letterSubject}
              min="0"
              required
              onChange={(e) => dispatch(updateLetterSubject(e.target.value))}
              placeholder="عنوان الخطاب"
            />
            <div className="invalid-feedback">اختر عنوان خطاب صالح</div>
          </div>

          <div className={`mb-3 ${classes.peopleCount}`}>
            <label htmlFor="numOfMembers" className="form-label">
              عدد الأفراد
            </label>
            <input
              required
              value={data.peopleCount}
              onChange={(e) => {
                console.log(+e.target.value);
                if (!isNaN(+e.target.value)) {
                  dispatch(setPeopleCount({ peopleCount: +e.target.value }));
                }
              }}
              min={1}
              type="text"
              className="form-control"
              name="numOfMembers"
              id="numOfMembers"
              aria-describedby="helpnumOfMembers"
              placeholder="عدد الأفراد"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="receivingDate" className="form-label">
              تاريخ الخطاب :{" "}
            </label>
            <input
              className="form-control"
              id="receivingDate"
              name="receivingDate"
              type="date"
              required
              value={data.letterDate}
              onChange={(e) => dispatch(updateLetterDate(e.target.value))}
              placeholder="تاريخ الخطاب"
            />
            <div className="invalid-feedback">من فضلك إختر تاريخ الخطاب</div>
          </div>

          <div className={`mb-3 ${classes.attachmentsContainer}`}>
            <label className="lable form-label">المرفقات</label>
            {Object.entries(data.attachments).map(([key, value]) => (
              <div className="form-check" key={key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={key}
                  id={key}
                  checked={value}
                  onChange={() => handleAttachmentChange(key)}
                />
                <label className="form-check-label" htmlFor={key}>
                  {key === "letterAttachments" && "مرفق الخطاب ومرفقاته."}
                  {key === "letterSituation" && "مرفق قائمة بموقف الخطاب."}
                </label>
              </div>
            ))}
          </div>
          <div className={classes.submit}>
            <button
              type="submit"
              className={`btn btn-primary ${classes.send}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جارى الإرسال ..." : "إرسال"}
            </button>
          </div>
        </form>
      </div>
      <div className={classes.preview}>
        <ParsingComponent
          htmlContent={EmailRelocation({ data: { ...data, ...mainData } })}
        />
      </div>
    </div>
  );
};

export default Relocation;
