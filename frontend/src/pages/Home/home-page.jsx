import React from 'react';
import './home-page.css';
import MainNav from '../../components/Navigation/navigation';
import BodyContents from '../../components/body-contents/body-contents';
// import Modal from '../../components/modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddProduct from '../../components/AddProduct/add-product';
import USER_INFO from './users.data';
import BlockchainContext from '../../context/blockchain.context';
import AddProductModal from '../../components/AddProductModal/add-product-modal';
import ViewProductModal from '../../components/ViewProductModal/view-product';
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
    }
    addProductHandler=()=>{
        this.setState({
            creating: !this.state.creating
        })
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
                        <AddProductModal addProductHandler={this.addProductHandler} contract={this.context.contract} />
                    )
                }
                {
                    (this.state.viewProduct && this.state.selectedProduct) &&(
                        <ViewProductModal viewProductHandler = {this.viewProductHandler} selectedProduct = {this.state.selectedProduct}/>
                    )
                }
            </React.Fragment>
        )
    }
}
export default Home;