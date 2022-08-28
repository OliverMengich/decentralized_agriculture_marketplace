import React from "react";
import userInfo from "../../pages/Home/users.data";
import Modal from "../modal/Modal";
const ViewProductModal = (props) =>{
    const NameOwner = (address) =>{
        const user = userInfo.filter(e=>e.address===address)
        return user[0]
    }
    return (
        <Modal>
            <header className='modal__header'>
                <h1>View Product</h1>
            </header>
            <section className='modal__content'>
                <h2>{props.selectedProduct[0].product_name}</h2>
                <div className='user__name'>
                    <label>Price:  </label>
                    <h4>{props.selectedProduct[0].price}</h4>
                </div>
                <div className='user__name'>
                    <label>Owner:  </label>
                    <h4>{NameOwner(props.selectedProduct[0]._owner).name}</h4>
                </div>
                <div className='user__name'>
                    <label>Location:  </label>
                    <h4>{NameOwner(props.selectedProduct[0]._owner).location}</h4>
                </div>
                <div className='user__name'>
                    <label>Contact:  </label>
                    <h4>{NameOwner(props.selectedProduct[0]._owner).contact}</h4>
                </div>
                <div className='user__name'>
                    <label>Date Harvested: </label>
                    <h4>{props.selectedProduct[0]._harvestDate}</h4>
                </div>
            </section>
            <section  className='modal__actions'>
                <button onClick={props.viewProductHandler} className='btn'>Cancel</button>
                <button type='submit' className='btn'>BUY</button>
            </section>
        </Modal>
    )
}
export default ViewProductModal;