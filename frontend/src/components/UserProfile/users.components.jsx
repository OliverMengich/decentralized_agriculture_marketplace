import React from "react";
import './user.component.css';
function UserProfile(props){
    console.log(props.userInfo)
    return (
        <section>
            {
                props.userInfo.map(user=>{
                    return(
                        <div className="body-contents">
                            <img src={require('./lourdes.jpg')} alt="product"/>
                            <div className='user__name'>
                                <h4>{user.name}</h4>
                                {
                                    user.verified &&(
                                        <img style={{ cursor:'pointer' }} src={require('./verified.png')} alt='verified'/>
                                    )
                                }
                            </div>
                            <div className='user__name'>
                                <img src={require('./placeholder.png')} alt='verified'/>
                                <p>{user.location}</p>
                            </div>
                            <div className='user__name'>
                                <img src={require('./farmer.png')} alt='verified'/>
                                <p> {user.farmer} Farmer</p>
                            </div>
                            <p>{user.trades} Successfull Trades</p>
                            <p>Contact: {user.contact}</p>
                            <button onClick={props.viewButtonClickedHandler} className="btn">View</button>
                        </div>
                    )
                })
            }
            
        </section>
    )
}
export default UserProfile;