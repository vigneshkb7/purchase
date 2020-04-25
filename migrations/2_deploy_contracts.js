const Purchase = artifacts.require("Purchase");
module.exports = function(deployer) {
deployer.deploy(Purchase,{value:3000000000000000000});
};

