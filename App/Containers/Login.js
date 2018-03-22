import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from "react-native"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginStyle'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('SearchTutor'));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.navigate('SearchTutor'));
  }

  render() {
    return (
      <ScrollView>
        
        {(() => {
          if (this.props.navigation.state.params.login) {
            return (<View>
              <Text>Uername: </Text>
              <TextInput></TextInput>
              <Text>Password: </Text>
              <TextInput secureTextEntry={true}></TextInput>
              <Button title="Login" />
            </View>);
          } else {
            return (<View>
              <Text>Login Container</Text>
              <Text>Email: </Text>
              <TextInput keyboardType="email-address"></TextInput>
              <Text>Password: </Text>
              <TextInput secureTextEntry={true}></TextInput>
              <Text>Confirm Password: </Text>
              <TextInput secureTextEntry={true}></TextInput>
              <Text>Name: </Text>
              <TextInput></TextInput>
              <Text>Mobile: </Text>
              <TextInput keyboardType="numeric"></TextInput>
              <Button title="Signup" />
            </View>);
          }
        })()
        }

      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
