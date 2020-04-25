"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _purchase = _interopRequireDefault(require("./routes/purchase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)({
  origin: '*',
  credentials: true
}));
app.get('/healthcheck', (req, res) => res.sendStatus(200));
app.use('/api', _purchase.default);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  return res.status(res.statusCode || 500).send({
    message: err.message
  });
});

const main = async () => {
  try {
    app.listen(8081);
    console.log("Application started on port 8081");
  } catch (err) {
    process.exit(1);
  }
};

main().catch(console.error);