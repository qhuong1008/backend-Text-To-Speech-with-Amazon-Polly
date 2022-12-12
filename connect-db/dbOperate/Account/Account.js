const sql = require("mssql");
var config = {
  user: "sa",
  password: "12345678",
  server: "localhost",
  database: "memozone_db",
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};
async function getAccounts() {
  try {
    let pool = await sql.connect(config);

    let users = await pool.request().query("SELECT * from Account");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getAccountById(accountId) {
  try {
    let pool = await sql.connect(config);

    let user = await pool
      .request()
      .input("accountId", sql.Int, accountId)
      .query("select * from Account where Account.accountId = @accountId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addAccount(Account) {
  try {
    let pool = await sql.connect(config);

    let insertProduct = await pool
      .request()
      .input("username", sql.VarChar, Account.username)
      .input("password", sql.VarChar, Account.password)
      .input("name", sql.NVarChar, Account.name)
      .input("email", sql.VarChar, Account.email)
      .query("insert into Account values (@username,@password,@name,@email)");
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function updateAccountById(Account, accountId) {
  try {
    let pool = await sql.connect(config);

    let insertProduct = await pool
      .request()
      .input("accountId", sql.VarChar, accountId)
      .input("username", sql.VarChar, Account.username)
      .input("password", sql.VarChar, Account.password)
      .input("name", sql.NVarChar, Account.name)
      .input("email", sql.VarChar, Account.email)
      .query(
        "update Account set Account.username = @username, " +
          "Account.password = @password, Account.name = @name," +
          "Account.email = @email where Account.accountId = @accountId"
      );
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function deleteAccountById(accountId) {
  try {
    let pool = await sql.connect(config);

    let user = await pool
      .request()
      .input("accountId", sql.Int, accountId)
      .query("delete from Account where Account.accountId = @accountId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAccounts,
  getAccountById,
  addAccount,
  updateAccountById,
  deleteAccountById,
};
