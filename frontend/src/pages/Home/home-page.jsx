import React from 'react';
import './home-page.css';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import MainNav from '../../components/Navigation/navigation';
import BodyContents from '../../components/body-contents/body-contents';
class Home extends React.Component {
    async componentDidMount(){
        await this.loadWeb3();
    }
    async loadWeb3(){
        const provider = await detectEthereumProvider();
        if(provider){
            console.log('Ethereum wallet connected');
            window.web3 = new Web3(provider);
        }else{
            console.log('No ethereum Wallet detected');
        }
    }
    render() {
        return(
            <div className='home-container'>
                <MainNav />
                <BodyContents/>
            </div>
        )
    }
}
export default Home;