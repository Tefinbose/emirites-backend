const Enquiry = require("../models/Enquiry.js");

// Create Enquiry
const createEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    // Create the enquiry
    const enquiry = await Enquiry.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
    res.status(201).json({ message: "Enquiry submitted succesfully", enquiry });
  } catch (error) {
    res.status(500).json({
      message: "Falied to submit the enquiry",
      error: error.message,
    });
  }
};
// Get all enquiries

const getAllEnquiry = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1,
    });
    res.status(200).json(enquiries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch enquires", error: error.message });
  }
};

// Delete enquiry

const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to delete the enquiry", error: error.message });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiry,
  deleteEnquiry,
};
