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
            viewProduct: false,
            selectedProduct: null,
            navigateToBuyPage: false
        }
        this.productName = React.createRef();
        this.productQuantity = React.createRef();
        this.price = React.createRef();
        this.dateOfPlant = React.createRef();
        this._harvestDate = React.createRef();
        this.imageURL = React.createRef();
    }
    async mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL){
        await this.context.contract.methods.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL).send({from: this.context.account})
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
        const owner = this.context.account;
        const productName = this.productName.current.value;
        const productQuantity = this.productQuantity.current.value;
        const price = this.price.current.value;
        const dateOfPlant = this.dateOfPlant.current.value;
        const _harvestDate = this._harvestDate.current.value;
        const imageURL = this.imageURL.current.value
        console.log(owner,productName,productQuantity,_harvestDate,imageURL);
        await this.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL);
    }
    viewProductHandler=(count)=>{
        if(count !== null){
            console.log(count);
            const product = this.context.agriProducts.filter(e=>e.count.toString()===count.toString());
            // console.log(product);
            if(product !==null){
                this.setState({
                    selectedProduct: product
                },()=>{
                    console.log(this.state)
                })
            }
        }
        this.setState({
            viewProduct: !this.state.viewProduct
        })
    }
    NameOwner = (address) =>{
        const user = this.state.userInfo.filter(e=>e.address===address)
        return user[0]
    }
    render() {
        console.log(this.context)
        return(
            <React.Fragment>
                <div className='home-container'>
                    <MainNav />
                    {
                        this.state.userInfo.filter(e=>e.address===this.state.account) &&(
                            <AddProduct addProductHandler={this.addProductHandler}/>
                        )
                    }
                    <BodyContents viewProductHandler={this.viewProductHandler} userLoggedIn={this.context.account} products={this.context.agriProducts} />
                    
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
                                        <input required type='text' ref={this.imageURL} />
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
                    (this.state.viewProduct && this.state.selectedProduct) &&(
                        <Modal>
                            <header className='modal__header'>
                                <h1>View Product</h1>
                            </header>
                            <section className='modal__content'>
                                <h2>{this.state.selectedProduct[0].product_name}</h2>
                                <div className='user__name'>
                                    <label>Price:  </label>
                                    <h4>{this.state.selectedProduct[0].price}</h4>
                                </div>
                                <div className='user__name'>
                                    <label>Owner:  </label>
                                    <h4>{this.NameOwner(this.state.selectedProduct[0]._owner).name}</h4>
                                </div>
                                <div className='user__name'>
                                    <label>Location:  </label>
                                    <h4>{this.NameOwner(this.state.selectedProduct[0]._owner).location}</h4>
                                </div>
                                <div className='user__name'>
                                    <label>Contact:  </label>
                                    <h4>{this.NameOwner(this.state.selectedProduct[0]._owner).contact}</h4>
                                </div>
                                <div className='user__name'>
                                    <label>Date Harvested: </label>
                                    <h4>{this.state.selectedProduct[0]._harvestDate}</h4>
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