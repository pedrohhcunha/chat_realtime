import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Chat } from './pages/Chat'
import { Signin } from './pages/Signin'

import './styles/global.scss'

export function App(props) {
    return(
        <Router>
            <Route path="/" exact component={Signin} />
            <Route path="/chat" component={Chat} />
        </Router>
    )
}