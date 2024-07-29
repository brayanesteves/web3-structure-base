const Web3       = require('web3');
const EthereumTx = require('ethereumjs-tx');
const solc       = require('solc');
const fs         = require('fs');

const web3 = new Web3('https://ropsten.infura.io/v3/d4324bf1ed874e0e9f9a435121a833e2');

const address1    = '0xC47e77FE62a0abb2CAF720ea47c94b16c72a679b';
const address1Key = new Buffer.from('E3C9C0C2EB13FA20A5322D79077DCAE4ADD11B0A01FD3CC5D8B905FEBD28A654', 'hex');

const address2    = '0xde96a1632a47ba561e21a6b3EB3Dd07093ae0F24';
const address2Key = new Buffer.from('9FC66B9D876BB37C816DDFC859D4B663164C5BB3342C0112F4D766EAF422A4F8', 'hex');

const content  = fs.readFileSync('./cars/version/0.5.0/cars1.sol').toString();
let objectSolc = {
    language: 'Solidity',
    sources: {
        'cars': {
            content: content
        }
    },
    settings: {
        ouputSelection: {
            '*': {
                '*':['*']
            }
        },
        optimizer: {
            enabled: true,
               runs: 200
        },
        evmVersion: 'byzantium'
    },
};

const output           = JSON.parse(solc.compile(JSON.stringify(objectSolc)));
const bytecodeContract = output.contracts.cars.Cars.evm.bytecode.object;

web3.eth.getTransactionCount(address1, (err, txCount) => {
    const txObject = {
           nonce: web3.utils.toHex(txCount),
              to:null,
        gasLimit:web3.utils.toHex(1000000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('2', 'gwei')),
            data:`0x${bytecodeContract}`,
        //    value:web3.utils.toHex(800000000000000),
    };

    const tx = new EthereumTx(txObject);
    tx.sign(address1Key);
    const serializeTx = `0x${tx.serialize().toString('hex')}`;

    web3.eth.sendSignedTransaction(`0x${serializeTx}`).on('receipt', (receipt) => {
        console.log(`Contract uploaded: ${receipt.contractAddress}`);
    });
});