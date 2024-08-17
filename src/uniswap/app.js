const UNISWAP = require('@uniswap/sdk');
const chainId = UNISWAP.ChainId.MAINNET;

const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const decimals     = 18;
const DAI          = new UNISWAP.Token(chainId, tokenAddress, decimals, 'DAI', 'DAI Stablecoin');
console.log(DAI);
/**
 * Output (Example):
 * Token {
 *  decimals:18,
 *  symbol:'DAI',
 *  name:'DAI Stablecoin',
 *  chainId:1,
 *  address:'0x6B175474E89094C44Da98b954EedeAC495271d0F'
 * }
 */

// ==================== //

async function trade() {
    const pair = await UNISWAP.Fetcher.fetchPairData(DAI, UNISWAP.WETH[chainId]);
    console.log(pair);
    /**
     * Output (Example):
     * Pair {
     *  liquidityToken: Token {
     *       decimals:18,
     *       symbol:'UNI-V2',
     *       name:'Uniswap V2',
     *       chainId:1,
     *       address:'0xA478c2975Ab1Ea89c8196811F51A7B7Ade33eB11'
     *   },
     *  tokenAmounts: [
     *      TokenAmount: {
     *          numerator:[JSBI],
     *          denominator:[JSBI],
     *          currency:[Token],
     *          token:[Token]
     *      },
     *      TokenAmount: {
     *          numerator:[JSBI],
     *          denominator:[JSBI],
     *          currency:[Token],
     *          token:[Token]
     *      }
     *  ]
     * }
     */

    // ==================== //

    const route = new UNISWAP.Route([pair], UNISWAP.WETH[chainId]);
    const trade = new UNISWAP.Trade(route, new UNISWAP.TokenAmount(UNISWAP.WETH[chainId], 1000000000000000000), UNISWAP.TradeType.EXACT_INPUT);

    console.log("Variable 'route':");
    console.log(new Date());
    console.log(`Average price of 1 ETH: ${route.midPrice.toSignificant(6)} DAI($)`);
    console.log();
    /**
     * 1) Output (Example):
     *    2020-09-18T18:53:44.981Z
     *    Average price of 1 ETH: 371.054 DAI($)
     * 
     * 2) Output (Example):
     *    2024-08-17T20:53:58.517Z
     *    Average price of 1 ETH: 2615.41 DAI($)
     */

    // ==================== //

    console.log("Variable 'route':");
    console.log(new Date());
    console.log(`Average price of 1 ETH: ${route.midPrice.toSignificant(6)} DAI($)`);
    console.log(`Average price of 1 DAI: ${route.midPrice.invert().toSignificant(6)} ETH`);
    console.log();
    /**
     * 1) Output (Example):
     *    2020-09-18T18:57:11.360Z
     *    Average price of 1 ETH: 371.476 DAI($)
     *    Average price of 1 DAI: 0.00269197 ETH
     * 
     * 2) Output (Example):
     *    2024-08-17T20:58:35.432Z
     *    Average price of 1 ETH: 2615.41 DAI($)
     *    Average price of 1 DAI: 0.000382349 ETH
     */

    // ==================== //

    console.log("Variable 'trade':");
    console.log(new Date());
    console.log(`Average execution price of 1 ETH: ${trade.executionPrice.toSignificant(6)} DAI($)`);
    console.log(`Average execution price of 1 DAI: ${trade.executionPrice.invert().toSignificant(6)} ETH`);
    console.log();
    /**
     * 1) Output (Example):
     *    2020-09-18T19:01:12.312Z
     *    Average execution price of 1 ETH: 370.294 DAI($)
     *    Average execution price of 1 DAI: 0.00270056 ETH
     * 
     * 2) Output (Example):
     *    2024-08-17T21:07:33.653Z
     *    Average execution price of 1 ETH: 2606.53 DAI($)
     *    Average execution price of 1 DAI: 0.000383651 ETH
     */

    // ==================== //

    const slippageTolerance = new UNISWAP.Percent('50', '10000'); // It's 0.050% [1 bit(Percent) = 0.001%]
    const amountOutMin      =     trade.minimumAmountOut(slippageTolerance).raw;
    const path              =     [UNISWAP.WETH[chainId].address, DAI.address];
    const to                =     '';
    const deadline          =     Math.floor((Date.now() / 1000) / 60) + 60;
    const value             =     trade.inputAmount.raw;
}

// ==================== //

const execution = false;
if(execution) {
    setInterval(() => {    
        trade();
    }, 3000);
} else {
    trade();
}

// ==================== //

/**
 * Function 'Swap' in Solidity:
 * function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns(uint[] memory amounts);
 * function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable return(uint[] memory amounts);
 */

// ==================== //

