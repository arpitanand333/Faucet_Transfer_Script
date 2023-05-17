const { ethers, BigNumber } = require("ethers");

let rpcURLs = [
  //"https://rpc.testnet.tomochain.com",
  //"https://testnet-fx-json-web3.functionx.io:8545",
  //"https://rpc.testnet.fantom.network/"
  //"https://rpc-testnet.dogechain.dog/"
  //"https://testnet-archive.plexnode.wtf"
  //"https://rpc-testnet.kcc.network"
  "https://astar.public.blastapi.io"
  // "https://yolo-powerful-seed.bsc-testnet.discover.quiknode.pro/e67417cdf286a0a5426f6c99ec31f33eec4ae99d/",
   //"https://alfajores-forno.celo-testnet.org",
  // "https://api.avax-test.network/ext/bc/C/rpc",
   //"https://rpc.testnet.moonbeam.network",
  // "https://data-seed-prebsc-1-s1.binance.org:8545/",
  // "https://eth-goerli.g.alchemy.com/v2/barNHxwKcvdxJuDoKlbor5qx6mhT2C_O",
  // "https://polygon-mumbai.g.alchemy.com/v2/cT-GOwz9bmgYuI3PVjXIDAQvUZH3_uwZ",
  //  "https://yolo-powerful-seed.bsc-testnet.discover.quiknode.pro/e67417cdf286a0a5426f6c99ec31f33eec4ae99d/",
  // "https://alfajores-forno.celo-testnet.org",
  //"https://rpc.testnet.moonbeam.network",
  // "https://api.avax-test.network/ext/bc/C/rpc",
  // "https://rpc-testnet.dogechain.dog",
   //"https://evm-t3.cronos.org",
   
  //"https://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/rpc"
];


let walletPrivateKeys = [
  "Paste private key of sender's address"
]

let receiverAddress = "0x2e1d90501C3173367ecC6a409Fb1b588Bf3C16A5";

const temp = async () => {
  for (let i = 0; i < rpcURLs.length; i++) {
    const provider = new ethers.providers.JsonRpcBatchProvider(
      rpcURLs[i]
    );
    console.log(rpcURLs[i])

    for (let j = 0; j < walletPrivateKeys.length; j++) {
      console.log(j + 1)
      let wallet = new ethers.Wallet(walletPrivateKeys[j], provider);
      let userBalance = await provider.getBalance(wallet.address);
      console.log(userBalance);
      if (userBalance > 100) {
        const gasPrice = await provider.getGasPrice();
        console.log(gasPrice.toString())
        let amountToSend = (userBalance - gasPrice * 210000).toString();
        console.log(amountToSend, userBalance);
        // if(amountToSend > 1000000){
        let tx = {
          to: receiverAddress,
          value: BigNumber.from(amountToSend),
          gasLimit: 21000,
        };
        let res = await wallet.sendTransaction(tx).catch((err) => { console.log(err) });
        console.log(res.hash);
        // }
      }
    }
  }
};
temp();



