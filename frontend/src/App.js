import React from 'react';
import './App.css';
import AgriBlock from '../src/abis/AgriBlock.json'
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3'
import Home from './pages/Home/home-page';
import UserAccount from './pages/User_Account/user-account';
import Vendors from './pages/Vendors/vendors';
import BlockchainContext from './context/blockchain.context';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
class App extends React.Component {
  async componentDidMount(){
    await this.loadWeb3();
  }
  state={
    web3Window: null,
    account: null,
    contract: null,
    agriProducts: []
  }
  async loadWeb3(){
    const provider = await detectEthereumProvider();
    if(provider){
      window.web3 = new Web3(provider);
      await this.loadBlockchainData();
    }else{
      window.web3 =null;
      alert('PLEASE INSTALL METAMASK!!')
    }
  }
  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.requestAccounts();
    console.log(accounts);
    this.setState({account:accounts[0]})
    const networkId = await web3.eth.net.getId();
    const networkData = AgriBlock.networks[networkId];
    if(networkData){
      const abi = AgriBlock.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi,address);
      // await this.setState({contract});
      const Products = await contract.methods.totalCommodity().call();
      await this.setState({
        contract,
        agriProducts: Products
      });
    }
    else {
        window.alert('Smart contract not deployed')
    }
}
  render() {
    return (
      <BrowserRouter>
        <BlockchainContext.Provider
          value={{
            account: this.state.account,
            contract: this.state.contract,
            agriProducts: this.state.agriProducts
          }}
          >
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/user' element={<UserAccount/>} />
            <Route path='/vendors' element={<Vendors/>} />
          </Routes>
        </BlockchainContext.Provider>
      </BrowserRouter>

    );
  }
}

export default App;
