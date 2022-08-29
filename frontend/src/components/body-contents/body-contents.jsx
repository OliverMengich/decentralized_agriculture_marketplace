import React from "react";
import './body-contents.css';
import userInfo from "../../pages/Home/users.data";

function BodyContents({products,userLoggedIn,viewProductHandler}){
    const NameOwner =(address)=>{
        const user = userInfo.filter(e=>e.address===address)
        return user[0]
    }
    
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
                                    <p>{NameOwner(product._owner).location}</p>
                                </div>
                                <div className='user__name'>
                                    <h4>Owner: </h4>
                                    <div className='user__name'>
                                        <h4>{NameOwner(product._owner).name}</h4>
                                        {
                                            NameOwner(product._owner).verified &&(
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
                ) : (<h1>You dont have any Product. Purchase or register as a Farmer</h1>)
            }
            
        </section>
    )
}
export default BodyContents;