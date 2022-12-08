const AccountDb = require("./dbOperate/Account/Account");
const CourseDb = require("./dbOperate/Course/Course");
var User = require("./model/Account");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

// ****** API ACCOUNT ******
// *************************
router.route("/accounts").get((request, response) => {
  AccountDb.getAccounts().then((data) => {
    response.json(data[0]);
  });
});

router.route("/accounts/:id").get((request, response) => {
  AccountDb.getAccountById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

router.route("/accounts").post((request, response) => {
  let account = { ...request.body };
  AccountDb.addAccount(account).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/accounts/:id").post((request, response) => {
  let account = { ...request.body };
  AccountDb.updateAccountById(account, request.params.id).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/accounts/:id").delete((request, response) => {
  AccountDb.deleteAccountById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

// ****** API COURSE ******
// *************************
router.route("/courses").get((request, response) => {
  CourseDb.getCourses().then((data) => {
    response.json(data[0]);
  });
});

router.route("/courses/:id").get((request, response) => {
  CourseDb.getCourseById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

router.route("/courses").post((request, response) => {
  let account = { ...request.body };
  CourseDb.addCourse(account).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/courses/:id").post((request, response) => {
  let course = { ...request.body };
  CourseDb.updateCourseById(course, request.params.id).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/courses/:id").delete((request, response) => {
  CourseDb.deleteCourseById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("User API is runnning at " + port);
