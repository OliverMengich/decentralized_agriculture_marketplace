import React from 'react';
import './home-page.css';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3'
import MainNav from '../../components/Navigation/navigation';
import BodyContents from '../../components/body-contents/body-contents';
import AgriBlock from '../../abis/AgriBlock.json';
import Modal from '../../components/modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddProduct from '../../components/AddProduct/add-product';
class Home extends React.Component {
    async componentDidMount(){
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract:null,
            totalSupply:0,
            agriProducts:[],
            creating: false
        }
        this.productName = React.createRef();
        this.productQuantity = React.createRef();
        this.price = React.createRef();
        this.dateOfPlant = React.createRef();
        this._harvestDate = React.createRef();
   }
    async loadWeb3(){
        const provider = await detectEthereumProvider();
        if(provider){
            console.log('Ethereum wallet connected');
            window.web3 = new Web3(provider);
        }else{
           alert('PLEASE INSTALL METAMASK!!')
        }
    }
    async loadBlockchainData(){
        const web3 = window.web3
        const accounts = await web3.eth.requestAccounts()
        console.log(accounts);
        this.setState({account:accounts[0]})
        console.log('contract address is '+accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = AgriBlock.networks[networkId];
        if(networkData){
            const abi = AgriBlock.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi,address);
            await this.setState({contract});
            // console.log(this.state);
            const Products = await contract.methods.totalCommodity().call();
            console.log(Products);
            await this.setState({
                agriProducts: Products
            },
            ()=>{
                console.log(this.state);
            });
            
        }
        else {
            window.alert('Smart contract not deployed')
        }
    }
    async mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate){
        await this.state.contract.methods.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate).send({from: this.state.account})
        .once('receipt',()=>{
            this.setState({
                agriProducts:[...this.state.agriProducts, AgriBlock],
                creating: !this.state.creating
            })
        })
        console.log(this.state)
    }
    addProductHandler=()=>{
        this.setState({
            creating: !this.state.creating
        })
    }
    mintFormHandler=async (event)=>{
        event.preventDefault();
        console.log('you submitted form ready to mint');
        const owner = this.state.account;
        const productName = this.productName.current.value;
        const productQuantity = this.productQuantity.current.value;
        const price = this.price.current.value;
        const dateOfPlant = this.dateOfPlant.current.value;
        const _harvestDate = this._harvestDate.current.value;
        console.log(owner,productName,productQuantity,price,_harvestDate);
        await this.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate);
    }
    render() {
        return(
            <React.Fragment>
                <div className='home-container'>
                    <MainNav />
                    <AddProduct/>
                    <BodyContents products={this.state.agriProducts} />
                    
                </div>
                {
                    this.state.creating &&(
                        <Backdrop/>
                    )
                }
                {
                    this.state.creating &&(
                        <Modal>
                            <header className='modal__header'>
                                <h1>Add Product</h1>
                            </header>
                            <form onSubmit={this.mintFormHandler}>
                                <section className='modal__content'>
                                    <div className='modal__label'>
                                        <label>Owner</label>
                                        <input required value={this.state.account} disabled/>
                                    </div>
                                    <div className='modal__label'>
                                        <label>Product Name</label>
                                        <input placeholder='enter product Name' ref={this.productName} required type='text'/>
                                    </div>
                                    <div className='modal__label'>
                                        <label>Product Quantity</label>
                                        <input placeholder='enter product quantity in KG' ref={this.productQuantity} required type='number'/>
                                    </div>
                                    <div className='modal__label'>
                                        <label>Price</label>
                                        <input required type='number' ref={this.price} />
                                    </div>
                                    <div className='modal__label'>
                                        <label>Date Planted</label>
                                        <input required type='date' ref={this.dateOfPlant} />
                                    </div>
                                    <div className='modal__label'>
                                        <label>Harvest Date</label>
                                        <input required type='date' ref={this._harvestDate}/>
                                    </div>
                                </section>
                                <section  className='modal__actions'>
                                    <button onClick={this.addProductHandler} className='btn'>Cancel</button>
                                    <button type='submit' className='btn'>MINT</button>
                                </section>
                            </form>
                        </Modal>
                    )
                }
            </React.Fragment>
        )
    }
}
export default Home;