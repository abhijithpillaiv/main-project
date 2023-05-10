import React, { useEffect, useState } from 'react'
import './bot.css'
import Typewrite from './typewrite'
export default function chatmsg({ clsname,inputMsg,type }) {
    const [msg, setmsg] = useState(null)
    useEffect(() => {
      if(inputMsg){
        if(inputMsg.includes('\n')){
            console.log(inputMsg);
            setmsg(inputMsg.replace(/\n/g, '<br/>'))
        }else{
            setmsg(inputMsg)
        }
      }
    }, [inputMsg])
    
    return (
        <div id="cm-msg" className={`chat-msg ${clsname}`}>
            <span className="msg-avatar">
                <img
                    src="https://abhijithpillaiv.github.io/PersonalWebsite/assets/img/favicon.png"
                    alt=""
                />
            </span>
            <div className="cm-msg-text">
                {type?msg&&<Typewrite msg={msg}/>:
                inputMsg}
            </div>
        </div>
    )
}
