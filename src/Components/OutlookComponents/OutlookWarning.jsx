import React from "react";

const OutlookWarning = ({ children }) => {
  return `<b style='color:#002060!important'><u style='color:#002060'><span lang=AR-EG style='font-size:14.0pt;font-family:"Simplified Arabic",serif;
color:#C00000;mso-bidi-language:AR-EG'>${children}</span></u></b><span dir=LTR
style='mso-bidi-font-family:"PT Bold Heading";color:#002060'><o:p></o:p></span>
`;
};

export default OutlookWarning;
