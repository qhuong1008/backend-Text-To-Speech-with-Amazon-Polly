const AccountDb = require("./dbOperate/Account/Account");
const CourseDb = require("./dbOperate/Course/Course");
const TopicDb = require("./dbOperate/Topic/Topic");
const WordDb = require("./dbOperate/Word/Word");
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
  response.setHeader(
    "Access-Control-Allow-Headers",
    "accept, authorization, content-type, x-requested-with"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  response.setHeader("Access-Control-Allow-Origin", response.header("origin"));
  response.header("Access-Control-Allow-Origin", "*");
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

router.route("/courses/account/:id").get((request, response) => {
  CourseDb.getCourseByAccountId(request.params.id).then((data) => {
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

// ****** API TOPIC ******
// *************************
router.route("/topics").get((request, response) => {
  TopicDb.getTopics().then((data) => {
    response.json(data[0]);
  });
});

router.route("/topics/:id").get((request, response) => {
  TopicDb.getTopicById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

router.route("/topics/course/:id").get((request, response) => {
  TopicDb.getTopicByCourseId(request.params.id)
    .then((data) => {
      response.json(data[0]);
    })
    .catch((error) => console.log(error));
});

router.route("/topics").post((request, response) => {
  let topic = { ...request.body };
  TopicDb.addTopic(topic).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/topics/:id").post((request, response) => {
  let topic = { ...request.body };
  TopicDb.updateTopicById(topic, request.params.id).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/topics/:id").delete((request, response) => {
  TopicDb.deleteTopicById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

// ****** API WORD ******
// *************************
router.route("/words").get((request, response) => {
  WordDb.getWords().then((data) => {
    response.json(data[0]);
  });
});

router.route("/words/:id").get((request, response) => {
  WordDb.getWordById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

router.route("/words/topic/:id").get((request, response) => {
  WordDb.getWordByTopicId(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

router.route("/words").post((request, response) => {
  let word = { ...request.body };
  WordDb.addWord(word).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/wordlist").post((request, response) => {
  let wordlist = [...request.body];
  WordDb.addWordList(wordlist).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/words/:id").post((request, response) => {
  let word = { ...request.body };
  WordDb.updateWordById(word, request.params.id).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/words/:id").delete((request, response) => {
  WordDb.deleteWordById(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("User API is runnning at " + port);
