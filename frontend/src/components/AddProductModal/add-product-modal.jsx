import React,{useRef} from "react";
import Modal from "../modal/Modal";
const AddProductModal = (props)=>{
    const productName = useRef();
    const productQuantity = useRef();
    const price = useRef();
    const dateOfPlant = useRef();
    const _harvestDate = useRef();
    const imageURL = useRef();
    const mint = async(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL)=>{
        await props.contract.methods.mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL).send({from: this.context.account})
        .once('receipt',()=>{
            const Products = this.context.contract.methods.totalCommodity().call();
            this.setState({
                agriProducts: Products,
                creating: !this.state.creating
            });
        })
    }
    const mintFormHandler=async (event)=>{
        event.preventDefault();
        const owner = this.context.account;
        const productName = this.productName.current.value;
        const productQuantity = this.productQuantity.current.value;
        const price = this.price.current.value;
        const dateOfPlant = this.dateOfPlant.current.value;
        const _harvestDate = this._harvestDate.current.value;
        const imageURL = this.imageURL.current.value
        console.log(owner,productName,productQuantity,_harvestDate,imageURL);
        await mint(owner,productName,productQuantity,price,dateOfPlant,_harvestDate,imageURL);
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