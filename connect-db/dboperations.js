const sql = require("mssql");

async function getAccounts() {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let users = await pool.request().query("SELECT * from Account");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(userId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let user = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT * from users where Id = @userId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addUser(user) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let insertProduct = await pool
      .request()
      .input("Name", sql.NVarChar, user.name)
      .query("insert into users values(@Name)");
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAccounts,
  getUserById,
  addUser,
};
