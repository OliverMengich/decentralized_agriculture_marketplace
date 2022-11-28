import React,{useContext,useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import './navigation.css';
import USER_INFO from "../../pages/Home/users.data";
import BlockchainContext from "../../context/blockchain.context";
function MainNav({ didPaid }) {
    console.log(didPaid);
    const context = useContext(BlockchainContext);
    const [userInfo, setuserInfo] = useState([]);
    useEffect(()=>{
        setuserInfo(USER_INFO)
    },[]);
    return(
        <header>
            <div className="logo">
                <h1>AgriChain</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    {
                        userInfo.filter(e => e.address === context.account)[0] && (
                            console.log(context.account,),
                            <li>
                                <Link to="/user">My Account</Link>
                            </li>
                        )
                    }
                    <li>
                        <Link to="/vendors">Vendors</Link>
                    </li>
                </ul>
            </nav>
            <div className="addressAccount">
                <button><span role='img' aria-label="donut" >&#128100;</span></button>
                {
                    didPaid.isPaid && (didPaid.address !== context.account) && (
                        <div className="popup__message">
                            <p to="/buy/:productCount">Address: { didPaid.address } has Paid!! release funds for { didPaid.product_name }</p>
                        </div>
                    )
                }
                
            </div>
        </header>
    )
}
export default MainNav;