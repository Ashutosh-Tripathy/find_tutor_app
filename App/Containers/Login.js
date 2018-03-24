import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from "react-native"
import { NavigationActions } from 'react-navigation';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginStyle'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayType: 1,
      type: "S"
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.dispatch(NavigationActions.reset(
      {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'SearchTutor' })
        ]
      })));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.dispatch(NavigationActions.reset(
      {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'SearchTutor' })
        ]
      })));
  }

  changeUI = (displayType) => {
    this.setState(() => ({ displayType }));
  }

  changeUserType = (type) => {
    this.setState(() => ({ type }));
  }

  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }

  render() {
    return (
      <ScrollView>
        <Button title="Login" onPress={() => this.changeUI(1)} />
        <Button title="Signup" onPress={() => this.changeUI(2)} />
        <Text>{JSON.stringify(this.state)} </Text>
        {(() => {
          if (this.state.displayType == 1) {
            return (<View>
              <Text>Uername: </Text>
              <TextInput></TextInput>
              <Text>Password: </Text>
              <TextInput secureTextEntry={true}></TextInput>
              <Button title="Submit" />
            </View>);
          } else {
            return (<View>
              <Text>Login Container</Text>
              <Text>Email: </Text>
              <TextInput name="email" onChangeText={(txt) => this.handleChange("email", txt)} keyboardType="email-address">{this.state.email}</TextInput>
              <Text>Password: </Text>
              <TextInput name="password" onChangeText={(txt) => this.handleChange("password", txt)} secureTextEntry={true}>{this.state.password}</TextInput>
              <Text>Confirm Password: </Text>
              <TextInput name="confirm_email" onChangeText={(txt) => this.handleChange("confirm_email", txt)} secureTextEntry={true}>{this.state.confirm_password}</TextInput>
              <Text>Name: </Text>
              <TextInput name="name" onChangeText={(txt) => this.handleChange("name", txt)}>{this.state.name}</TextInput>
              <Text>Mobile: </Text>
              <TextInput name="mobile" onChangeText={(txt) => this.handleChange("mobile", txt)} keyboardType="numeric">{this.state.mobile}</TextInput>
              <Text>User type: </Text>
              <Button title="Student" onPress={() => this.changeUserType("S")} />
              <Button title="Tutor" onPress={() => this.changeUserType("T")} />
              <Button title="Submit" />
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
