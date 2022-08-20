import React from 'react';
import './vendors.css';
import MainNav from '../../components/Navigation/navigation';
import Modal from '../../components/modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import USER_INFO from '../Home/users.data';
import UserProfile from '../../components/UserProfile/users.components';
class Vendors extends React.Component{
    state={
        viewInfo: false,
        userInfo: USER_INFO
    }
    viewButtonClickedHandler=()=>{
        this.setState({
            viewInfo: !this.state.viewInfo
        })
    }
    render() {
        return(
            <div className='vendors__container'>
                <MainNav/>
                <h1>This is the vendors page</h1>
                <UserProfile userInfo = {this.state.userInfo}  viewButtonClickedHandler = {this.viewButtonClickedHandler}/>
                {
                    this.state.viewInfo &&(
                        <Backdrop/>
                    )
                }
                {
                    this.state.viewInfo &&(
                        <Modal>
                            <header className='modal__header'>
                                <h1>Oliver Kipkemei</h1>
                            </header>
                            <section className='modal__content'>
                                <img src={require('./lourdes.jpg')} alt="user"/>
                                <div className='user__name'>
                                    <h4>Oliver Kipkemei</h4>
                                    <img src={require('./verified.png')} alt='verified'/>
                                </div>
                                <p>Address: 0x3cA53BA2F7C5df7A46389691c4e1B60Ce0BF4487</p>
                                <p>Sell Onions, Mangoes, Beans, potatoes</p>
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