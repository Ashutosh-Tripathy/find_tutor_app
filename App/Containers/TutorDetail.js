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
    const { state } = this.props.navigation;
    var tutorInfo = state.params ? state.params.tutorInfo : "<undefined>";
    const { name, gender, min_rate, max_rate, summary, subject_id, about_me } = tutorInfo;

    return (
      <View>
        <Text>TutorDetail Container</Text>
        <Text>{JSON.stringify(tutorInfo)}</Text>
        <Text>Name: </Text>
        <Text>{name}</Text>
        <Text>Gender: </Text>
        <Text>{gender == "M" ? 'Male' : 'Female'}</Text>
        <Text>Rate: </Text>
        <Text>₹ {min_rate}/{max_rate}</Text>
        <Text>Summary: </Text>
        <Text>{summary}</Text>
        <Text>Subject: </Text>
        <Text>{this.props.states.states.find(x => x.id == subject_id) && this.props.states.states.find(x => x.id == subject_id).name}</Text>
        <Text>About me: </Text>
        <Text>{about_me}</Text>
        <Text>----------------------------</Text>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    states: state.states
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetail)
