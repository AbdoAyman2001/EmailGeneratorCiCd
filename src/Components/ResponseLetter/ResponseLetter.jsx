import React, { useState, useEffect } from "react";
import classes from "./ResponseLetter.module.css";
import { ParsingComponent } from "../Site/ParsingComponent";
import { useSelector, useDispatch } from "react-redux";
import DocResponseLetterLocal from "./DocResponseLetterLocal";
import DocResponseLetterForeign from "./DocResponseLetterForeign";
import {
  setConfig,
  addCompany,
  updateCompany,
  removeCompany,
  updatePreparer,
  updateReviewer1,
  updateNationality,
  updateReviewer2,
  updateApprovedBy,
} from "../../store/slices/responseLetterSlice";
import DocConfirmationSheet from "./DocConfirmationSheet";
const defaultInputs = {
  letterNumber: "",
  letterDate: "",
  companyName: "",
};

const ResponseLetter = () => {
  const data = useSelector((state) => state.responseLetterDoc);
  const mainData = useSelector((state) => state.mainSlice);
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(defaultInputs);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split(".").map(Number);
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleUpdate = (e, index) => {
    const { name, value } = e.target;
    const newValue =
      name === "letterDate" ? formatDate(new Date(value)) : value;
    dispatch(
      updateCompany({
        index,
        name,
        value: newValue,
      })
    );
  };

  const handleBlur = () => {
    const { letterNumber, letterDate, companyName } = inputs;
    // if (letterNumber && letterDate && companyName) {

    const date = new Date(inputs["letterDate"]);
    dispatch(addCompany({ ...inputs, letterDate: formatDate(date) }));
    setInputs(defaultInputs);

    // } else {
    //   alert("All fields must be filled!");
    // }
  };

  console.log(data);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await window.electron.ipcRenderer.invoke(
          "getConfig",
          "responseLetter"
        );
        console.log("responseLetter : ", config);
        dispatch(setConfig(config));
      } catch (error) {
        console.error("Failed to load external config, using default:", error);
      }
    };

    fetchConfig();
  }, [dispatch]);

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

    setIsSubmitting(true);
    const result2 = await window.electron.ipcRenderer.invoke("open-word", {
      content: DocConfirmationSheet({ data: { ...data, ...mainData } })
    });
    const result = await window.electron.ipcRenderer.invoke("open-word", {
      content:
        data.nationality === "local"
          ? DocResponseLetterLocal({ data: { ...data, ...mainData } })
          : DocResponseLetterForeign({ data: { ...data, ...mainData } }),
    });
    setIsSubmitting(false);
    setIsValidated(false);
  };

  return (
    <div className={classes.response}>
      <div className={classes.formContainer}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className={`needs-validation ${isValidated ? "was-validated" : ""} ${
            classes.form
          }`}
        >
          <div className={classes.workerContainer}>
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">
                الجنسية
              </label>
              <select
                className="form-control"
                id="nationality"
                value={data.nationality}
                onChange={(e) => dispatch(updateNationality(e.target.value))}
              >
                <option value="local">مصري</option>
                <option value="foreign">أجنبي</option>
              </select>
              {/* <div className="invalid-feedback">يرجى اختيار الجنسية</div> */}
            </div>
            <div className="mb-3">
              <label htmlFor="preparer" className="form-label">
                المحضر
              </label>
              <input
                type="text"
                className="form-control"
                id="preparer"
                dir="ltr"
                value={data.preparer}
                required
                onChange={(e) => dispatch(updatePreparer(e.target.value))}
                placeholder="المحضر"
              />
              {/* <div className="invalid-feedback">يرجى إدخال اسم محضر صالح</div> */}
            </div>

            <div className="mb-3">
              <label htmlFor="firstReviewer" className="form-label">
                المراجع الأول
              </label>
              <input
                type="text"
                className="form-control"
                id="firstReviewer"
                dir="ltr"
                value={data.reviewer1}
                required
                onChange={(e) => dispatch(updateReviewer1(e.target.value))}
                placeholder="مراجع 1"
              />
              {/* <div className="invalid-feedback">
                يرجى إدخال اسم مراجع أول صالح
              </div> */}
            </div>

            <div className="mb-3">
              <label htmlFor="secondReviewer" className="form-label">
                المراجع الثاني
              </label>
              <input
                type="text"
                className="form-control"
                dir="ltr"
                id="secondReviewer"
                value={data.reviewer2}
                required
                onChange={(e) => dispatch(updateReviewer2(e.target.value))}
                placeholder="مراجع 2"
              />
              {/* <div className="invalid-feedback">
                يرجى إدخال اسم مراجع ثاني صالح
              </div> */}
            </div>

            <div className="mb-3">
              <label htmlFor="approvedBy" className="form-label">
                الموافق
              </label>
              <input
                type="text"
                className="form-control"
                dir="ltr"
                id="approvedBy"
                value={data.approvedBy}
                required
                onChange={(e) => dispatch(updateApprovedBy(e.target.value))}
                placeholder="الموافق"
              />
              {/* <div className="invalid-feedback">يرجى إدخال اسم موافق صالح</div> */}
            </div>
          </div>

          {data.data.map((company, index, companiesList) => (
            <div key={index} className={`${classes.companiesContainer} ${index===0 ? classes.first:""}`}>
              <div className="mb-3">
                {index === 0 && (
                  <label htmlFor="letterNumber" className="form-label">
                    رقم الخطاب
                  </label>
                )}
                <input
                  type="text"
                  className="form-control"
                  id="letterNumber"
                  name="letterNumber"
                  value={company.letterNumber}
                  onChange={(e) => handleUpdate(e, index)}
                  placeholder="رقم الخطاب كامل"
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid letter number
                </div>
              </div>

              <div className="mb-3">
                {index === 0 && (
                  <label htmlFor="letterDate" className="form-label">
                    تاريخ الخطاب
                  </label>
                )}
                <input
                  type="date"
                  className="form-control"
                  id="letterDate"
                  name="letterDate"
                  value={parseDate(company.letterDate)}
                  onChange={(e) => handleUpdate(e, index)}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid letter date
                </div>
              </div>

              <div className="mb-3">
                {index === 0 && (
                  <label htmlFor="companyName" className="form-label">
                    اسم الشركة
                  </label>
                )}
                <textarea
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  value={company.companyName}
                  onChange={(e) => handleUpdate(e, index)}
                  placeholder="اسم الشركة"
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid company name
                </div>
              </div>
              <button
                type="button"
                className={`btn btn-danger ${classes.removeButton}`}
                onClick={() => dispatch(removeCompany(index))}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}

          <div
            className={classes.addCompanyContainer}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleBlur();
              }
            }}
            // onBlur={handleBlur}
          >
            <div className="mb-3">
              {data.data.length === 0 && (
                <label htmlFor="letterNumber" className="form-label">
                  رقم الخطاب
                </label>
              )}
              <input
                type="text"
                className="form-control"
                id="letterNumber"
                name="letterNumber"
                value={inputs.letterNumber}
                onChange={handleChange}
                placeholder="رقم الخطاب كامل"
              />
              <div className="invalid-feedback">أدخل رقم خطاب مناسب</div>
            </div>

            <div className="mb-3">
              {data.data.length === 0 && (
                <label htmlFor="letterDate" className="form-label">
                  تاريخ الخطاب
                </label>
              )}
              <input
                type="date"
                className="form-control"
                id="letterDate"
                name="letterDate"
                value={inputs.letterDate}
                onChange={handleChange}
              />
              <div className="invalid-feedback">أدخل تاريخ خطاب مناسب</div>
            </div>

            <div className="mb-3">
              {data.data.length === 0 && (
                <label htmlFor="companyName" className="form-label">
                  إسم الشركة
                </label>
              )}
              <input
                type="text"
                className="form-control"
                id="companyName"
                name="companyName"
                value={inputs.companyName}
                onChange={handleChange}
                placeholder="اسم الشركة"
              />
              <div className="invalid-feedback">أدخل اسم شركة مناسب</div>
            </div>
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
        {data.nationality === "local" && (
          <ParsingComponent
            htmlContent={DocResponseLetterLocal({
              data: { ...data, ...mainData },
            })}
          />
        )}
        {data.nationality === "foreign" && (
          <ParsingComponent
            htmlContent={DocResponseLetterForeign({
              data: { ...data, ...mainData },
            })}
          />
        )}
      </div>
    </div>
  );
};

export default ResponseLetter;
