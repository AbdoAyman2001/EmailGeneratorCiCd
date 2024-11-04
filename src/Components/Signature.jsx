import React from "react";
import classes from "./Signature.module.css";

import { nppaLogo } from "../assets/image";
const Signature = ({ data }) => {
  return (
    <div>
      {data.sender && data.sender.name && (
        <p
          dir="ltr"
          style={{
            textAlign: "left",
            fontSize: "12pt",
            color: "darkblue",
            lineHeight: "14pt",
            margin: "0cm",
            fontWeight: "bold",
            fontFamily: "Calibri",
          }}
        >
          {data.sender.name}
        </p>
      )}
      <p
        dir="ltr"
        style={{
          lineHeight: "10pt",
          fontSize: "11pt",
          marginTop: "0cm",
          marginBottom: "0cm",
          fontFamily: "Calibri",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Site Security Department
      </p>
      {data.sender &&
        data.sender.phone &&
        data.sender.phone.map((phone) => (
          <p
            key={phone}
            dir="ltr"
            style={{
              lineHeight: "14pt",
              fontSize: "11pt",
              margin: "0cm",
              fontFamily: "Calibri",
              textAlign: "left",
            }}
          >
            <span>Mob: </span>
            {phone}
          </p>
        ))}
      {data.sender &&
        data.sender.email &&
        data.sender.email.map((email) => (
          <p
            key={email}
            dir="ltr"
            style={{
              lineHeight: "14pt",
              fontSize: "11pt",
              margin: "0cm",
              fontFamily: "Calibri",
              textAlign: "left",
            }}
          >
            <span>Email: </span>
            <a
              dir="ltr"
              style={{ textDecorationLine: "none", textAlign: "left" }}
              href={email}
            >
              {email}
            </a>
          </p>
        ))}

      <div
        dir="ltr"
        style={{
          fontSize: "11pt",
          fontFamily: "Calibri",
          textAlign: "left",
        }}
      >
        <p
          style={{ margin: "0cm", lineHeight: "14pt", textAlign: "left" }}
          dir="ltr"
        >
          Website :{" "}
          <a
            dir="ltr"
            style={{ textDecorationLine: "none", textAlign: "left" }}
            href="www.nppa.gov.eg"
          >
            www.nppa.gov.eg
          </a>
        </p>
        <p
          dir="ltr"
          style={{ margin: "0cm", lineHeight: "14pt", textAlign: "left" }}
        >
          El-Dabaa Nuclear Power Plant Project
        </p>
        <p
          dir="ltr"
          style={{ margin: "0cm", lineHeight: "14pt", textAlign: "left" }}
        >
          Nuclear Power Plants Authority
        </p>
        <p
          dir="ltr"
          style={{ margin: "0cm", lineHeight: "14pt", textAlign: "left" }}
        >
          Ministry of Electricity and Renewable Energy
        </p>
        <img
          dir="ltr"
          width="145"
          height="105"
          src={nppaLogo}
          style={{ backgroundColor: "white" }}
          alt=""
        />
        <p
          style={{
            fontFamily: "Calibir",
            fontSize: "11pt",
            lineHeight: "11pt",
          }}
        >
          This email (and any attachments) are only for the use of the
          individual or entity to which they were intended to be addressed and
          may contain information that is (i) owned or licensed by the sender
          and subject to protection pursuant to relevant copyright or other
          intellectual property laws, (ii) legally privileged, or (iii)
          otherwise protected from disclosure. If you have reason to believe you
          are not the intended recipient, you are hereby notified that any
          dissemination, distribution, or copying of this message or any
          attachment, is strictly prohibited and an unauthorized, unlicensed use
          of such material. If you have reason to believe you have received this
          message in error, please notify the sender by return e-mail and delete
          this message, along with any attachments, from your computer.
        </p>
      </div>
    </div>
  );
};

export default Signature;
