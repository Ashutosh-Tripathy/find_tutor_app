import React, { Component } from 'react'
import { View, Text, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from "react-native"

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TutorDetailStyle'

class TutorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(JSON.stringify(props));
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.navigation.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.navigation.goBack);
  }

  render() {
    return (
      <View>
        <Text>TutorDetail Container</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetail)
