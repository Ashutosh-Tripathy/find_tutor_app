import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, Button, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from "react-native"
import { NavigationActions } from 'react-navigation';
import { SignupTypes } from '../Redux/SignupRedux';
import PropTypes from 'prop-types';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginStyle'

class Login extends Component {

  static propTypes = {
    // signup: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      displayType: 1,
      type: "S"
    }

    this.pressSignupSubmit = this.pressSignupSubmit.bind(this);
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

  pressSignupSubmit() {
    let { email, password, name, mobile, type } = this.state;
    // if (!(email && password && name && mobile && type)) {
    //   ToastAndroid.showWithGravity('All fields are mandatory.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    // } else if (this.state.mobile.length !== 10) {
    //   ToastAndroid.showWithGravity('Mobile number should contain 10 digits.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    // } else if (this.state.password.length < 6) {
    //   ToastAndroid.showWithGravity('Password length should be greater than or equal to 6.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    // } else if (this.state.password !== this.state.confirm_password) {
    //   ToastAndroid.showWithGravity('Password and confirm password should be same.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    // } else {
    //   this.props.signup(email, password, name, mobile, type);
    // }
    this.props.signup(email, password, name, mobile, type);
    
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
              <TextInput name="confirm_password" onChangeText={(txt) => this.handleChange("confirm_password", txt)} secureTextEntry={true}>{this.state.confirm_password}</TextInput>
              <Text>Name: </Text>
              <TextInput name="name" onChangeText={(txt) => this.handleChange("name", txt)}>{this.state.name}</TextInput>
              <Text>Mobile: </Text>
              <TextInput name="mobile" onChangeText={(txt) => this.handleChange("mobile", txt)} keyboardType="numeric">{this.state.mobile}</TextInput>
              <Text>User type: </Text>
              <Button title="Student" onPress={() => this.changeUserType("S")} />
              <Button title="Tutor" onPress={() => this.changeUserType("T")} />
              <Button title="Submit" onPress={this.pressSignupSubmit} />
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
    signup: (email, password, name, mobile, type) => dispatch({ type: SignupTypes.SIGNUP_REQUEST, signup_data: { email, password, name, mobile, type } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
