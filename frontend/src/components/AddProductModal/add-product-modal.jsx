import React,{useRef,useContext} from "react";
import Modal from "../modal/Modal";
import BlockchainContext from '../../context/blockchain.context';
const AddProductModal = (props) => {
    const context = useContext(BlockchainContext);
    console.log(context);
    const productName = useRef();
    const productQuantity = useRef();
    const price = useRef();
    const dateOfPlant = useRef();
    const _harvestDate = useRef();
    const imageURL = useRef();
    const mint = async(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL)=>{
        await props.contract.methods.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL).send({from: context.account})
        .once('receipt',()=>{
            const Products = context.contract.methods.totalCommodity().call();
            this.setState({
                agriProducts: Products,
                creating: !this.state.creating
            });
        })
    }
    const priceInKES = async (price) => {
        // convert KES to ETH. from KES to ETH
        const result = ((props.conversionVals.from / props.conversionVals.to) * price)
        return result;
    }
    const mintFormHandler = async (event) => {
        event.preventDefault();
        const owner = context.account;
        await mint(
            owner,
            productName.current.value,
            productQuantity.current.value,
            context.web3.utils.toWei(priceInKES(price.current.value).toString(),'ether').parseInt(),
            dateOfPlant.current.value,
            _harvestDate.current.value,
            imageURL.current.value
        );
    }
    return(
        <Modal>
            <header className='modal__header'>
                <h1>Add Product</h1>
            </header>
            <form onSubmit={mintFormHandler}>
                <section className='modal__content'>
                    <div className='modal__label'>
                        <label>Product Name</label>
                        <input placeholder='enter product Name' ref={productName} required type='text'/>
                    </div>
                    <div className='modal__label'>
                        <label>Product Quantity</label>
                        <input placeholder='enter product quantity in KG' ref={productQuantity} required type='number'/>
                    </div>
                    <div className='modal__label'>
                        <label>Price</label>
                        <input required type='number' ref={price} />
                    </div>
                    <div className='modal__label'>
                        <label>Image URL</label>
                        <input required type='text' ref={imageURL} />
                    </div>
                    <div className='modal__label'>
                        <label>Date Planted</label>
                        <input required type='date' ref={dateOfPlant} />
                    </div>
                    <div className='modal__label'>
                        <label>Harvest Date</label>
                        <input required type='date' ref={_harvestDate}/>
                    </div>
                </section>
                <section  className='modal__actions'>
                    <button onClick={props.addProductHandler} className='btn'>Cancel</button>
                    <button type='submit' className='btn'>MINT</button>
                </section>
            </form>
        </Modal>
    )
}
export default AddProductModal;