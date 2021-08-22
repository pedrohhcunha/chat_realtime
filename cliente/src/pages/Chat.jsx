import React from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import '../styles/chat.scss'
import ReactEmoji from 'react-emoji'

let socket

export function Chat({ location }) {

    const [data, setData] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ENDPOINT = 'https://backend-chat-pedrohhcunha.herokuapp.com/'
    useEffect(() => {
        setData(queryString.parse(location.search))

        socket = io(ENDPOINT, { transports : ['websocket'] })
        socket.emit('signin', queryString.parse(location.search), (error) => {
            console.log(error ? error : 'Sucess!')
        })

        return () => {
            socket.off()
        }
        
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div id="chat">
            <div className="content">
                <header>
                    <h1>{data.room}</h1>
                    <Link to="/" onClick={() => socket.emit('logout')} className="icon">
                        <FontAwesomeIcon icon={faWindowClose} />
                    </Link>
                </header>
                <main>
                    {messages.map((mes, index) => (
                        <div key={index} className={`area-message ${mes.user !== data.name ? mes.user === 'Admin'  && index !== 0 ? 'admin' : 'outher' : ''}`}>
                            <div className="message">
                                {ReactEmoji.emojify(mes.text)}
                                <span>{mes.user}</span>
                            </div>
                        </div>
                    ))}
                </main>
                <footer>
                    <input
                        type="text"
                        placeholder="Write a message"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <button onClick={event => sendMessage(event)}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </footer>
            </div>
        </div>
    )
}