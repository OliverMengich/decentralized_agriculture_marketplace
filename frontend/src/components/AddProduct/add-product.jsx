import React from 'react';
import './add-product.css';
function AddProduct(props){
    return (
        <div className='add-product'>
            <button onClick={props.addProductHandler} className='btn'> &#43;Add Product</button>
        </div>
    )
}
export default AddProduct;