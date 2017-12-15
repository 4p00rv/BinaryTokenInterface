import { MiniMeTokenAbi } from '../minime/build/MiniMeToken.sol';
import Session from '../models/SessionStorage';

const getContract = () => {
  const tokenAddress = Session.storage.get('tokenAddress');
  if(web3 && tokenAddress) {
    if(web3.eth.contract) {
      return web3.eth.contract(MiniMeTokenAbi).at(tokenAddress);
    }
  } else {
    if(!tokenAddress) {
      throw 'Mr. Holmes couldn\'t find the contract.';
    } else {
      throw 'Is MetaMask installed?';
    }
  }
}

export default getContract;
