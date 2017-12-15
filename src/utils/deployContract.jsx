import { MiniMeTokenAbi } from '../minime/build/MiniMeToken.sol';
import { MiniMeTokenByteCode } from '../minime/build/MiniMeToken.sol';
import { MiniMeTokenFactoryAbi } from '../minime/build/MiniMeToken.sol';
import { MiniMeTokenFactoryByteCode } from '../minime/build/MiniMeToken.sol';

async function deploy( tokenOptions ) {
    if (web3.isConnected()) {
        const MiniMeTokenFactory = getContract(MiniMeTokenFactoryAbi);
        const tokenFactory = await deployContract(MiniMeTokenFactory, [], MiniMeTokenFactoryByteCode);
        const MiniMeToken = getContract(MiniMeTokenAbi);
        const token = await deployContract(MiniMeToken,
            [
                tokenFactory.address, tokenOptions.parentToken,
                tokenOptions.parentSnapShotBlock, tokenOptions.tokenName,
                tokenOptions.decimalUnits, tokenOptions.tokenSymbol, tokenOptions.transfersEnabled
            ],
            MiniMeTokenByteCode
        );
        return [tokenFactory.address, token.address];
    }
}

function getContract (abi) {
    if(web3.eth.Contract) {
        return web3.eth.Contract(abi);
    } else {
        return web3.eth.contract(abi);
    }
}

function deployContract (contract, args, bytecode) {
    return new Promise((resolve, reject) => {
        contract.new(...args, {
            data: bytecode
        }, (err, res) => {
            if(res) {
                console.log("TransactionHash", res.transactionHash);
                if(res.address) {
                    resolve(res);
                } else {
                    getTransactionReceipt(res.transactionHash, resolve, reject);
                }
            } else {
                reject(err);
            }
        });
    });
}

// Synchronously waits for transaction to be confirmed.
function getTransactionReceipt( transactionHash, resolve, reject ) {
    web3.eth.getTransactionReceipt(transactionHash,
        (err, reciept) => {
            if(err) reject(err);

            if(reciept) {
                console.log(reciept);
                resolve({address: reciept.contractAddress});
            } else {
                setTimeout(() => getTransactionReceipt(transactionHash, resolve, reject), 5000);
            }
        });
}

export default {
    deploy
}
