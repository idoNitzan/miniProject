import React from 'react'
import {Flex} from 'react-flex'
import { isLoggedIn, logOut } from '../utils'
import {withRouter} from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <Flex style={styles.container}>
        {isLoggedIn() && <div style={styles.button} onClick={logOut}>Log Out</div>}
        {!isLoggedIn() && (
          <div
            style={styles.button}
            onClick={() => {this.props.history.push('/login')}}
          >
            Login
          </div>
        )}
        {!isLoggedIn() && (
          <div
            style={styles.button}
            onClick={() => {this.props.history.push('/sign_up')}}
          >
            Sign Up
          </div>
        )}
      </Flex>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'flex-end',
    backgroundColor: '#660066',
    color: '#50dd66',
    fontSize: 18,
    alignItems: 'center',
    display: 'flex'
  },
  button: {
    marginRight: 30,
    cursor: 'pointer'
  }
}

export default withRouter(NavBar)