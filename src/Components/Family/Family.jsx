import React, { useState, useEffect } from "react";
import classes from "./Family.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ParsingComponent } from "../Site/ParsingComponent";
import {
  setRelationShip,
  setConfig,
  addCompany,
  removeCompany,
  updateGuestNumber,
  setPeopleCount,
  updateHostGender,
  updateGuestGender,
  toggleAttachment,
  setDocType,
} from "../../store/slices/familyEmailSlice";
import Sender from "../Sender";
import EmailFamily from "./EmailFamily";

const Family = () => {
  const data = useSelector((state) => state.familyEmail);
  const mainData = useSelector((state) => state.mainSlice);
  const [isValidated, setIsValidated] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await window.electron.ipcRenderer.invoke(
          "getConfig",
          "family"
        );
        console.log("family : ", config);
        dispatch(setConfig(config));
      } catch (error) {
        console.error("Failed to load external config, using default:", error);
      }
    };

    fetchConfig();
  }, [dispatch]);

  const handleAttachmentChange = (name) => {
    dispatch(toggleAttachment({ attachmentName: name }));
  };

  const relationshipChangeHandler = (e) => {
    dispatch(setRelationShip({ relationship: e.target.value }));
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

    setIsValidated(true);

    if (!form.checkValidity()) return;

    const emailBody = EmailFamily({ data: { ...data, ...mainData } });

    const ccString = data.cc[data.docType].join(";");
    const to = [];
    data.recipientName[data.docType].forEach((r) => to.push(r.email));
    const toString = to.join(";");

    // Example data, replace withyour actual data collection logic

    const emailData = {
      emailBody, // HTML content of the email
      to: toString,
      cc: ccString,
      subject: `استعلام دخول موقع (${data.letterNumber})`,
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
    setIsValidated(false);
  };

  const handleDocTypeChange = (event) => {
    dispatch(setDocType(event.target.value));
  };

  return (
    <div className={classes.familyContainer}>
      <div className={classes.formContainer}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className={`needs-validation ${isValidated ? "was-validated" : ""} ${
            classes.form
          }`}
        >
          <div className={`mb-3 ${classes.senderContainer}`}>
            <Sender />
          </div>

          <div className={`mb-3 ${classes.peopleCount}`}>
            <label htmlFor="numOfMembers" className="form-label">
              عدد أفراد العائلة
            </label>
            <input
              required
              value={data.peopleCount}
              onChange={(e) => {
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
              placeholder="عدد أفراد العائلة"
            />
          </div>

          <div className={`mb-3 ${classes.relationship}`}>
            <label htmlFor="relationship" className="form-label">
              صلة القرابة
            </label>
            <select
              value={data.relationship}
              onChange={relationshipChangeHandler}
              required
              className="form-select form-select-sm"
              name="relationship"
              id="relationship"
            >
              <option value={""}>إختر صلة القرابة</option>
              <option value="husband">زوج</option>
              <option value="wife">زوجة</option>
              <option value="mother">أم</option>
              <option value="father">أب</option>
              <option value="sister">أخت</option>
              <option value="brother">أخ</option>
              <option value="son">ابن</option>
              <option value="daughter">ابنه</option>
              <option value="family">أسرة</option>
              <option value="motherInLaw">حماة</option>
              <option value="fatherInLaw">حما</option>
              <option value="stepMom">زوجة أب</option>
              <option value="stepFather">زوج أم</option>
            </select>
          </div>

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

          {/* <div className={`mb-3 ${classes.hostGender}`}>
            <label className="form-label">عدد عائلى الأسر : </label>
            <div className={classes.OptionsContainer}>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="guestNumber"
                  id="oneHost"
                  value="one"
                  checked={data.guestNumber === "one"}
                  onChange={(e) => dispatch(updateGuestNumber(e.target.value))}
                />
                <label className="form-check-label" htmlFor="oneHost">
                  لفرد واحد
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="guestNumber"
                  id="multipleHost"
                  value="multiple"
                  checked={data.guestNumber === "multiple"}
                  onChange={(e) => dispatch(updateGuestNumber(e.target.value))}
                />
                <label className="form-check-label" htmlFor="multipleHost">
                  لأكثر من فرد
                </label>
              </div>
            </div>
          </div> */}

          <div className={classes.gender}>
            <div className={`mb-3 ${classes.hostGender}`}>
              <label className="form-label">نوع المقيم</label>
              <div className={classes.OptionsContainer}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="HostGenderOptions"
                    id="genderMaleHost"
                    value="M"
                    checked={data.hostGender === "M"}
                    onChange={(e) => dispatch(updateHostGender(e.target.value))}
                  />
                  <div className="invalid-feedback">اختر نوع صالح</div>
                  <label className="form-check-label" htmlFor="genderMaleHost">
                    ذكر
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="HostGenderOptions"
                    id="genderFemaleHost"
                    value="F"
                    checked={data.hostGender === "F"}
                    onChange={(e) => dispatch(updateHostGender(e.target.value))}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="genderFemaleHost"
                  >
                    أنثى
                  </label>
                </div>
              </div>
            </div>

            <div className={`mb-3 ${classes.guestGender}`}>
              <label className="form-label">نوع الضيف</label>
              <div className={classes.OptionsContainer}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="guestGenderOptions"
                    id="genderMaleGuest"
                    value="M"
                    checked={data.guestGender === "M"}
                    onChange={(e) =>
                      dispatch(updateGuestGender(e.target.value))
                    }
                  />
                  <div className="invalid-feedback">اختر نوع صالح</div>
                  <label className="form-check-label" htmlFor="genderMaleGuest">
                    ذكر
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="guestGenderOptions"
                    id="genderFemaleGuest"
                    value="F"
                    checked={data.guestGender === "F"}
                    onChange={(e) =>
                      dispatch(updateGuestGender(e.target.value))
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="genderFemaleGuest"
                  >
                    أنثى
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={`mb-3 ${classes.docTypeSelect}`}>
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
                  {key === "dataList" && "مرفق قائمة بيانات العائلة."}
                  {key === "ids" &&
                    `مرفق صور ضوئية من ${
                      data.docType === "foreign"
                        ? "جوازات السفر"
                        : "بطاقات الرقم القومى"
                    }.`}
                  {key === "hostPassport" &&
                    `مرفق صورة ضوئية من ${
                      data.docType === "foreign"
                        ? "جواز السفر"
                        : "بطاقة الرقم القومى"
                    } لعائل الأسرة.`}

                  {key === "marriageCert" && "مرفق شهادة الزواج."}
                  {key === "birthCert" && "مرفق شهادة الميلاد للأطفال."}
                </label>
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
          htmlContent={EmailFamily({ data: { ...data, ...mainData } })}
        />

        {/* <EmailFamily data={{ ...data, ...mainData }}></EmailFamily> */}
      </div>
    </div>
  );
};

export default Family;
