import React,{useState,useRef} from 'react';
import './chatter.css';
import { io} from'socket.io-client';
import BlockchainContext from '../../context/blockchain.context';
const socket = io('http://localhost:4000');
function Chatter({name}){
    const context = React.useContext(BlockchainContext);
    const inputEl = useRef();
    const [msgs,setMessage] = useState([]);
    React.useEffect(()=>{
        console.log(msgs)
    },[msgs])
    socket.on('connect',(args)=>{
        console.log('New user Joined');
        console.log(name+' Joined the room connected')
        socket.on('message',(args)=>{
            console.log(args)
            setMessage((prevState)=>[
                ...prevState,
                args.msg
            ])
            console.log(msgs)
        })
    })
    const toggleLeftOrRight = ()=>{
        if(msgs[msgs.length - 1].sender === context.account){
            console.log(msgs[msgs.length - 1].sender === context.account)
            return msgs[msgs.length - 1].isLeft;
        }else{
            return !(msgs[msgs.length - 1].isLeft);
        }
    }
    const submitTxt = (e)=>{
        e.preventDefault();
        let date = new Date();
        let txt = {
            count: Math.floor(Math.random() * 10000+1),
            isLeft: msgs.length===0? false: toggleLeftOrRight(),
            text:inputEl.current.value,
            time: date.toLocaleTimeString(),
            sender: context.account
        };
        socket.emit('message',txt);
        inputEl.current.value='';
        date=null;
    }
    return (
        <div className='chatter-container'>
            <div className='scroller'>
                {
                    (msgs.length >0 ) &&(
                        (msgs.map(msg=>{
                            return(
                                <div key={msg.count} className={ (msg.isLeft)?'text-container right': 'text-container left'}>
                                    <h2>{msg.text}</h2>
                                    <p>{msg.time}</p>
                                </div>
                            )
                        }))
                    )
                }
            </div>
            <div className='message-input'>
                <form onSubmit={submitTxt}>
                    <input required ref={inputEl} placeholder='Type message here' type='text'/>
                    <button type='submit' className='button'>
                        <img alt='send' src={require('./send.png')}/>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Chatter;