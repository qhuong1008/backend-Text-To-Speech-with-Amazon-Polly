const sql = require("mssql");
var config = {
  user: "uteojco1_aws",
  password: "HuongPq123@",
  server: "125.212.224.205",
  database: "uteojco1_dientoandammay",
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};
async function getTopics() {
  try {
    let pool = await sql.connect(config);

    let users = await pool.request().query("SELECT * from Topic");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getTopicById(topicId) {
  try {
    let pool = await sql.connect(config);

    let user = await pool
      .request()
      .input("topicId", sql.Int, topicId)
      .query("select * from Topic where Topic.topicId = @topicId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getTopicByCourseId(courseId) {
  try {
    let pool = await sql.connect(config);

    let user = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query("select * from Topic where Topic.courseId = @courseId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addTopic(topic) {
  try {
    let pool = await sql.connect(config);

    let insertProduct = await pool
      .request()
      .input("topicName", sql.NVarChar, topic.topicName)
      .input("courseId", sql.Int, topic.courseId)
      .query("insert into Topic values (@topicName,@courseId)");
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function updateTopicById(topic, topicId) {
  try {
    let pool = await sql.connect(config);

    let insertProduct = await pool
      .request()
      .input("topicId", sql.Int, topicId)
      .input("topicName", sql.NVarChar, topic.topicName)
      .input("courseId", sql.Int, topic.courseId)
      .query(
        "update Topic set Topic.topicName= @topicName, Topic.courseId=@courseId where Topic.topicId = @topicId"
      );
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function deleteTopicById(topicId) {
  try {
    let pool = await sql.connect(config);

    let user = await pool
      .request()
      .input("topicId", sql.Int, topicId)
      .query("delete from Topic where Topic.topicId = @topicId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTopics,
  getTopicById,
  addTopic,
  updateTopicById,
  deleteTopicById,
  getTopicByCourseId,
};
