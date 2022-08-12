const { add } = require("winston");
const { pool } = require("../../config/database");


/* 회원가입 */
exports.insertUsers = async function (connection, userID, password, nickname) {
  const Query = `
    Insert INTO 
      Users(userID, password, nickname)
    VALUES
      (?, ?, ?);
  `;
  const Params = [userID, password, nickname];

  const rows = await connection.query(Query, Params);
  return rows;
};


/* 로그인(회원검증) */
exports.isValidUsers = async function (connection, userID, password) {
  const Query = `
    SELECT
      userIdx, nickname
    FROM
      Users
    WHERE
      userID = ? and password = ? and status = 'A';
  `;
  const Params = [userID, password];

  const rows = await connection.query(Query, Params);
  return rows;
};


/* Restaurant Category 선택 */ 
exports.selectRestaurants = async function (connection, category) {
  const selectAllRestaurantsQuery = `
    SELECT 
      title, address, category, videoUrl
    FROM
      Restaurants
    WHERE
      status = 'A';
  `;
  const selectCategorizedRestaurantsQuery = `
    SELECT
      title, address, category, videoUrl
    FROM
      Restaurants
    WHERE
      status = 'A' and category = ?;
  `;
  const Params = [category];
  const Query = category
    ? selectCategorizedRestaurantsQuery
    : selectAllRestaurantsQuery;

  const rows = await connection.query(Query, Params);
  return rows;
}


/* 예시 코드 */
exports.exampleDao = async function (connection) {
  const Query = `SELECT * FROM Students`;
  const Params = [];

  const rows = await connection.query(Query, Params);
  return rows;
};
