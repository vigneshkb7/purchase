"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _purchase = require("../service/purchase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router({
  mergeParams: true
});

router.post('/purchase', async (req, res, next) => {
  try {
    const data = await (0, _purchase.confirmPurchase)();
    res.json({
      success: true,
      message: 'purchase is confirmed',
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});
var _default = router;
exports.default = _default;