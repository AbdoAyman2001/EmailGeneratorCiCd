import React from "react";

const OutlookSignature = ({ data }) => {
  console.log(data.sender);

  return `




${
  data.sender && data.sender.name
    ? ` <p dir=LTR class=MsoNormal style='line-height: 12pt;'><b>
        <span lang=EN-GB style='margin:0;color:#2F5496;mso-ansi-language:EN-GB'>
        ${data.sender.name}<o:p></o:p></span></b></p>
    `
    : ""
}



<p dir=LTR class=MsoNormal style='line-height: 12pt;'><b><span lang=EN-GB style='margin:0;color:black;mso-ansi-language:
EN-GB'>Site Security Department</span></b><b><span lang=EN-GB style='font-size:
11.0pt;color:black;mso-ansi-language:EN-GB'><o:p></o:p></span></b></p>


${
  data.sender.phone
    ? data.sender.phone
        .map(
          (phone) =>
            `<p dir=LTR class=MsoNormal style='line-height: 12pt;'><span lang=EN-GB style='margin:0;color:black;mso-ansi-language:EN-GB'>Mob:
    ${phone}<o:p></o:p></span></p>`
        )
        .join("")
    : ""
}




${
  data.sender && data.sender.email
    ? data.sender.email
        .map(
          (
            email
          ) => `<p dir=LTR class=MsoNormal style='line-height:12pt;margin:0;'><span lang=EN-GB style='mso-ansi-language:EN-GB'>Email:&nbsp;</span><a
    href="mailto:${email}"><span lang=EN-GB style='mso-ansi-language:
    EN-GB'>${email}</span></a><span style='mso-ansi-language:EN-GB'> </span><span
    style='font-size:11.0pt;font-family:"Arial",sans-serif;color:#1868B8'><o:p></o:p></span></p>`
        )
        .join("")
    : ""
}



<p dir=LTR class=MsoNormal style='line-height:12pt;margin:0;'><span lang=EN-GB style='mso-ansi-language:EN-GB'>Website:&nbsp;</span><a
href="http://www.nppa.gov.eg/"><span lang=EN-GB style='color:#1868B8;
mso-ansi-language:EN-GB'>www.nppa.gov.eg</span></a><span lang=EN-GB
style='font-family:"Calibri",sans-serif;color:#1868B8;mso-ansi-language:EN-GB'><o:p></o:p></span></p>

<p dir=LTR class=MsoNormal style='line-height:12pt;margin:0;'><span lang=EN-GB style='mso-ansi-language:EN-GB'>El-Dabaa
Nuclear Power Plant Project&nbsp;<b><o:p></o:p></b></span></p>

<p dir=LTR class=MsoNormal style='line-height:12pt;margin:0;'><span lang=EN-GB style='mso-ansi-language:EN-GB'>Nuclear
Power Plants Authority&nbsp;</span><b><span lang=AR-SA dir=RTL
style='mso-ansi-language:EN-GB'><o:p></o:p></span></b></p>

<p dir=LTR class=MsoNormal style='line-height:12pt;margin:0;'><span lang=EN-GB style='mso-ansi-language:EN-GB'>Ministry of
Electricity and Renewable Energy<o:p></o:p></span></p>


<div dir=LTR>
<p class=MsoNormal><span style='font-size:11.0pt;font-family:"Calibri",sans-serif;
mso-fareast-font-family:"Times New Roman";mso-fareast-theme-font:minor-fareast;
color:#002060;mso-font-kerning:1.0pt;mso-no-proof:yes'><!--[if gte vml 1]><v:shapetype
 id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t"
 path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
 <v:stroke joinstyle="miter"/>
 <v:formulas>
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>
  <v:f eqn="sum @0 1 0"/>
  <v:f eqn="sum 0 0 @1"/>
  <v:f eqn="prod @2 1 2"/>
  <v:f eqn="prod @3 21600 pixelWidth"/>
  <v:f eqn="prod @3 21600 pixelHeight"/>
  <v:f eqn="sum @0 0 1"/>
  <v:f eqn="prod @6 1 2"/>
  <v:f eqn="prod @7 21600 pixelWidth"/>
  <v:f eqn="sum @8 21600 0"/>
  <v:f eqn="prod @7 21600 pixelHeight"/>
  <v:f eqn="sum @10 21600 0"/>
 </v:formulas>
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
 <o:lock v:ext="edit" aspectratio="t"/>
</v:shapetype><v:shape id="Picture_x0020_2" o:spid="_x0000_i1025" type="#_x0000_t75"
 style='width:102.75pt;height:115.5pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="https://nppa.gov.eg/src/images/nppa_footer_logo-1.png" o:title=""/>
</v:shape><![endif]--><![if !vml]><img border=0 width=137 height=154
src="https://nppa.gov.eg/src/images/nppa_footer_logo-1.png" v:shapes="Picture_x0020_2"><![endif]><span
style='mso-ligatures:standardcontextual'><o:p></o:p></span></span></p>

</div>






 
 <p style='margin:0;line-height:12pt;' dir=LTR class=MsoNormal><i><span lang=EN-GB style='mso-ansi-language:EN-GB'>This
email (and any attachments) are only for the use of the individual or entity to
which they were intended to be addressed and may contain information that is
(i) owned or licensed by the sender and subject to protection pursuant to
relevant copyright or other intellectual property laws, (ii) legally
privileged, or (iii) otherwise protected from disclosure. If you have reason to
believe you are not the intended recipient, you are hereby notified that any
dissemination, distribution, or copying of this message or any attachment, is
strictly prohibited and an unauthorized, unlicensed use of such material.
&nbsp;If you have reason to&nbsp;believe you have received this message in
error, please notify the sender by return e-mail and delete this message, along
with any attachments, from your computer.</span></i><o:p></o:p></p>`;
};

export default OutlookSignature;





/**
 




<!--[if gte mso 9]>
<v:shape id="Picture_x0020_1" type="#_x0000_t75" style='width:130pt;height:94pt;visibility:visible;mso-wrap-style:square' coordsize="21600,21600">
    <v:imagedata src="https://nppa.gov.eg/src/images/nppa_footer_logo-1.png" />
    <v:textbox inset="0,0,0,0">
        <div>
            <img src="https://nppa.gov.eg/src/images/nppa_footer_logo-1.png" style="width: 130px; display: block;">
        </div>
    </v:textbox>
</v:shape>
<![endif]-->




<!--[if gte mso 9]>
<v:shape id="Picture_x0020_1" type="#_x0000_t75" style='width:130pt;height:94pt;visibility:visible;mso-wrap-style:square' coordsize="21600,21600">
    <v:imagedata src="https://nppa.gov.eg/src/images/nppa_footer_logo-1.png" />
    <v:textbox inset="0,0,0,0">
        <div>
            <img src="https://nppa.gov.eg/src/images/nppa_footer_logo-1.png" style="width: 130px; display: block;">
        </div>
    </v:textbox>
</v:shape>
<![endif]-->

 */