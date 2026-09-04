const express = require("express");

const {createEnquiry,
  getAllEnquiry,
  deleteEnquiry,} =require("../controllers/enquiryController");

  const authMiddleware = require("../middlewares/authMiddleware");
  const adminMiddleware = require("../middlewares/adminMiddleware")


  const router = express.Router();

  router.post("/",createEnquiry);
  // admin route
  router.get("/",getAllEnquiry);
  // only admin can delete the enquiries
  router.delete("/:id",authMiddleware,adminMiddleware,deleteEnquiry);

  module.exports = router
