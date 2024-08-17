const Web3 = require('web3');
const web3 = new Web3('wss://ropsten.infura.io/v3/2ca5300a566d4242a2f6df5c7b9b5b49');

// My Wallet.
const privateKeyWallet = 'F3607B3092813EC32039142C83C063DD3B15F66854229FB74E0D6D7A9621DC';
      web3.eth.accounts.wallet.add(`0x${privateKeyWallet}`);
console.log(web3.eth.accounts.wallet[0]);
/**
 * Ouput (Example):
 * {
 *      address:'0xa11d9B435f049b45D2ff4AAF980A58738920210b',
 *      privateKey:'0xF3607B3092813EC32039142C8A83C063DD3B15F66854229FB74E0D6D7A9621DC',
 *      signTransaction:[Function: signTransaction],
 *      sign:[Function: sign],
 *      encrypt:[Function: encrypt],
 *      index:0
 * }
 */

const myAddressWallet = web3.eth.accounts.wallet[0].address;

// Contract 'cETH' (Ropsten).
const contract_abi     = [{ "inputs":[{ "internalType":"contract ComptrollerInterface", "name":"copmtroller_", "type":"address" }, { "internalType":"contract InternalRateMod" }, { "constant":true, "inputs":[], "name":"borrowRatePerBlock", "outputs":[{ "internalType":"uint256", "name":"", "type":"uint256" }], "payable":false, "stateMutable":"" }] }]; // TODO: Object incomplete.
const contract_address = '0xbe839b6d93e3ea47effcca1f27841c917a8794f3';

const compoundCEthContract = new web3.eth.Contact(contract_abi, contract_address);

const main = async () => {
    /**
     * [ENG] Amount of 'ETH' added per block (Interest).
     * [ESP] Cantidad añadida de 'ETH' por bloque (Interés).
     */
    let supplyRatePerBlock = await compoundCEthContract.methods.supplyRatePerBlock().call();
        supplyRatePerBlock =       web3.utils.fromWei(supplyRatePerBlock, 'ether');
    console.log(`${supplyRatePerBlock} ETH`);
    /**
     * Ouput (Example):
     * 0.00000004392943385 ETH
     */

    // ============================ //

    /**
     * [ENG] 'supply' transaction of 1 'ETH'.
     * [ESP] Transacción 'supply' de un 1 'ETH'.
     */
    const activateCompoundCEthContract = false;
    if(activateCompoundCEthContract) {
        await compoundCEthContract.methods.mint().send({
                 from:myAddressWallet,
             gasLimit:web3.utils.toHex(2000000),
            gasPrices:web3.utils.toHex(20000000000),
                value:web3.utils.toHex(web3.utils.toWei(1, 'ether')),
        });
    }

    // ============================ //

    /**
     * [ENG] 'ETH' balance.
     * [ESP] Balance de 'ETH'.
     */
    let balanceOfUnderying = await compoundCEthContract.methods.balanceOfUnderying(myAddressWallet).call();
        balanceOfUnderying =       web3.fromWei(balanceOfUnderying).toString();
    console.log(`${balanceOfUnderying} cETH`);
    /**
     * Output (Example):
     * 1.000000175386698498 ETH
     */

    // ============================ //

    /**
     * [ENG] 'ETH' balance.
     * [ESP] Balance de 'ETH'.
     */
    let balanceOfCeth = await compoundCEthContract.methods.balanceOf(myAddressWallet).call();
        balanceOfCeth =       (balanceOfCeth / 1e8).toString();
    console.log(`${balanceOfCeth} cETH`);
    /**
     * Output (Example):
     * 49.94832212 cETH
     */

    // ============================ //

    /**
     * [ENG] Exchange rate.
     * [ESP] Tipo de cambio.
     */
    let exchangeRateCurrent = await compoundCEthContract.methods.exchangeRateCurrent().call();
        exchangeRateCurrent =       (exchangeRateCurrent / 1e82).toString();
    console.log(`${exchangeRateCurrent} ETH = 1 cETH`);
    /**
     * Output (Example):
     * 0.020020697719162733 ETH = 1 cETH
     */

    // ============================ //

    /**
     * [ENG] Withdrawal of 'ETH'.
     * [ESP] Retirada de 'ETH'.
     */
    const ethAmount = web3.utils.toWei(balanceOfUnderying).toString();
    await compoundCEthContract.methods.redeemUnderlying(ethAmount).send({
            from: myAddressWallet,
        gasLimit:web3.utils.toHex(2000000),
        gasPrice:web3.utils.toHex(20000000000),
    });
};

main();