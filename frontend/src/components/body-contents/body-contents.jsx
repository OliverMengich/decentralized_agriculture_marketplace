import React from "react";
import './body-contents.css';
function NameOwner(userInfo,address){
    const user = userInfo.filter(e=>e.address===address)
    return user[0]
}
function BodyContents({products, userInfo,userLoggedIn,viewProductHandler}){
    return(
        <section>
            {
                products.length !==0?(
                products.map(product=>{
                    return(
                        <div key={product.count} className="body-contents">
                            <img src={require('./lourdes.jpg')} alt="product"/>
                            <h4>{product.product_name}</h4>
                            <h4>{product.product_quantity} Kilograms</h4>
                            <div className="price__contents">
                                <h5>Price:    {product.price}</h5>
                                <img src={require("./ethereum.png")} alt="eth"/>
                            </div>
                            <div className='user__name'>
                               <img src={require('./placeholder.png')} alt='verified'/>
                                <p>{NameOwner(userInfo,product._owner).location}</p>
                            </div>
                            <div className='user__name'>
                                <h4>Owner: </h4>
                                <div className='user__name'>
                                    <h4>{NameOwner(userInfo,product._owner).name}</h4>
                                    {
                                        NameOwner(userInfo,product._owner).verified &&(
                                            <img src={require('./verified.png')} alt='verified'/>
                                        )
                                    }
                                </div>
                            </div>
                            <p>Date Planted: {product._dateOfPlant}</p>
                            <p>Date Harvested: {product._harvestDate} </p>
                            {
                                (product._owner !== userLoggedIn) &&(
                                    <button onClick={viewProductHandler.bind(this,product.count)} className="btn">View</button>
                                )
                            }
                        </div>
                    )
                })
                ) : (<h1>No products found</h1>)
            }
            
        </section>
    )
}
export default BodyContents;