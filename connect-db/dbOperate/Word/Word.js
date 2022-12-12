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
async function getWords() {
  try {
    let pool = await sql.connect(config);

    let users = await pool.request().query("SELECT * from Word");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getWordById(wordId) {
  try {
    let pool = await sql.connect(config);

    let user = await pool
      .request()
      .input("wordId", sql.Int, wordId)
      .query("select * from Word where Word.wordId = @wordId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getWordByTopicId(topicId) {
  try {
    let pool = await sql.connect(config);

    let user = await pool
      .request()
      .input("topicId", sql.Int, topicId)
      .query("select * from Word where Word.topicId = @topicId");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addWord(word) {
  try {
    let pool = await sql.connect(config);

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

async function addWordList(wordlist) {
  try {
    let pool = await sql.connect(config);

    wordlist.forEach((word) => {});
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
    let pool = await sql.connect(config);

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
    let pool = await sql.connect(config);

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
  getWordByTopicId,
  addWordList,
};
