import Chatgpt from '../../components/chatgpt/chatgpt';
import './bot.css';
import {  useState } from 'react';
import lodr from '../../assets/load.gif';
import Chatmsg from './chat-msg';
import bot from "../../assets/bot.png"
import Personalmodel from './personalmodel';
const axios = require("axios");

function Bot() {
  const [inputMsg, setInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([
    'Hai, how can I help you?',
  ]);
  const [chatHistorypersonal, setchatHistorypersonal] = useState([]);
  const [toggle, settoggle] = useState(false)
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);
  const [randommsg, setrandommsg] = useState(false);
  const handleInputChange = (event) => {
    setInputMsg(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendButtonClick();
    }
  };

  const handleSendButtonClick = async () => {
    if (isFetchingResponse) {
      return;
    }
    const msg = inputMsg.trim();
    if (msg.length === 0) {
      return;
    }
    setIsFetchingResponse(true);
    try {
      const response = await Chatgpt(msg);

      setChatHistory((prevArray) => [...prevArray, msg, response]);
      setInputMsg('')
    } catch (error) {
      console.log('Failed to get response', error);
    }
    setIsFetchingResponse(false);
  };

  const personalmodel = () => {
    if (!isFetchingResponse) {
      setIsFetchingResponse(true)
      const data = new FormData();
        data.append('ingredients', inputMsg);
      axios({
        method: "post",
        url: 'http://localhost:5000/predict',
        data: data,
      }).then((response) => {
        console.log(response.data);
        setchatHistorypersonal((prevArray) => [...prevArray, inputMsg, response.data.output]);
        setIsFetchingResponse(false)
      })
    }
  }

  return (
    <>
      <div onClick={() => settoggle(!toggle)} id="chat-circle" className="btn btn-raised">
        <div id="chat-overlay">
        </div>
        <img className='bot-img' src={bot} />

      </div>

      {toggle && <div className="chat-box">
        <div className="chat-box-header">
          Map My Food
          <span className="chat-box-toggle">
            <i onClick={() => settoggle(!toggle)} className="material-icons">close</i>
          </span>
        </div>
        <div className="chat-box-body">
          <div className="chat-box-overlay"></div>
          <div className="chat-logs">
            {chatHistory.map((msg, index, array) => (
              <Chatmsg clsname={index % 2 === 0 ? 'self' : 'user'} type={array.length - 1 === index ? true : false} inputMsg={msg} />

            ))}
            
            {chatHistory.length < 2 && !isFetchingResponse && <span style={{ cursor: 'pointer' }} onClick={() => setrandommsg(true)}><Chatmsg type={true} inputMsg={"Not happy! Click to get more accurate prediction where we use our personalised model."} clsname={'self'} /></span>}
            {randommsg && <Chatmsg type={false} inputMsg={"Add your ingredients using a ; seperator"} clsname={'self'} />}
            
            {
              chatHistorypersonal && chatHistorypersonal.map((msg, index, array) => (
                index % 2 === 0 ? <Chatmsg type={false} inputMsg={msg} clsname={'user'} /> : <Personalmodel type={array.length - 1 === index ? true : false} body={msg} />
              ))
            }
            {inputMsg && isFetchingResponse && (
              <Chatmsg clsname={"user"} inputMsg={inputMsg} />
            )}
            {isFetchingResponse && (
              <div id="cm-msg" className="chat-msg self">
                <span className="msg-avatar">
                  <img
                    src="https://abhijithpillaiv.github.io/PersonalWebsite/assets/img/favicon.png"
                    alt=""
                  />
                </span>
                <div className="cm-msg-lodr">
                  <img src={lodr} alt="loading" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="chat-input">
          <div>
            <input
              type="text"
              id="chat-input"
              placeholder="Send a message..."
              value={inputMsg}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
            <button
              className="chat-submit"
              id="chat-submit"
              onClick={randommsg ? personalmodel : handleSendButtonClick}
            >
              <i className="material-icons">send</i>
            </button>
          </div>
        </div>
      </div>}
    </>
  );
}

export default Bot;
