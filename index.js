const Web3    = require('web3');
const nodoUrl = 'https://mainnet.infura.io/v3/d4324bf1ed874e0e9f9a435121a833e2';
const web3    = new Web3(nodoUrl);
const assets  = '0x53d284357ec70cE289D6D64134DfAc8E511c8a3D';

const abiContract     = [];
const addressContract = '0xBBc77482e45F1F44dE1745F52C74426C631bDD52';
const miContrato      = new web3.eth.Contract(abiContract, addressContract);

miContrato.methods;
miContrato.methods.name().call((err, result) => {
    console.log(result);
});

const addressUser = '0xf61c5C1Aa58a784C3F12Da30C35f6b12A25c8F87';
miContrato.methods.balanceOf(addressUser).call((err, result) => {
    console.log(result);
});

web3.eth.getBalance(address, (err, _balance) => {
    balance = _balance;
});

web3.utils.fromWei(balance, 'ether');
web3.eth.accounts.create();