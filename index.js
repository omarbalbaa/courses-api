const express = require("express");

const app = express();

const mongoose = require('mongoose');

const url = "mongodb+srv://balbaa:codeZone@cluster0.halviqt.mongodb.net/codeZone"
mongoose.connect(url).then (()=> {
  console.log('mongodb server started')
})

app.use(express.json());

const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter);

const port = 4000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
