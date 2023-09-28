const Request = require("../models/RequestModels");

const getRequests = async (req, res) => {
  const requests = await Request.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(requests);
};

const getRequest = async (req, res) => {
  const request = await Request.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(request);
};

// create requests
const createRequest = async (req, res) => {
  const {
    requestedAcademicCurriculum,
    requestedGrade,
    requestedSection,
    requestedSemester,
    requestType,
  } = req.body;

  const exist = await Request.find({});

  // Assuming exist is an array of objects representing requests
  const exists = exist.some(
    (item) =>
      item.requestedSemester.equals(requestedSemester) &&
      item.requestedSection.equals(requestedSection)
  );
  console.log(exists);
  if (exists) {
    res.status(409).json({ error: "Request already sent" });
  } else {
    // Process the request because it's not a duplicate

    let emptyFields = [];

    if (!req.body) {
      emptyFields.push("all");
    }

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all required the fields", emptyFields });
    }
    const requestStatus = "notApproved";
    try {
      const request = await Request.create({
        requestedAcademicCurriculum,
        requestedGrade,
        requestedSection,
        requestedSemester,
        requestType,
        requestStatus,
      });

      res.status(200).json(request);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const approveRequest = async (req, res) => {
  const request = new Request(req.body);
  try {
    if (IsValid(request) === true && IsPreviousRequestExist(request) === true) {
      const updatedRequest = await Request.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "Success",
        data: {
          updatedRequest,
        },
      });
    } else {
      res.status(202).json({
        status: "Success",
        message: "invalid request",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed to Update Request",
      message: err,
    });
  }
};

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  approveRequest,
};
