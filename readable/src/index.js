import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import NotFound from './Component/NotFound'

const app = document.getElementById('root')
//
// ReactDOM.render((
//   <BrowserRouter>
//     <Switch>
//     <Route path="/" component={App}>
//     </Route>
//     <Route path="*" component={NotFound} />
//     </Switch>
//   </BrowserRouter>
//   ),app);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


registerServiceWorker();
