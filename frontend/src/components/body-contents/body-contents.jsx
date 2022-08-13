import React from "react";
import './body-contents.css';
function NameOwner(userInfo,address){
    const user = userInfo.filter(e=>e.address===address)
    return user[0]
}
function BodyContents({products, userInfo,userLoggedIn}){
    return(
        <section>
            {
                products.map(product=>{
                    return(
                        <div key={product.count} className="body-contents">
                            <img src={require('./lourdes.jpg')} alt="product"/>
                            <h4>{product.product_name}</h4>
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
                            <div className="price__contents">
                                <h5>Price:    {product.price}</h5>
                                <img src={require("./ethereum.png")} alt="eth"/>
                            </div>
                            {
                                (product._owner !== userLoggedIn) &&(
                                    <button className="btn">View</button>
                                )
                            }
                            
                        </div>
                    )
                })
                
            }
            
        </section>
    )
}
export default BodyContents;