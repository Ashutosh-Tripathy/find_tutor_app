import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import { connect } from 'react-redux'


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HeaderStyle'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  moveToLogin = (id) => {
    this.props.navigation.navigate('Login', { login: id == 1 });
  }

  render() {
    let isLoggedIn = false;
    let name = 'Ashu';
    // let view = isLoggedIn ? <Button title={`Hi ${name}`} /> : (<View><Button title="SignIn" /><Button title="SignUp" /></View>);
    return (
      <View>
        <View>
          <Button title="Login/Signup" onPress={() => this.moveToLogin(1)} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
