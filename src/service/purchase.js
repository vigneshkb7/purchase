import Web3 from '../Web3';
import PurchaseStorage from '../../build/contracts/Purchase.json'
import contract from 'truffle-contract';

const PurchaseStorageContract = contract(PurchaseStorage);
let purchaseInstance = new Web3.eth.Contract(PurchaseStorageContract.abi, PurchaseStorageContract.networks[100].address);

let confirmPurchase = async () => {
    try {
   
        const accounts = await Web3.eth.getAccounts();
        const res = await purchaseInstance.methods.confirmPurchase()
            .send({
                from: accounts[1],
                value:3000000000000000000
            });
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
};




// eslint-disable-next-line import/prefer-default-export
export {
     confirmPurchase,
};