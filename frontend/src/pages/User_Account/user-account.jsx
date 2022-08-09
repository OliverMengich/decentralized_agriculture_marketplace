import React from "react";
import './user-account.css';
import MainNav from "../../components/Navigation/navigation";
class UserAccount extends React.Component{
    render(){
        return(
            <div className="user__container">
                <MainNav/>
                <h1>This is user Account</h1>
            </div>
        )
    }
}
export default UserAccount;