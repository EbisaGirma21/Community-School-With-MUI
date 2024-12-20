const { createUser } = require("./UserController");
const Student = require("../models/StudentModel");
const AcademicSession = require("../models/AcademicSessionModel");
const fs = require("fs");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");

// Bulk Student Registration (CSV or Excel)
const registerStudentsFromFile = async (req, res) => {
  const filePath = req.file.path;
  const registrationType = "NOR";

  try {
    // Get file extension
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
    let studentsData = [];

    // Parse CSV or Excel file based on file extension
    if (fileExtension === "csv") {
      studentsData = await parseCSVFile(filePath);
    } else if (fileExtension === "xlsx") {
      studentsData = await parseExcelFile(filePath);
    } else {
      return res
        .status(400)
        .json({ error: "Invalid file format. Use CSV or Excel." });
    }

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

    const createdStudents = [];

    // Process each student in the parsed data
    for (const row of studentsData) {
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
      } = row;

      // Validate required fields
      if (!firstName || !lastName || !birthDate || !gender) {
        throw new Error("Required fields missing for one or more students");
      }

      // Check student age (must be at least 4 years old)
      const birthday = new Date(birthDate);
      const ageInMilliseconds = new Date() - birthday;
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
      if (ageInYears < 4) {
        throw new Error(
          `Student ${firstName} is not eligible (under 4 years old).`
        );
      }

      // Create student ID
      const formattedSequence = nextSequence.toString().padStart(4, "0");
      const studentIdNumber = `${registrationType}/${formattedSequence}/${
        ethiopianYear[0].academicYear % 100
      }`;
      nextSequence++;

      // Create user and family
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

      // Create student record
      const student = new Student({
        _id: user.user._id,
        birthDate,
        registrationType,
        studentIdNumber,
        family: family.user._id,
      });
      await student.save();
      createdStudents.push(student);
    }

    // Delete the uploaded file after processing
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "Students registered successfully",
      students: createdStudents,
    });
  } catch (error) {
    // Handle error and delete file
    fs.unlinkSync(filePath);
    res.status(400).json({ error: error.message });
  }
};

// Helper function to parse CSV file
const parseCSVFile = (filePath) =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });

// Helper function to parse Excel file
const parseExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

module.exports = { registerStudentsFromFile };
