import React,{useEffect,useState} from "react";
import './user-account.css';
import MainNav from "../../components/Navigation/navigation";
import BlockchainContext from "../../context/blockchain.context";
import BodyContents from "../../components/body-contents/body-contents";
function UserAccount (){
    const context = React.useContext(BlockchainContext);
    const [loading,setLoading] = useState(false);
    const [userProducts,setUserProducts] = useState([]);
    useEffect(()=>{
        const loadUserBalance = async()=>{
            if(context.contract !==null){
                setLoading(true);
                const userBalance = await context.contract.methods.balanceOf(context.account).call();
                setUserProducts(userBalance);
                setLoading(false);
            }
        }
        loadUserBalance();
    },[context.contract]);
    const viewProductHandler = ()=>{
        console.log('you clicked me!!');
    }
    return(
        <div className="user__container">
            <MainNav/>
            <h1>This is user Account</h1>
            {
                loading? (
                    <h1>Loading......</h1>
                ):(

                    <BodyContents products={userProducts} viewProductHandler={viewProductHandler}>
                    </BodyContents>
                )
            }
        </div>
    )
    
}
export default UserAccount;