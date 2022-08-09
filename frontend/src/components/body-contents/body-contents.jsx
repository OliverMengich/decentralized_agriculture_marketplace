import React from "react";
import './body-contents.css'
function BodyContents(){
    return(
        <section>
            <div className="body-contents">
                <img src={require('./lourdes.jpg')} alt="product"/>
                <h4>Beans</h4>
                <p>100kg beans from Tranzoia</p>
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