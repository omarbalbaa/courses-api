const express = require("express");

const app = express();

app.use(express.json());

const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter);

const port = 4000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
