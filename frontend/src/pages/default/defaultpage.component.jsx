import React from "react";
import MainNav from "../../components/Navigation/navigation";
import './defaultpage.component.css';
function Defaultpage() {
    return (
        <div className="home-container">
            <MainNav didPaid={{ address: '', product_name: '', isPaid: false }} />
            <img className="backgroundImage" src={require('./market1.avif')} alt="" />
            <div className="home-body">
                {/* image at backgroud of this div */}
                <div className="home-body-content">
                    <h1 className="home-body-content-title">Welcome to AgriChain</h1>
                    <p className="home-body-content-para">AgriChain is a decentralized application that allows farmers, wholesalers, Shopkeepers and Other Vendors to sell their products directly to consumers without the need for a middleman. AgriChain is built on the Ethereum blockchain that is decentralized and links consumers and sellers in a peer to peer network and uses smart contracts to ensure that the farmer gets paid for their products.</p>
                </div>
            </div>


        </div>
    )
}
export default Defaultpage;