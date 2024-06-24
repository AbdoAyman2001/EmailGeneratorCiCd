const test = () => {
  const peopleDistinction = () => {
    if (data.gender === "M") {
      if (data.peopleCount === 1 || data.peopleCount > 10) return "فرد تابع";
      else if (data.peopleCount === 2) return "فردين تابعين";
      else if (data.peopleCount > 2) return "أفراد تابعين";
    } else if (data.gender === "F") {
      if (data.peopleCount === 1 || data.peopleCount > 10) return "فرد تابع";
      else if (data.peopleCount === 2) return "فرد تابعين";
      else if (data.peopleCount > 2) return "أفراد تابعين";
    } else {
      throw new Error("Unknown Gender");
    }
  };
  const themPronoun = () => {
    if (data.gender === "M") {
      if (data.peopleCount === 1) {
        return "له";
      } else if (data.peopleCount === 2) {
        return "لهما";
      } else if (data.peopleCount > 2) {
        return "لهم";
      }
    } else if (data.gender === "F") {
      if (data.peopleCount === 1) {
        return "لها";
      } else if (data.peopleCount === 2) {
        return "لهما";
      } else if (data.peopleCount > 2) {
        return "لهم";
      }
    }
  };
  const mentioned = () => {
    if (data.gender === "M") {
      if (data.peopleCount === 1) return "للمذكور";
      else if (data.peopleCount === 2) return "للمذكورين";
      else if (data.peopleCount > 2) return "للمذكورين";
    } else if (data.gender === "F") {
      if (data.peopleCount === 1) {
        return "للمذكورة";
      } else if (data.peopleCount === 2) {
        return "للمذكورين";
      } else if (data.peopleCount > 2) {
        return "للمذكورين";
      }
    } else {
      return "";
    }
    return "";
  };

  const carDistinction = () => {
    if (data.carCount === 1 || data.carCount > 10) return "سيارة";
    else if (data.carCount === 2) return "سيارتين";
    else if (data.carCount > 2) return "سيارات";
  };
  const authorizedAreas = () => {
    if (data.authorizedAreas === "AB") {
      return "الموقع";
    } else if (data.authorizedAreas === "C") {
      return "المدينة السكنية";
    } else if (data.authorizedAreas === "ABC") {
      return "الموقع والمدينة السكنية";
    }
  };
  const listCompanies = () => {
    const reversedCompanies = [...data.companies].reverse();
    return reversedCompanies.map((company, i, arr) => {
      if (i === arr.length - 1) {
        // last one (the main contractor)
        return <span key={i}>للمقاول العام الروسى ({company}) </span>;
      } else {
        return <span key={i}> لشركة ({company}) إحدى مقاولى الباطن </span>;
      }
    });
  };
  const ids = () => {
    if (data.peopleCount === 1) {
      if (data.docType === "local") return "بطاقة";
      else if (data.docType === "foreign") return "جواز";
    } else if (data.peopleCount > 1) {
      if (data.docType === "local") return "بطاقات";
      else if (data.docType === "foreign") return "جوازات";
    }
  };

  return (
    <div dir="rtl">
      <div className={classes.names} style={{}}>
        {data.recipientName[data.docType].map((recipientName) => (
          <p key={Math.random()} style={bigHeader} className={classes.name}>
            السيد الزميل/ {recipientName.name}
          </p>
        ))}
        <h4
          className={classes.hi}
          style={{ ...smallHeader, marginTop: "0.3cm", marginBottom: "0.3cm" }}
        >
          تحية طيبة وبعد ،،،
        </h4>

        
        <p className={classes.message} style={{ ...normalText }}>
          أتشرف أن أحيطكم علما بأنه قد ورد إلينا خطاب من المقاول العام الروسى
          مرفق به قائمة تضم عدد
          <span> ({data.peopleCount}) </span>
          <span> {peopleDistinction()} </span>
          {listCompanies()}
          {!!data.carCount && (
            <>
              بالإضافة لعدد
              <span> ({data.carCount}) </span>
              <span> {carDistinction()} </span>
            </>
          )}
          {data.highPriority && <span style={warning}>بدرجة أولوية عاجلة</span>}{" "}
          ، وذلك للسماح
          <span> {themPronoun()} </span>
          بدخول
          <span> {authorizedAreas()} </span>
          للمشاركة فى أعمال المشروع.
        </p>






        <p
          className={classes.message}
          style={{
            color: "#000000",
            fontFamily: "Simplified Arabic",
            fontSize: "14pt",
            fontWeight: "Bold",
          }}
        >
          لذا نرجو التكرم باتخاذ ما يلزم نحو
          {data.CompanyExists ? (
            <span style={warning}>
              الإفادة بالموقف الأمنى {mentioned()} والشركة
            </span>
          ) : (
            <span>الإفادة بالموقف الأمنى {mentioned()}</span>
          )}
          حتى يتسنى لنا الرد على المقاول الرئيسى.
          {data.highPriority && (
            <span
              style={{
                color: "#c00000",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              {" "}
              مع إعتبار الموضوع هام وعاجل.
            </span>
          )}
        </p>
        {/* <h4
          style={{...simplifiedText}}
        >
          <span style={{ fontFamily: "Wingdings", textDecoration: "normal" }}>
            v
          </span>
          &nbsp;
          <span style={{ textDecoration: "underline" }}>المرفقات :</span>
        </h4>
        <ul
          className={classes.listItems}
          style={{
            fontFamily: "Simplified Arabic",
            marginRight: "1cm",
            marginTop:"0cm",
            marginBottom:"0cm",
            fontWeight: "normal",
            color: "#000000",
          }}
        >
          {data.attachments.ids && data.docType === "local" && (
            <li>
              صورة ضوئية من <span>{ids()}</span> الرقم القومى.
            </li>
          )}
          {data.attachments.ids && data.docType === "foreign" && (
            <li>
              صورة ضوئية من <span>{ids()}</span> السفر.
            </li>
          )}
          {data.attachments.checklist && <li>قائمة البيانات.</li>}
          {data.attachments.drivingLicense && <li>رخص القيادة.</li>}
          {data.attachments.entranceList && <li>قائمة بيانات المركبات.</li>}
          {data.attachments.carLicense && <li>رخص تسيير المركبات.</li>}
        </ul> */}

        <EmailAttachments />
        <h4
          style={{
            fontFamily: "PT Bold Heading",
            fontSize: "18pt",
            fontWeight: "normal",
            marginBottom: "0.5cm",
          }}
        >
          وتفضلوا بقبول وافر الإحترام والتقدير،،
        </h4>
        {/* <Signature data={data} /> */}
      </div>
    </div>
  );
};
