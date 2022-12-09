const sql = require("mssql");

async function getWords() {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let users = await pool.request().query("SELECT * from Word");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getWordById(wordId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let user = await pool
      .request()
      .input("wordId", sql.Int, wordId)
      .query("select * from Word where Word.wordId = @wordId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addWord(word) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let insertProduct = await pool
      .request()
      .input("eng", sql.VarChar, word.eng)
      .input("pronounce", sql.VarChar, word.pronounce)
      .input("viet", sql.NVarChar, word.viet)
      .input("topicId", sql.Int, word.topicId)
      .query("insert into Word values (@eng,@pronounce,@viet,@topicId)");
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function updateWordById(word, wordId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let insertProduct = await pool
      .request()
      .input("wordId", sql.Int, wordId)
      .input("eng", sql.VarChar, word.eng)
      .input("pronounce", sql.VarChar, word.pronounce)
      .input("viet", sql.NVarChar, word.viet)
      .query(
        "update Word set Word.eng = @eng, Word.pronounce=@pronounce, Word.viet=@viet where Word.wordId=@wordId"
      );
    return insertProduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function deleteWordById(wordId) {
  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=memozone_db;User Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;"
    );
    let user = await pool
      .request()
      .input("wordId", sql.Int, wordId)
      .query("delete from Word where Word.wordId = @wordId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getWords,
  getWordById,
  addWord,
  updateWordById,
  deleteWordById,
};
