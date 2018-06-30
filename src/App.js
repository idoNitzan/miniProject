import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Home from './components/Home'
import Cookies from 'js-cookie'
import shortid from 'shortid'

class App extends React.Component {
  componentWillMount() {
    if (!Cookies.get('sessionId')) {
      Cookies.set('sessionId', shortid.generate())
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/sign_up" component={SignUp}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
