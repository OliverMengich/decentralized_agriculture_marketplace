import React from 'react';
import './vendors.css';
import MainNav from '../../components/Navigation/navigation';
class Vendors extends React.Component{
    render() {
        return(
            <div className='vendors__container'>
                <MainNav/>
                <h1>This is the vendors page</h1>
            </div>
        )
    }
}
export default Vendors;