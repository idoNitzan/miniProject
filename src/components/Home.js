import React from 'react'
import {withRouter} from 'react-router-dom'
import { isLoggedIn, logOut } from '../utils'
import { api } from '../network'

class Home extends React.Component {
  state = {userName: ''}

  async componentWillMount() {
    // I user is not logged in redirect to sign up page
    if (!isLoggedIn()) {
      this.props.history.push('/sign_up')
      return
    }
    try {
      // If logged in request for the user name
      const response = await api('/my_user_name')
      this.setState({userName: response.userName})
    } catch (err) {
      logOut()
    }
  }

  render() {
    return (
      <div style={{margin: '0 auto', width: 300}}>
        <div style={styles.title}>{`Hello, ${this.state.userName}, you are logged in`}</div>
      </div>
    )
  }
}

const styles = {
  title: {
    fontSize: 22,
    marginTop: 50,
  }
}

export default withRouter(Home)