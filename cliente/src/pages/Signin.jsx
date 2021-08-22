import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import '../styles/signin.scss'

export function Signin(props) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div id="signin">
            <form action="" className="content" autoComplete="nopeBro">
                <h1>Entrar em uma sala</h1>
                <div className="area-input">
                    <label htmlFor="name">Name</label>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input
                        type="text"
                        autoComplete="off"
                        name="name"
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className="area-input">
                    <label htmlFor="name">Room</label>
                    <FontAwesomeIcon icon={faComment} className="icon" />
                    <input
                        autoComplete="off"
                        type="text"
                        name="room"
                        onChange={event => setRoom(event.target.value)}
                    />
                </div>
                <Link onClick={event => (!name || !room ) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button>Signin</button>
                </Link>
            </form>
        </div>
    )
}