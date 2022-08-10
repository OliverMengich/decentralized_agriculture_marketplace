import React from "react";
import './body-contents.css'
function BodyContents(){
    return(
        <section>
            <div className="body-contents">
                <img src={require('./lourdes.jpg')} alt="product"/>
                <h4>Beans</h4>
                <div className='user__name'>
                    <img src={require('./placeholder.png')} alt='verified'/>
                    <p>Transzoia</p>
                </div>
                <div className='user__name'>
                    <h4>Owner:</h4>
                    <div className='user__name'>
                        <h4>Oliver Kipkemei</h4>
                        <img src={require('./verified.png')} alt='verified'/>
                    </div>
                </div>
                <div className="price__contents">
                    <h5>Price: 0.01</h5>
                    <img src={require("./ethereum.png")} alt="eth"/>
                </div>
                <button className="btn">View</button>
            </div>
        </section>
    )
}
export default BodyContents;