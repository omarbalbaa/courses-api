let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getSingleCourse = (req, res) => {
  const courseId = +req.params.courseId;
  const course = courses.find((course) => course.id === courseId);
  if (!course) {
    return res.status(404).json({ msg: "course does not exist" });
  }
  res.json(course);
};

const addCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);
  res.status(201).json(course);
};

const updateCourse = (req, res) => {
  const courseId = +req.params.courseId;

  let course = courses.find((course) => course.id === courseId);

  if (!course) {
    return res.status(404).json({ msg: "course not found" });
  }

  course = { ...course, ...req.body };
  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const courseId = +req.params.courseId;
  courses = courses.filter((course) => course.id !== courseId);
  res.status(200).json({ success: true });
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
