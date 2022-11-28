import React from 'react';
import MainNav from '../../components/Navigation/navigation';
import './buy-item.css';
// import Chatter from '../../components/chat/chatter';
// import BlockchainContext from '../../context/blockchain.context';
function buyPage(){
    // const context = React.useContext(BlockchainContext);
    return(
        <div className="user__container">
            <MainNav/>
            <h1>This is the buyers Page</h1>
            <div className='buy__body'>
                <div>
                    <h1>This is the buyers Page</h1>
                    <h1>Mark As paid</h1>
                </div>
                {/* <Chatter/> */}
            </div>
        </div>
    )
}
export default buyPage;