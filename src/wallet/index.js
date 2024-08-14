const Web3   = require('web3');
const web3   = new Web3();
const string = web3.utils.sha3(Math.random(0, 1000000).toString(16) + web3.utils.randomHex(32));
console.log(string);

const wallet = web3.eth.accounts.create();
console.log(wallet);

const privateKeyEncrypted = web3.eth.accounts.encrypt(wallet.privateKey, '12345');
console.log(privateKeyEncrypted);

const privateKey = web3.eth.accounts.decrypt(privateKeyEncrypted, '12345');
console.log(privateKey);

const fourAccounts = web3.eth.accounts.wallet.create(4, string);
console.log(fourAccounts);