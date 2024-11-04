import React from "react";

const RequestOutlookParagraph = ({ children }) => {
  return `<p class=MsoNormal dir=RTL style='margin-top:0.3cm;margin-bottom:0.3cm;text-align:right;direction:rtl;unicode-bidi:
embed'><b><span lang=AR-EG style='font-size:14.0pt;font-family:"Simplified Arabic",serif;
mso-bidi-language:AR-EG'>${children}<o:p></o:p></span></b></p>`;
};

export default RequestOutlookParagraph;
