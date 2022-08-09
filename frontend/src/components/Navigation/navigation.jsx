import React from "react";
import { Link } from 'react-router-dom';
import './navigation.css';
function MainNav(){
    return(
        <header>
            <div className="logo">
                <h1>AgriBlock</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user">My Account</Link>
                    </li>
                    <li>
                        <Link to="/vendors">Vendors</Link>
                    </li>
                </ul>
            </nav>
            <div className="addressAccount">
                <button>&#128100;</button>
            </div>
        </header>
    )
}
export default MainNav;