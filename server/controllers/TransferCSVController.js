const fs = require("fs");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const AcademicSession = require("../models/AcademicSessionModel");
const Student = require("../models/StudentModel");
const { createUser } = require("./UserController");
const TransferStudent = require("../models/TranferstudentModel");

// Bulk Transfer Student Registration (CSV or Excel)
const registerTransferStudentsFromFile = async (req, res) => {
  const filePath = req.file.path;
  const registrationType = "TRF"; // Assuming 'TRF' is the registration type for Transfer Students

  try {
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
    let transferStudentsData = [];

    // Parse CSV or Excel file
    if (fileExtension === "csv") {
      transferStudentsData = await parseCSVFile(filePath);
    } else if (fileExtension === "xlsx") {
      transferStudentsData = await parseExcelFile(filePath);
    } else {
      return res
        .status(400)
        .json({ error: "Invalid file format. Use CSV or Excel." });
    }

    // Loop through each transfer student entry from the file
    for (const studentData of transferStudentsData) {
      const {
        firstName,
        middleName,
        lastName,
        gender,
        email,
        role,
        birthDate,
        familyFirstName,
        familyMiddleName,
        familyLastName,
        familyGender,
        familyEmail,
        familyPhoneNumber,
        familyAddress,
        previousYear,
        previousStage,
        previousGrade,
        previousClassification,
        previousTotalMark,
        previousAverage,
        previousAcademicStatus,
        nameOfSchool,
        addressOfSchool,
        contactOfSchool,
        otherInfo,
      } = studentData;

      let emptyFields = [];

      if (!firstName) {
        emptyFields.push("firstName");
      }
      if (!middleName) {
        emptyFields.push("middleName");
      }
      if (!lastName) {
        emptyFields.push("lastName");
      }
      if (!gender) {
        emptyFields.push("gender");
      }

      if (!role) {
        emptyFields.push("role");
      }
      if (!birthDate) {
        emptyFields.push("birthDate");
      }

      if (
        !familyFirstName ||
        !familyMiddleName ||
        !familyLastName ||
        !familyGender ||
        !familyEmail ||
        !familyPhoneNumber ||
        !familyAddress ||
        !previousYear ||
        !previousStage ||
        !previousGrade ||
        !previousClassification ||
        !previousTotalMark ||
        !previousAverage ||
        !previousAcademicStatus ||
        !nameOfSchool ||
        !addressOfSchool ||
        !contactOfSchool ||
        !otherInfo
      ) {
        emptyFields.push("familyInfo");
      }
      if (emptyFields.length > 0) {
        return res
          .status(400)
          .json({ error: "Please fill in all the fields", emptyFields });
      }
      // Generate studentIdNumber for transfer student
      const ethiopianYear = await AcademicSession.find();
      const lastStudent = await Student.findOne()
        .sort({ createdAt: -1 })
        .select("studentIdNumber");

      let nextSequence = 1;
      if (lastStudent && lastStudent.studentIdNumber) {
        const lastSequence = parseInt(
          lastStudent.studentIdNumber.split("/")[1],
          10
        );
        nextSequence = lastSequence + 1;
      }

      const formattedSequence = nextSequence.toString().padStart(4, "0");
      const studentIdNumber = `${registrationType}/${formattedSequence}/${
        ethiopianYear[0].academicYear % 100
      }`;

      const seniorEnrollment = {
        _academicYear: previousYear,
        _grade: previousGrade,
        _stage: previousStage,
        _classification: previousClassification,
        _totalMark: previousTotalMark,
        _average: previousAverage,
        _status: previousAcademicStatus,
      };

      // create student
      const user = await createUser(
        firstName,
        middleName,
        lastName,
        gender,
        email,
        role,
        familyPhoneNumber,
        familyAddress
      );

      // add student information
      if (!user) {
        res.status(500).json({ error: "Failed to add user" });
      }

      // create student family
      const family = await createUser(
        familyFirstName,
        familyMiddleName,
        familyLastName,
        familyGender,
        familyEmail,
        "family",
        familyPhoneNumber,
        familyAddress
      );
      const student = new Student({
        _id: user.user._id,
        birthDate,
        studentIdNumber,
        registrationType,
        family: family.user._id,
        currentEnrollement: seniorEnrollment,
        enrollment_history: [seniorEnrollment],
      });

      await student.save();

      const transferstudent = new TransferStudent({
        _id: user.user._id,
        transferYear: previousYear,
        transferGrade: previousGrade,
        transferStage: previousStage,
        transferClassification: previousClassification,
        transferTotalMark: previousTotalMark,
        transferAverage: previousAverage,
        transferAcademicStatus: previousAcademicStatus,
        nameOfSchool,
        addressOfSchool,
        contactOfSchool,
        otherInfo,
      });

      await transferstudent.save();

      // add senior information

      res.status(200).json(student);
    }

    // Remove the uploaded file after processing
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ message: "Transfer students registered successfully" });
  } catch (error) {
    fs.unlinkSync(filePath);
    res.status(400).json({ error: error.message });
  }
};

// Helper function to parse CSV files
const parseCSVFile = (filePath) =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });

// Helper function to parse Excel files
const parseExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

module.exports = { registerTransferStudentsFromFile };
