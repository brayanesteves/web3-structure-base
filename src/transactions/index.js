const Web3       = require('web3');
const EthereumTx = require('ethereumjs-tx');

const web3 = new Web3('https://ropsten.infura.io/v3/d4324bf1ed874e0e9f9a435121a833e2');

const address1 = '0xC47e77FE62a0abb2CAF720ea47c94b16c72a679b';
const address2 = '0xde96a1632a47ba561e21a6b3EB3Dd07093ae0F24';

const address1Key = new Buffer.from('E3C9C0C2EB13FA20A5322D79077DCAE4ADD11B0A01FD3CC5D8B905FEBD28A654');
const address2Key = new Buffer.from('9FC66B9D876BB37C816DDFC859D4B663164C5BB3342C0112F4D766EAF422A4F8');

web3.eth.getBalance(address1, (err, balance) => {
    console.log(web3.utils.fromWei(balance, 'ether'));
});

web3.eth.getBalance(address2, (err, balance) => {
    console.log(web3.utils.fromWei(balance, 'ether'));
});