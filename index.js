require('dotenv').config();
const express = require("express");

const cors = require('cors')

const app = express();

const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpStatusText');

const url = process.env.MONGO_URL;
mongoose.connect(url).then (()=> {
  console.log('mongodb server started')
})

app.use(express.json());
app.use(cors());

const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter);

app.all('*', (req, res, next) => {
  return res.status(404).json({status: httpStatusText.ERROR, message: 'this resource is not available'})
})

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status: statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500});
})

const port = 4000;
app.listen(process.env.PORT || port, () => {
  console.log("listening on port " + port);
});
