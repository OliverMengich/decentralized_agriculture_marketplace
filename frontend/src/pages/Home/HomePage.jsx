import React,{useContext, useEffect, useState} from 'react';
import './home-page.css';
import MainNav from '../../components/Navigation/navigation';
import BodyContents from '../../components/body-contents/body-contents';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddProduct from '../../components/AddProduct/add-product';
import USER_INFO from './users.data';
import BlockchainContext from '../../context/blockchain.context';
import AddProductModal from '../../components/AddProductModal/add-product-modal';
import ViewProductModal from '../../components/ViewProductModal/view-product';
function HomePage(){
    const [creating,setCreating] = useState(false);
    const [userInfo,setuserInfo] = useState([]);
    const [viewProduct,setViewProduct] = useState(false);
    const [selectedProduct,setSelected] = useState(null);
    const context = useContext(BlockchainContext);
    useEffect(()=>{
        console.log('I rendered');
        setuserInfo(USER_INFO)
    },[]);
    function addProductHandler(){
        setCreating(!creating);
    }
    function viewProductHandler(count){
        if(count !== null){
            const product = context.agriProducts.filter(e=>e.count.toString()===count.toString());
            if(product !==null){
                setSelected(product)
            }
        }
        setViewProduct(!viewProduct);
    }
    return(
        <>
            <div className='home-container'>
                <MainNav/>
                {
                    userInfo.filter(e=>e.address===context.account) &&(
                        <AddProduct addProductHandler={addProductHandler} />
                    )
                }
                <BodyContents viewProductHandler={viewProductHandler} userLoggedIn={context.account} products={context.agriProducts} />
            </div>
            {
                (creating || viewProduct) &&(
                    <Backdrop/>
                )
            }
            {
                (creating || viewProduct) &&(
                    <AddProductModal addProductHandler={addProductHandler} contract={context.contract} />
                )
            }
            {
                (viewProduct && selectedProduct) &&(
                    <ViewProductModal viewProductHandler = {viewProductHandler} selectedProduct = {selectedProduct}/>
                )
            }
        </>
    )
}
export default HomePage;