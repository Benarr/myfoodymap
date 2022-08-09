const express = require("./config/express"); // npm으로 설치한 express framework
const { logger } = require("./config/winston"); // 에러 log

/* express framework를 실행 시키겠다 */
const port = 3000;
express().listen(port);

logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
