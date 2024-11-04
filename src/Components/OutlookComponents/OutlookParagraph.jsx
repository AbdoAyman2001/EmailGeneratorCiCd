import React from "react";

const OutlookParagraph = ({ children }) => {
  return `<p class=MsoNormal dir=RTL style='text-align:right;direction:rtl;unicode-bidi:
  embed'><span lang=AR-EG style='font-size:14.0pt;font-family:"Arial",sans-serif;
  color:black;mso-bidi-language:AR-EG'>${children}<o:p></o:p></span></p>`;
};

export default OutlookParagraph;
