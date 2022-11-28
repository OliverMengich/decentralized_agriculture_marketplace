import React from 'react';
import './vendors.css';
import MainNav from '../../components/Navigation/navigation';
import Modal from '../../components/modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import USER_INFO from '../Home/users.data';
import UserProfile from '../../components/UserProfile/users.components';
import BlockchainContext from '../../context/blockchain.context';
class Vendors extends React.Component{
    state={
        viewInfo: false,
        userInfo: USER_INFO,
        selectedUser: null
    }
    static contextType = BlockchainContext;
    viewButtonClickedHandler=(count)=>{
        if(count){
            console.log(count)
        }
        this.setState({
            viewInfo: !this.state.viewInfo,
            selectedUser: this.state.userInfo.filter(e=>e.id.toString()===count.toString())
        },()=>{console.log(this.state.selectedUser[0])})
    }
    render() {
        return(
            <div className='vendors__container'>
                <MainNav didPaid={{address: '', product_name: '',isPaid: false}}/>
                <h1>This is the vendors page</h1>
                <UserProfile context = {this.context} userInfo = {this.state.userInfo}  viewButtonClickedHandler = {this.viewButtonClickedHandler}/>
                {
                    this.state.viewInfo &&(
                        <Backdrop/>
                    )
                }
                {
                    this.state.viewInfo && this.state.selectedUser && (
            
                        <Modal>
                            <header className='modal__header'>
                                <h1>{ this.state.selectedUser[0].name }</h1>
                            </header>
                            <section className='modal__content'>
                                <img src={this.state.selectedUser[0].imageUrl} alt="user"/>
                                <div className='user__name'>
                                    <h4>{ this.state.selectedUser[0].name }</h4>
                                    { this.state.selectedUser[0].verified? <img src={require('./verified.png')} alt='verified'/> : ''}
                                </div>
                                <p>Address: { this.state.selectedUser[0].address }</p>
                                <p>Sells: { this.state.selectedUser[0].farmer }</p>
                            </section>
                            <section  className='modal__actions'>
                                <button onClick={this.viewButtonClickedHandler} className='btn'>Cancel</button>
                            </section>
                        </Modal>
                    )
                }
            </div>
        )
    }
}
export default Vendors;