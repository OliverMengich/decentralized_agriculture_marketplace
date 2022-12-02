import React,{useState,useRef,useContext,useEffect} from "react";
import './body-contents.css';
import userInfo from "../../pages/Home/users.data";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../modal/Modal";
import BlockchainContext from "../../context/blockchain.context";
function BodyContents({ products, userLoggedIn, viewProductHandler, sellProductHandler, conversionVals }) {
    //converts from ETH to KES
    const [conversionVals, setConversionVals] = useState({
        from: 0.000,
        to: 0.000
    })
    const context = useContext(BlockchainContext);
    const NameOwner =(address)=>{
        const user = userInfo.filter(e=>e.address===address)
        return user[0]
    }
    const priceInKES = async (price) => {
        const result = ((conversionVals.to / conversionVals.from) * price)
        let KES = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'KES'
        })
        return KES.format(result);
    }
    const address = useRef('');
    const [toggler, setToggler] = useState(false);
    const [count1, setCount1] = useState(0);
    function sell(count) {
        setCount1(count)
        setToggler(!toggler)
    }
    return (
        <section>
            {
                toggler && (
                    <Backdrop/>
                )
            },
            {
                toggler && (
                    <Modal>
                        <div className="modal__header">
                            <h1>Enter Address you want to sell to</h1>
                        </div>
                        <form onSubmit={e => { console.log(address.current.value, count1); e.preventDefault(); setToggler(!toggler); sellProductHandler(address.current.value,count1)}} action="">
                            <div className="modal__content">
                                <div className="modal__label">
                                <label>Address</label>
                                <input width='200px' placeholder='enter product Name' ref={address} required type='text'/>
                            </div>
                            </div>
                            <section  className='modal__actions'>
                                <button onClick={e=>setToggler(!toggler)} className='btn'>Cancel</button>
                                <button type='submit' className='btn'>BUY</button>
                            </section>
                        </form>
                   </Modal>
                )
            },
            {
                
                products.length !==0?(
                    products.map(product => {
                        console.log(product);
                        return(
                            <div key={product.count} className="body-contents">
                                <img src={product.imageUrl} alt="product"/>
                                <h4>{product.product_name}</h4>
                                <h4>{product.product_quantity} Kilograms</h4>
                                <div className="price__contents">
                                    <h5>Price: {priceInKES(product.price)}</h5>
                                    {/* <img src={require("./ethereum.png")} alt="eth"/> */}
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
                                {
                                    (product._owner === userLoggedIn) && (
                                        // onClick={sellProductHandler.bind(this,product.count)}
                                        <button onClick={sell.bind(this,product.count)}  className="btn">SELL</button>
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