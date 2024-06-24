import React from "react";
import Personnel from "./Personnel";
import Companies from "./Companies";
import Attachments from "./Attachments";
import Cars from "./Cars";
import EmailSite from "./EmailSite";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect } from "react";

import classes from "./Site.module.css";
import { useDispatch, useSelector } from "react-redux";
import { defaultConfig, setConfig } from "../../store/slices/siteEmailSlice";
import Sender from "../Sender";
import { ParsingComponent } from "./ParsingComponent";
// import { siteTemplate } from "./EmailStyles";

const Site = () => {
  const data = useSelector((state) => state.siteEmail);
  const mainData = useSelector((state) => state.mainSlice);

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await window.electron.ipcRenderer.invoke(
          "getConfig",
          "site"
        );
        console.log("site : ", config);
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

    setValidated(true);

    if (!form.checkValidity()) return;

    // Wrap the EmailText component in a Provider when rendering to string
    const emailBody = EmailSite({ data: { ...data, ...mainData } });

    // const emailBody = siteTemplate;

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
    setValidated(false);
  };

  return (
    <div className={classes.site}>
      <div className={classes.preview}>
        <ParsingComponent
          htmlContent={EmailSite({ data: { ...data, ...mainData } })}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${classes.formContainer} needs-validation ${
          validated ? "was-validated" : ""
        }`}
        noValidate
      >
        <div className={classes.sender}>
          <Sender />
        </div>

        <div className={classes.personnel}>
          <Personnel validated={validated} />
        </div>

        <div className={classes.companies}>
          <Companies />
        </div>
        <div className={classes.attachment}>
          <Attachments />
        </div>
        <div className={classes.cars}>
          <Cars />
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
  );
};

export default Site;
