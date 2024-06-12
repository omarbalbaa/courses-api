const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const courseController = require("../controllers/courses.controllers");
const { validationSchema } = require('../middlewares/validationSchema');
const verifyToken = require("../middlewares/verifyToken");

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(verifyToken,
    validationSchema(),
    courseController.addCourse
  );

router
  .route("/:courseId")
  .get(courseController.getSingleCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
