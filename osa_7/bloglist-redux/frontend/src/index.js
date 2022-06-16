import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './index.css'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)