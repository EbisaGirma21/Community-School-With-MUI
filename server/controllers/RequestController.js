const Request = require("../models/RequestModel");

const getRequests = async (req, res) => {
  const requests = await Request.find({}).sort({
    createdAt: -1,
  });
  try {
    res.status(200).json({
      status: "Success",
      data: {
        requests,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to retrieve requests",
      message: err,
    });
  }
};

const getRequest = async (req, res) => {
  let request;
  try {
    request = await Request.findById(req.params.id);
    if (request == null) {
      return res.status(404).json({ message: "Cannot find request" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(res.request);
};

// create requests
const createRequest = async (req, res) => {
  const request = new Request(req.body);
  try {
    if (IsValid(request) === true && IsPreviousRequestExist(request) === true) {
      await request.save();
      res.status(201).json({
        status: "Success",
        data: {
          request,
        },
      });
    } else {
      res.status(202).json({
        status: "Success",
        message: "invalid request",
      });
    }
  } catch (err) {
    res.status(205).json({
      status: "Failed to create academic Session",
      message: err,
    });
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
