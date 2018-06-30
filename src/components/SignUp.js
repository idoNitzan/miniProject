import React from 'react'
import {api} from '../network'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passwordValidation = pwd =>
  pwd &&
  pwd.length >= 8 &&
  pwd.length <= 15 &&
  /^[a-zA-Z0-9]+$/.test(pwd) &&
  /\d/.test(pwd) &&
  /[A-Z]/.test(pwd) &&
  /[a-z]/.test(pwd)


class SignUp extends React.Component {
  state = {name: '', email: '', password: '', submitting: false, error: ''}

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  onEmailChange = event => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  valid = () => {
    if (!this.state.name) {
      this.setState({error: 'Enter your name'})
      return false
    }
    if (!email_regex.test(this.state.email)) {
      this.setState({error: 'Email is Invalid'})
      return false
    }
    if (!passwordValidation(this.state.password)) {
      this.setState({error: 'Password should contain 8-15 characters (digits or latin letters only), at least one digit, one upper case and one lower case'})
      return false
    }
    return true
  }

  handleSignUpError = err => {
    switch (err.errorMsg) {
      case 'invalid':
        if (err.errors.email) {
          this.setState({ error: 'Email is Invalid' })
        } else {
          this.setState({ error: 'Invalid Credentials' })
        }
        break
      case 'email_exists':
        this.setState({error: 'This email already exists'})
        break
      case 'network':
        this.setState({error: 'Server is not running'})
        break
      default:
        this.setState({error: 'Something went wrong'})
    }
  }

  signUp = async () => {
    if (!this.valid()) {
      return
    }

    this.setState({submitting: true})
    try {
      const response = await api('/sign_up', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      Cookies.set('userToken', response.userToken)
      this.props.history.push('/')
    } catch (err) {
      this.handleSignUpError(err)
      this.setState({submitting: false})
    }
  }

  render() {
    return (
      <div style={{margin: '0 auto', width: 300}}>
        <div style={{textAlign: 'center', fontSize: 22, marginBottom: 25, marginTop: 15}}>
          Sign Up
        </div>
        Name
        <div>
          <input
            value={this.state.name}
            onChange={this.onNameChange}
            style={styles.input}
          />
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
        <button onClick={this.signUp} style={styles.button}>
          {this.state.submitting ? 'Please Wait...' : 'Sign Up'}
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

export default withRouter(SignUp)