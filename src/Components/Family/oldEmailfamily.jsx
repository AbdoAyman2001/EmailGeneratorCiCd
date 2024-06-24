// return (
//   <div
//     dir="rtl"
//     className={classes.names}
//     style={{
//       fontFamily: "PT Bold Heading",
//       fontSize: "18pt",
//       fontWeight: "normal",
//     }}
//   >
//     {data.recipientName.map((recipientName) => (
//       <p
//         key={Math.random()}
//         style={{
//           fontSize: "18pt",
//           margin: "0cm",
//           marginBottom: "0.00001pt",
//         }}
//         className={classes.name}
//       >
//         السيد الزميل/ {recipientName.name}
//       </p>
//     ))}
//     <h4
//       dir="rtl"
//       className={classes.hi}
//       style={{
//         fontFamily: '"PT Bold Heading", sans-serif',
//         fontWeight: "normal",
//         fontSize: "18pt",
//         textAlign: "right",
//       }}
//     >
//       تحية طيبة وبعد ،،،
//     </h4>
//     <p
//       dir="rtl"
//       className={classes.message}
//       style={{ fontFamily: "Times New Roman", fontSize: "18pt" }}
//     >
//       أتشرف أن أحيطكم علما بأنه قد ورد إلينا خطاب من المقاول العام الروسى مرفق
//       به قائمة تضم عدد
//       <span>
//         {" "}
//         ({data.peopleCount}) {getRelationShip()}
//       </span>
//       <span>
//         {" "}
//         {getHostPronoun()} {listCompanies()}{" "}
//       </span>
//       ، وذلك للسماح
//       <span> {themPronoun()} </span>
//       بدخول المدينة السكنية بالضبعة.
//     </p>

//     <p
//       dir="rtl"
//       className={classes.message}
//       style={{ fontFamily: "Times New Roman", fontSize: "18pt" }}
//     >
//       لذا نرجو التكرم باتخاذ ما يلزم نحو الإفادة بالموقف الأمنى{" "}
//       {mentioned() + " "}
//       حتى يتسنى لنا الرد على المقاول الرئيسى.
//     </p>
//     <h4
//       dir="rtl"
//       style={{
//         fontFamily: "PT Bold Heading",
//         fontSize: "18pt",
//         fontWeight: "normal",
//         textDecoration: "underline",
//       }}
//     >
//       المرفقات :{" "}
//     </h4>

//     <ul
//       dir="rtl"
//       className={classes.listItems}
//       style={{ fontFamily: "Times New Roman" }}
//     >
//       {data.attachments.ids && <li>صورة ضوئية من جوازات السفر.</li>}
//       {data.attachments.checklist && <li>قائمة البيانات.</li>}
//       {data.attachments.drivingLicense && <li>رخص القيادة.</li>}
//       {data.attachments.entranceList && <li>قائمة بيانات المركبات.</li>}
//       {data.attachments.carLicense && <li>رخص تسيير المركبات.</li>}
//     </ul>

//     <h4
//       dir="rtl"
//       style={{
//         fontFamily: "PT Bold Heading",
//         fontSize: "18pt",
//         fontWeight: "normal",
//         marginBottom: "0.5cm",
//       }}
//     >
//       وتفضلوا بقبول وافر الإحترام والتقدير،،
//     </h4>
//     <Signature data={data} />
//   </div>
// );
