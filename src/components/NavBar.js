import React from 'react'
import {Flex} from 'react-flex'
import { isLoggedIn, logOut } from '../utils'
import {withRouter} from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <Flex style={styles.outerContainer}>
      <Flex style={styles.innerContainer}>
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
      </Flex>
    )
  }
}

const styles = {
  outerContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#660066',
    color: '#50dd66',
    fontSize: 18,
    alignItems: 'center',
    display: 'flex',
  },
  innerContainer: {
    width: 900,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  button: {
    marginRight: 50,
    cursor: 'pointer'
  }
}

export default withRouter(NavBar)