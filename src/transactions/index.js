const Web3       = require('web3');
const EthereumTx = require('ethereumjs-tx');

const web3 = new Web3('https://ropsten.infura.io/v3/d4324bf1ed874e0e9f9a435121a833e2');

const address1 = '0xC47e77FE62a0abb2CAF720ea47c94b16c72a679b';
const address2 = '0xde96a1632a47ba561e21a6b3EB3Dd07093ae0F24';

const address1Key = new Buffer.from('E3C9C0C2EB13FA20A5322D79077DCAE4ADD11B0A01FD3CC5D8B905FEBD28A654', 'hex');
const address2Key = new Buffer.from('9FC66B9D876BB37C816DDFC859D4B663164C5BB3342C0112F4D766EAF422A4F8', 'hex');

web3.eth.getBalance(address1, (err, balance) => {
    console.log(web3.utils.fromWei(balance, 'ether'));
});

web3.eth.getBalance(address2, (err, balance) => {
    console.log(web3.utils.fromWei(balance, 'ether'));
});

/**
 * getTransactionCount
 */
//web3.eth.getTransactionCount(address, [, defaultBlock] [, callback]);
web3.eth.getTransactionCount(address2, (err, txCount) => {
    // Example
    let rawTx_Example = {
          nonce:'0x00',
        gasPrice:'0x09184e72a000',
        gasLimit:'0x2710',
              to:'0x00000000000000000000000000000000000000',
           value:'0x00',
            data:'0x7f74657374332000000000000000000000000000000000000000000000000600057',
    };

    // Use.
    let rawTx = {
           nonce:web3.utilstoHex(txCount),
        gasPrice:web3.utils.toHex(web3.utils.toWei('2', 'gwei')),
        gasLimit:web3.utils.toHex(21000),
              to:address1,
           value:web3.utils.toHex(800000000000000),
    };

    let tx = new EthereumTx(rawTx);
    tx.sign(address2Key);

    let serializedTx = tx.serialize().toString('hex');

    web3.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', console.log);

});