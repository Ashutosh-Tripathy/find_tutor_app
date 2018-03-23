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
    this.setState(() => ({displayType  }));
  }

  changeUserType= (type) => {
    this.setState(() => ({ type}));
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
                        <Text>User type: </Text>
                        <Button title="Student" onPress={() => this.changeUserType("S")} />
                        <Button title="Tutor" onPress={() => this.changeUserType("T")} />
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
