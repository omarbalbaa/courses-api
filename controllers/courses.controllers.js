const { validationResult } = require("express-validator");

const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "course does not exist" });
    }
    return res.json(course);
  } catch (err) {
    return res.status(400).json({ msg: "invalid object ID" });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const newCourse = new Course(req.body);
  await newCourse.save();

  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.updateOne({_id: courseId}, {
      $set: { ...req.body }
    });
    return res.status(200).json(updatedCourse);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const deleteCourse = await Course.deleteOne({_id: courseId});
    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({error: err});
  } 
  
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
