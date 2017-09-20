import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import NotFound from './Component/NotFound'

const app = document.getElementById('root')

ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={App}>
      <Route path="*" component={NotFound} />
    </Route>
  </BrowserRouter>
  ),app);
registerServiceWorker();
