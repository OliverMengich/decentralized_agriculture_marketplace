import React from 'react';
import './home-page.css';
import MainNav from '../../components/Navigation/navigation';
import BodyContents from '../../components/body-contents/body-contents';
import Modal from '../../components/modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddProduct from '../../components/AddProduct/add-product';
import USER_INFO from './users.data';
import BlockchainContext from '../../context/blockchain.context';
class Home extends React.Component {
    static contextType = BlockchainContext;
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            userInfo: USER_INFO,
            viewProduct: false
        }
        this.productName = React.createRef();
        this.productQuantity = React.createRef();
        this.owner = React.createRef();
        this.price = React.createRef();
        this.dateOfPlant = React.createRef();
        this._harvestDate = React.createRef();
    }
    async mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate){
        await this.context.contract.methods.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate).send({from: this.state.account})
        .once('receipt',()=>{
            const Products = this.context.contract.methods.totalCommodity().call();
            this.setState({
                agriProducts: Products,
                creating: !this.state.creating
            });
        })
    }
    addProductHandler=()=>{
        this.setState({
            creating: !this.state.creating
        })
    }
    mintFormHandler=async (event)=>{
        event.preventDefault();
        const owner = this.owner.current.value;
        const productName = this.productName.current.value;
        const productQuantity = this.productQuantity.current.value;
        const price = this.price.current.value;
        const dateOfPlant = this.dateOfPlant.current.value;
        const _harvestDate = this._harvestDate.current.value;
        console.log(owner,productName,productQuantity,_harvestDate);
        await this.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate);
    }
    viewProductHandler=()=>{
        this.setState({
            viewProduct: !this.state.viewProduct
        })
    }
    render() {
        return(
            <React.Fragment>
                <div className='home-container'>
                    <MainNav />
                    {
                        this.state.userInfo.filter(e=>e.address===this.state.account) &&(
                            <AddProduct addProductHandler={this.addProductHandler}/>
                        )
                    }
                    <BodyContents viewProductHandler={this.viewProductHandler} userLoggedIn={this.context.account} userInfo={this.state.userInfo} products={this.context.agriProducts} />
                    
                </div>
                {
                    (this.state.creating || this.state.viewProduct) &&(
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
                                        <input required ref={this.owner} type='text' />
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
                                        <label>Image URL</label>
                                        <input required type='file' ref={this.imageURL} />
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
                {
                    this.state.viewProduct &&(
                        <Modal>
                            <header className='modal__header'>
                                <h1>View Product</h1>
                            </header>
                            <section className='modal__content'>
                                <h2>Product description</h2>
                                <div className='user__name'>
                                    <h4>Mangoes</h4>
                                    {/* <img src={require('./verified.png')} alt='verified'/> */}
                                </div>
                                <div className='user__name'>
                                    <label>Owner:  </label>
                                    <p>Oliver Kipkemei</p>
                                </div>
                                <div className='user__name'>
                                    <label>Location:  </label>
                                    <p>Nyeri</p>
                                </div>
                                <div className='user__name'>
                                    <label>Date Planted:  </label>
                                    <p>Nyeri</p>
                                </div>
                                <div className='user__name'>
                                    <label>Date Harvested:  </label>
                                    <p>Nyeri</p>
                                </div>
                            </section>
                            <section  className='modal__actions'>
                                <button onClick={this.viewProductHandler} className='btn'>Cancel</button>
                                <button type='submit' className='btn'>BUY</button>
                            </section>
                            
                        </Modal>
                    )
                }
            </React.Fragment>
        )
    }
}
export default Home;