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
import { io } from'socket.io-client';
const socket = io('http://127.0.0.1:8000/');
function HomePage(){
    const [creating,setCreating] = useState(false);
    const [userInfo,setuserInfo] = useState([]);
    const [viewProduct,setViewProduct] = useState(false);
    const [selectedProduct, setSelected] = useState(null);
    const [didPaid, setDidPaid] = useState({ address: '', product_name: '', isPaid: '' });
    const [conversionVals, setConversionVals] = useState({
        from: 0.000,
        to: 0.000
    })
    const context = useContext(BlockchainContext);
    useEffect(()=>{
        console.log('I rendered');
        setuserInfo(USER_INFO);
        fetch(`https://api.coinbase.com/v2/exchange-rates?currency=ETH`)
            .then(curr=>{
                return curr.json()
            }).then(res=>{
                // resolve(res.data.rates)
                setConversionVals({
                    from: res.data.rates['ETH'],
                    to: res.data.rates['KES']
                });
            }).catch(err=>{
                console.log(err);
            })
    },[]);
    function addProductHandler(){
        setCreating(!creating);
    }
    socket.on('connect', () => {
        console.log("User connected");
        socket.on('receipientRelease', (msg) => {
            console.log('message received is: ',msg);
            console.log(msg);
            setDidPaid({
                address: msg.address,
                product_name: msg.prodName,
                isPaid: msg.isPaid
            });
            // console.log(msgd);
            // console.log({
            //     address: msg.address,
            //     product_name: prName,
            //     isPaid: msg.isPaid
            // });
        })
    })
    function viewProductHandler(count){
        if(count !== null){
            const product = context.agriProducts.filter(e=>e.count.toString()===count.toString());
            if(product !==null){
                setSelected(product)
            }
        }
        setViewProduct(!viewProduct);
    }
    async function sellProductHandler(address, count) {
        console.log("sending data to transfer a file");
        console.log(context.account, address);
        console.log(count);
        const result = await context.contract.methods.transferFrom(context.account, address, count-1).send({ from: context.account });
        console.log(result);
    }
    function buyProductHandler(count) {
        console.log(context.agriProducts.filter(e=>e.count.toString()===count.toString())[0]._owner);
        // metamask window to prompt user to buy product
        context.web3.eth.sendTransaction({
            from: context.account,
            to: context.agriProducts.filter(e=>e.count.toString()===count.toString())[0]._owner,
            value: context.web3.utils.toWei(context.agriProducts.filter(e=>e.count.toString()===count.toString())[0].price.toString(), 'ether')

        }).on('transactionHash', function (hash) {
            console.log(hash);
        }).on('receipt', function (receipt) {
            socket.emit('buyerPaid', {
                isPaid: true,
                address: context.account,
                prodName: context.agriProducts.filter(e=>e.count.toString()===count.toString())[0].product_name
            });
            console.log(receipt);
        }).on('confirmation', function (confirmationNumber, receipt) {
            console.log(confirmationNumber);
            console.log(receipt);
        }).on('error', console.error);
    }
    return(
        <>
            <div className='home-container'>
                <MainNav didPaid={didPaid} />
                {
                    userInfo.filter(e => e.address === context.account)[0] && (
                        console.log(context.account, ),
                        <AddProduct addProductHandler={addProductHandler} />
                    )
                }
                <BodyContents sellProductHandler={sellProductHandler} viewProductHandler={viewProductHandler} userLoggedIn={context.account} conversionVals={conversionVals} products={context.agriProducts} />
            </div>
            {
                (creating || viewProduct) &&(
                    <Backdrop/>
                )
            }
            {
                (creating || viewProduct) &&(
                    <AddProductModal addProductHandler={addProductHandler} conversionVals={conversionVals} contract={context.contract} />
                )
            }
            {
                (viewProduct && selectedProduct) &&(
                    <ViewProductModal buyProductHandler={buyProductHandler} viewProductHandler = {viewProductHandler} selectedProduct = {selectedProduct}/>
                )
            }
        </>
    )
}
export default HomePage;