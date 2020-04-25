"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmPurchase = void 0;

var _Web = _interopRequireDefault(require("../Web3"));

var _Purchase = _interopRequireDefault(require("../../build/contracts/Purchase.json"));

var _truffleContract = _interopRequireDefault(require("truffle-contract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PurchaseStorageContract = (0, _truffleContract.default)(_Purchase.default);
let purchaseInstance = new _Web.default.eth.Contract(PurchaseStorageContract.abi, PurchaseStorageContract.networks[100].address);

let confirmPurchase = async () => {
  try {
    const accounts = await _Web.default.eth.getAccounts();
    const res = await purchaseInstance.methods.confirmPurchase().send({
      from: accounts[1],
      value: 3000000000000000000
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}; // eslint-disable-next-line import/prefer-default-export


exports.confirmPurchase = confirmPurchase;