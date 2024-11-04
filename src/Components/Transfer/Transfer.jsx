import React, { useState, useEffect } from "react";
import classes from "./Transfer.module.css";
import EmailTransfer from "./EmailTransfer";
import { ParsingComponent } from "../Site/ParsingComponent";
import Sender from "../Sender";
import { useDispatch, useSelector } from "react-redux";
import { setConfig } from "../../store/slices/transferSlice";
import Form from "./Form";

const Transfer = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const data = useSelector((state) => state.transfer);
  const mainData = useSelector((state) => state.mainSlice);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await window.electron.ipcRenderer.invoke(
          "getConfig",
          "transfer"
        );
        console.log("transfer : ", config);
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

    // Manually check form validity
    if (!form.checkValidity()) {
      setValidated(true); // Set validated to true to show feedback
      e.stopPropagation(); // Prevent form submission
      return;
    }

    setValidated(true);

    // Proceed only if the form is valid
    const emailBody = EmailTransfer({ data: { ...data, ...mainData } });
    const ccString = data.cc[data.docType].join(";");
    const to = data.recipientName[data.docType].map((r) => r.email).join(";");
    const emailData = {
      emailBody,
      to: to,
      cc: ccString,
      subject:
        data.docType === "local"
          ? `خطاب انتقال مصريين (${data.letterNumber})`
          : `خطاب انتقال أجانب (${data.letterNumber})`,
    };

    setIsSubmitting(true);

    try {
      await window.electron.ipcRenderer.invoke("open-outlook", emailData);
    } catch (error) {
      window.alert(`Error happened: ${error}`);
    } finally {
      setIsSubmitting(false);
      setValidated(false);
    }
  };

  return (
    <div className={classes.transfer}>
      <div className={classes.formContainer}>
        <form
          className={validated ? "was-validated" : ""}
          noValidate
          onSubmit={handleSubmit}
        >
          <Form isSubmitting={isSubmitting} />
        </form>
      </div>

      <div className={classes.preview}>
        <ParsingComponent
          htmlContent={EmailTransfer({ data: { ...data, ...mainData } })}
        />
      </div>
    </div>
  );
};

export default Transfer;
