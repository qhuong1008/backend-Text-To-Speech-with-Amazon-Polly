var express = require("express");
var app = express();
const sql = require("mssql");
sql.on("error", (err) => {
  console.log(err);
});
app.get("/", function (req, res) {});
async function getDBUserAsyncFunction() {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let result = await pool.request().query("select * from users");
    console.log(result);
  } catch (error) {
    sql.close();
  }
}
// var server = app.listen(5000, function () {
//   console.log("Server is running..");
// });
getDBUserAsyncFunction();
