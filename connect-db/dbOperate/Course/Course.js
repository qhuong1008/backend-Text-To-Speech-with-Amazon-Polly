const sql = require("mssql");

async function getCourses() {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let users = await pool.request().query("SELECT * from Course");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getCourseById(courseId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let user = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query("select * from Course where Course.courseId = @courseId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getCourseByAccountId(accountId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let user = await pool
      .request()
      .input("accountId", sql.Int, accountId)
      .query("select * from Course where Course.accountId = @accountId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addCourse(Course) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let insertProduct = await pool
      .request()
      .input("courseName", sql.NVarChar, Course.courseName)
      .input("accountId", sql.Int, Course.accountId)
      .query("insert into Course values (@courseName,@accountId)");
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function updateCourseById(Course, courseId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let insertProduct = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .input("courseName", sql.NVarChar, Course.courseName)
      .input("accountId", sql.Int, Course.accountId)
      .query(
        "update Course set Course.courseName=@courseName, Course.accountId = @accountId where Course.courseId=@courseId"
      );
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function deleteCourseById(courseId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let user = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query("delete from Course where Course.courseId = @courseId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
  getCourseByAccountId,
};
