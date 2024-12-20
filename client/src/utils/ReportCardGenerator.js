import jsPDF from "jspdf";
import "jspdf-autotable";
import "../assets/font/amharic-normal.js";
import logo from "../assets/unnamed.png";

export const generateReportCard = async (
  tableRows,
  firstTableRows,
  secondTableRows,
  subjectColumns
) => {
  console.log(subjectColumns);

  const pdf = new jsPDF("landscape", "mm", "a4");

  for (const row of tableRows) {
    const first = firstTableRows.find(
      (firstTable) => firstTable._id === row._id
    );
    const second = secondTableRows.find(
      (secondTable) => secondTable._id === row._id
    );

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const column1X = 5;
    const column2X = pageWidth / 2 + 5;
    const headerY = 15;
    const header2Y = 25;

    pdf.setFillColor(240, 180, 210);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");
    pdf.setFontSize(12);
    pdf.setFont("amharic", "normal");

    const Column1 = (x, startY) => {
      let y = startY;
      pdf.setFont("amharic", "normal");

      pdf.setFontSize(14);

      pdf.text("የማርክ አሰጣጥ ደንብ", x + 25, header2Y);

      const textWidth = pdf.getTextWidth("የማርክ አሰጣጥ ደንብ");
      const lineY = header2Y + 1;
      pdf.line(x + 25, lineY, x + 25 + textWidth, lineY);

      pdf.text("ትምህርት ቤቶች በመዘገብ ውስጥ የሚፅፏቸው የተማሪዎች", x, header2Y + 7);
      pdf.text("የትምህርት ደረጃ በሚከተለው ዓይነት ይመደባል፡፡", x, header2Y + 14);
      pdf.text("100-90% ያገኘ እጅግ በጣም ጥሩ", x + 22, header2Y + 23);
      pdf.text("89-80% ያገኘ በጣም ጥሩ", x + 22, header2Y + 30);
      pdf.text("79-60% ያገኘ በቂ", x + 22, header2Y + 37);
      pdf.text("59-50% ያገኘ መጠነኛ", x + 22, header2Y + 44);
      pdf.text("ከ50% በታች ዝቅተኛ", x + 22, header2Y + 51);

      pdf.text("ከመቶ ዜሮ (0% ) ምን ጊዜ ቢሆን ለተማሪ አይሰጥም ዜሮ መስጠት", x, header2Y + 58);
      pdf.text("ፈፅሞ አልተማረም ማለት ነው፡፡ተማሪ ከፍሉ ያልተገኘ እንደሆነ", x, header2Y + 65);
      pdf.text("አልነበረም ተብሎ ይፃፍበታል፡፡", x, header2Y + 72);

      pdf.setFont("times", "bold");
      pdf.text("METHOD OF MARKING", x + 15, header2Y + 79);
      pdf.setFont("amharic", "normal");

      const text2Width = pdf.getTextWidth("METHOD OF MARKING");
      const line2Y = header2Y + 80;
      pdf.line(x + 15, line2Y, x + 15 + text2Width, line2Y);

      pdf.text(
        "Students Achievement in each class will be the",
        x,
        header2Y + 86
      );
      pdf.text("Assigned Following values", x, header2Y + 93);

      pdf.text("100-90%  Excellent", x + 22, header2Y + 102);
      pdf.text("89-80%  Very Good", x + 22, header2Y + 109);
      pdf.text("79-60%  Satisfactory", x + 22, header2Y + 116);
      pdf.text("59-50%  Fair", x + 22, header2Y + 123);
      pdf.text("49-0%  Poor", x + 22, header2Y + 130);

      pdf.text(
        "A mark Zero(0%) should never be given. Since it",
        x,
        header2Y + 137,
        {
          maxWidth: pageWidth / 2 - 20,
        }
      );
      pdf.text(
        "would mean no work has been done absolutely. If the",
        x,
        header2Y + 144,
        {
          maxWidth: pageWidth / 2 - 20,
        }
      );
      pdf.text(
        "student has been absent from class for the whole pe-",
        x,
        header2Y + 151,
        {
          maxWidth: pageWidth / 2 - 20,
        }
      );
      pdf.text(
        "riod. And has not made up any of the work.",
        x,
        header2Y + 158,
        {
          maxWidth: pageWidth / 2 - 20,
        }
      );
      pdf.text("He (She) should be marked 'AB' for Absent", x, header2Y + 165, {
        maxWidth: pageWidth / 2 - 20,
      });
    };
    const Column2 = (x, startY) => {
      const centerText = (text, x, y, columnWidth) => {
        const textWidth =
          (pdf.getStringUnitWidth(text) * pdf.internal.getFontSize()) /
          pdf.internal.scaleFactor;
        const textX = x + (columnWidth - textWidth) / 2;
        pdf.text(text, textX, y);
      };

      let y = startY;

      const imgWidth = 30;
      const imgHeight = 30;

      pdf.addImage(logo, "PNG", x + 48, y - 10, imgWidth, imgHeight);

      centerText(
        "በኢትዮጵያ ፌደራላዊ ዲሞክራሲያዊ ሪፐብሊክ",
        x - 10,
        header2Y + 14,
        pageWidth / 2
      );
      centerText(
        "Federal Democratic Republic of Ethiopia",
        x - 10,
        header2Y + 20,
        pageWidth / 2
      );
      centerText("ትምህርት ሚኒስተር", x - 10, header2Y + 26, pageWidth / 2);
      centerText("Ministry of Education", x - 10, header2Y + 32, pageWidth / 2);
      centerText(
        "ወልቂጤ ዩኒቨርስቲ የማህበረሰብ ት/ቤት",
        x - 10,
        header2Y + 38,
        pageWidth / 2
      );
      centerText(
        "Wolkite University Community School",
        x - 10,
        header2Y + 44,
        pageWidth / 2
      );
      centerText(
        "የመጀመሪያ ደረጃ የተማሪ ውጤት መግለጫ",
        x - 10,
        header2Y + 50,
        pageWidth / 2
      );
      centerText(
        "Primary School Student Report Card",
        x - 10,
        header2Y + 56,
        pageWidth / 2
      );

      pdf.text(
        "የት/ቤቱ ስም ወልቂጤ ዩኒቨርስቲ የማሀበረሰብ ት/ቤት ከተማ ወ/ጠ",
        x + 5,
        header2Y + 65
      );
      pdf.text("Name of school", x + 5, header2Y + 71);
      pdf.text("Town", x + 90, header2Y + 71);
      pdf.text(
        "ክልል  __       ዞን  ___        ወረዳ _____________",
        x + 5,
        header2Y + 78
      );
      pdf.text("Region        Zone          Woreda", x + 5, header2Y + 84);

      pdf.text(
        `የተማሪው /ዋ/ ስም ${row.firstName} ${row.middleName}`,
        x + 5,
        header2Y + 91
      );
      pdf.text("Name of student", x + 5, header2Y + 97);

      pdf.text(
        `ፆታ ${row.gender}     ዕድሜ____  አድራሻ ከተማ ____________`,
        x + 5,
        header2Y + 104
      );
      pdf.text(
        "Sex          Age           Address Town",
        x + 5,
        header2Y + 110
      );
      pdf.text(
        "ከፍተኛ ገበሬ ማህበር ______ ቀበሌ _____ የቤት ቁጥር____",
        x + 5,
        header2Y + 117
      );
      pdf.text(
        "Higher/farmer Asso.      Kebele     House No",
        x + 5,
        header2Y + 123
      );
      pdf.text(
        "የትምርት ዓመት _______________________________",
        x + 5,
        header2Y + 130
      );
      pdf.text("Academic Year", x + 5, header2Y + 136);
      pdf.text(
        "ክፍሉ /ዋ/ __________________________________",
        x + 5,
        header2Y + 142
      );
      pdf.text("Class(Grade)", x + 5, header2Y + 148);
      pdf.text(
        "ወደ ________________________ክፍል ተዛውሯል(ራለች)",
        x + 5,
        header2Y + 155
      );
      pdf.text("Promoted to grade", x + 5, header2Y + 161);
      pdf.text(
        "የትለቤቱ ርዕሰ መምህሩ ስም ________________ ፊርማ___",
        x + 5,
        header2Y + 168
      );
      pdf.text(
        "Head Teachers _________________ Signature_____",
        x + 5,
        header2Y + 174
      );
    };
    // Render Both Columns
    const contentStartY = headerY;
    Column1(column1X + 10, contentStartY);
    Column2(column2X, contentStartY);

    pdf.addPage();

    // Set fill color
    pdf.setFillColor(240, 180, 210);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // subjectColumns.forEach((col) => {
    //   pdf.text(`${col.headerName}: ${row[col.field] || "N/A"}`, 10, y);
    //   y += 10;
    // });

    const studentMark = subjectColumns.map((subject) => {
      return {
        subject: subject.headerName,
        I: first[subject.field],
        II: second[subject.field],
        Av: row[subject.field],
      };
    });

    const renderColumn1 = (x, startY) => {
      const body = [
        [
          "የትምርት ዓይነት\nSubjects",
          "1st\nSemester",
          "2nd\nSemester",
          "Year\nAverage",
        ],
        [
          "አማርኛ/Amharic",
          first[
            subjectColumns.find((subject) => subject.headerName === "Amharic")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "Amharic")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "Amharic")
              ?.field
          ],
        ],
        [
          "አንግሊዘኛ/English",
          first[
            subjectColumns.find((subject) => subject.headerName === "English")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "English")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "English")
              ?.field
          ],
        ],
        [
          "ሒሳብ/Mathimatics",
          first[
            subjectColumns.find(
              (subject) => subject.headerName === "Mathimatics"
            )?.field
          ],
          second[
            subjectColumns.find(
              (subject) => subject.headerName === "Mathimatics"
            )?.field
          ],
          row[
            subjectColumns.find(
              (subject) => subject.headerName === "Mathimatics"
            )?.field
          ],
        ],
        [
          "አካበቢ ሳይንስ/BIS",
          first[
            subjectColumns.find((subject) => subject.headerName === "BIS")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "BIS")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "BIS")
              ?.field
          ],
        ],
        [
          "አስቴቲክስ/Aesthetics",
          first[
            subjectColumns.find(
              (subject) => subject.headerName === "Aesthetics"
            )?.field
          ],
          second[
            subjectColumns.find(
              (subject) => subject.headerName === "Aesthetics"
            )?.field
          ],
          row[
            subjectColumns.find(
              (subject) => subject.headerName === "Aesthetics"
            )?.field
          ],
        ],
        [
          "ፊዚክስ/Physics",
          first[
            subjectColumns.find((subject) => subject.headerName === "Physics")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "Physics")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "Physics")
              ?.field
          ],
        ],
        [
          "ኬሚስትሪ/Chemistry",
          first[
            subjectColumns.find((subject) => subject.headerName === "Chemistry")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "Chemistry")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "Chemistry")
              ?.field
          ],
        ],
        [
          "ባዮሎጂ/Biology",
          first[
            subjectColumns.find((subject) => subject.headerName === "Biology")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "Biology")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "Biology")
              ?.field
          ],
        ],
        [
          "ሕብረተሰብ ሳይንስ/Social",
          first[
            subjectColumns.find((subject) => subject.headerName === "Social")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "Social")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "Social")
              ?.field
          ],
        ],
        [
          "ሙዚቃ/Music",
          first[
            subjectColumns.find((subject) => subject.headerName === "Music")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "Music")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "Music")
              ?.field
          ],
        ],
        [
          "ሥዕል/Art",
          first[
            subjectColumns.find((subject) => subject.headerName === "Art")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "Art")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "Art")
              ?.field
          ],
        ],
        [
          "ስነ-ዜጋና ስነምግባር\nCivic & Ethical Education",
          first[
            subjectColumns.find(
              (subject) => subject.headerName === "Civic & Ethical Education"
            )?.field
          ],
          second[
            subjectColumns.find(
              (subject) => subject.headerName === "Civic & Ethical Education"
            )?.field
          ],
          row[
            subjectColumns.find(
              (subject) => subject.headerName === "Civic & Ethical Education"
            )?.field
          ],
        ],
        [
          "ሰውነት ማጎልበ\nPhysical Education",
          first[
            subjectColumns.find(
              (subject) => subject.headerName === "Physical Education"
            )?.field
          ],
          second[
            subjectColumns.find(
              (subject) => subject.headerName === "Physical Education"
            )?.field
          ],
          row[
            subjectColumns.find(
              (subject) => subject.headerName === "Physical Education"
            )?.field
          ],
        ],
        [
          "ኢንፎርሜሽን ቴክኖ/ICT",
          first[
            subjectColumns.find((subject) => subject.headerName === "ICT")
              ?.field
          ],
          second[
            subjectColumns.find((subject) => subject.headerName === "ICT")
              ?.field
          ],
          row[
            subjectColumns.find((subject) => subject.headerName === "ICT")
              ?.field
          ],
        ],
        ["ጠባይ/Conduct", , ,],
        ["የቀረበት/ችበት/ቀን/ Absent", , ,],
        [
          "ጠቅላላ ድምር/Total Grade",
          first?.totalMark,
          second?.totalMark,
          row?.totalMark,
        ],
        ["አማካኝ ውጤት/Average", first?.average, second?.average, row?.average],
        ["ደረጃ/Rank", first?.rank, second?.rank, row?.rank],
      ];

      pdf.setFontSize(16);
      pdf.setTextColor(50, 50, 150);

      pdf.autoTable({
        startY: startY,
        head: [body[0]],
        body: body.slice(1),

        styles: {
          fontSize: 10,
          textColor: [0, 0, 0],
          valign: "middle",
          lineColor: [0, 0, 0],
          lineWidth: 0.5,
          font: "amharic",
          fontStyle: "normal",
        },
        headStyles: {
          fillColor: [240, 180, 210],
          textColor: [0, 0, 0],
          halign: "center",
          font: "amharic",
          fontStyle: "normal",
        },
        bodyStyles: {
          fillColor: [240, 180, 210],
          lineColor: [0, 0, 0],
          lineWidth: 0.5,
        },
        alternateRowStyles: {
          fillColor: [240, 180, 210],
        },
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 25 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
        },
      });
      pdf.setFontSize(13);
      pdf.setTextColor(40);
      pdf.setFont("amharic", "normal");
      pdf.text(
        "የርዕሰ መምህሩ ፊርማ.....................................",
        x + 10,
        headerY + 171
      );
      pdf.text("Head Teacher's Signature", x + 10, headerY + 177);
    };

    const renderColumn2 = (x, startY) => {
      let y = startY;
      pdf.setFontSize(15);

      pdf.text("የክፍሉ መምህር አስተያየት", x + 25, headerY + 3);
      pdf.text("REMARK FROM THE HOME ROOM TEACHER", x, headerY + 9);

      pdf.setFontSize(12);
      pdf.text("1ኛ የትምህርት ወቅት", x, headerY + 19);
      pdf.text(
        "1st Semester ..............................................................................",
        x,
        headerY + 25
      );
      pdf.text(
        ".................................................................................................",
        x,
        headerY + 31
      );
      pdf.text(
        ".................................................................................................",
        x,
        headerY + 37
      );
      pdf.text(
        "........................................................................................",
        x,
        headerY + 42
      );

      pdf.text("የክፍሉ ኃላፊ መር", x, headerY + 52);
      pdf.text(
        "ፊርማ..................................................................................",
        x,
        headerY + 58
      );
      pdf.text("Signature of Home-Room Teacher", x, headerY + 64);

      pdf.setFont("amharic", "normal");
      pdf.text("የወላጅ ወይም ያሳዳጊ", x, headerY + 74);
      pdf.text(
        "ፊርማ..................................................................................",
        x,
        headerY + 80
      );
      pdf.text("Signature of Parent or Guardian", x, headerY + 86);

      pdf.text("1ኛ የትምህርት ወቅት", x, headerY + 96);
      pdf.text(
        "1st Semester .............................................................................",
        x,
        headerY + 102
      );
      pdf.text(
        ".................................................................................................",
        x,
        headerY + 108
      );
      pdf.text(
        ".................................................................................................",
        x,
        headerY + 114
      );
      pdf.text(
        "........................................................................................",
        x,
        headerY + 120
      );

      pdf.text("የክፍሉ ኃላፊ መር", x, headerY + 130);
      pdf.text(
        "ፊርማ..................................................................................",
        x,
        headerY + 136
      );
      pdf.text("Signature of Home-Room Teacher", x, headerY + 142);

      pdf.text("የወላጅ ወይም ያሳዳጊ", x, headerY + 152);
      pdf.text(
        "ፊርማ..................................................................................",
        x,
        headerY + 158
      );
      pdf.text("Signature of Parent or Guardian", x, headerY + 164);
      pdf.text(
        ".............................................................",
        x,
        headerY + 170
      );
    };

    renderColumn1(column1X, contentStartY);
    renderColumn2(column2X, contentStartY);

    pdf.addPage();
  }

  pdf.save("report-cards.pdf");
};
