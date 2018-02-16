import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HeaderStyle'

class Header extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    let isLoggedIn = false;
    let name = 'Ashu';
    let view = isLoggedIn ? <Button title={`Hi ${name}`}/> : (<View><Button title="SignIn" /><Button title="SignUp" /></View>);
    return (
      <View style={styles.container}>
        <Button title="FindTutor" />
        {view}
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
