import React from 'react'
import {api} from '../network'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {
  state = {email: '', password: '', submitting: false}

  onEmailChange = event => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  handleLoginError = err => {
    switch (err.errorMsg) {
      case 'invalid_email':
        this.setState({error: 'This email does not exist'})
        break
      case 'invalid_password':
        this.setState({error: 'Incorrect password'})
        break
      case 'limit_exceeded':
          this.setState({error: 'Too many login failures - try again in two minutes'})
          break
      case 'network':
        this.setState({error: 'Server is not running'})
        break
      default:
        this.setState({error: 'Something went wrong'})
    }
  }

  login = async () => {
    this.setState({submitting: true})
    try {
      const response = await api('/login', {email: this.state.email, password: this.state.password})
      Cookies.set('userToken', response.userToken)
      this.props.history.push('/')
    } catch (err) {
      this.handleLoginError(err)
      this.setState({submitting: false})
    }
  }

  render() {
    return (
      <div style={{margin: '0 auto', width: 300}}>
        <div style={{textAlign: 'center', fontSize: 22, marginBottom: 25, marginTop: 15}}>
          Login
        </div>
        Email
        <div>
          <input
            value={this.state.email}
            onChange={this.onEmailChange}
            style={styles.input}
          />
        </div>
        Password
        <div>
          <input
            type="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
            style={styles.input}
          />
        </div>
        <button onClick={this.login} style={styles.button}>
          {this.state.submitting ? 'Please Wait...' : 'Login'}
        </button>
        {this.state.error && <div style={styles.error}>{this.state.error}</div>}
      </div>
    )
  }
}

const styles = {
  input: {
    width: '100%',
    height: 30,
    padding: '0 7px',
    marginBottom: 20,
    marginTop: 5,
    fontSize: 16
  },
  button: {
    width: 318,
    height: 40,
    backgroundColor: '#b0b3cc',
    fontSize: 18,
    marginTop: 10,
    cursor: 'pointer'
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  }
}

export default withRouter(Login)