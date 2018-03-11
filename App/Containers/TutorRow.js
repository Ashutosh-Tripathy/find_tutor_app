import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'



// Styles
import styles from './Styles/TutorRowStyle'

class TutorRow extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(JSON.stringify(this.props.tutorInfo));
    const { name, gender, min_rate, max_rate, summary, subject_id, about_me} = this.props.tutorInfo;
    return (
      <View>

        <Text>Tutor Row</Text>
        <Text>Name: </Text>
        <Text>{name}</Text>
        <Text>Gender: </Text>
        <Text>{gender == "M" ? 'Male' : 'Female'}</Text>
        <Text>Rate: </Text>
        <Text>₹ {min_rate}/{max_rate}</Text>
        <Text>Summary: </Text>
        <Text>{summary}</Text>
        <Text>Subject: </Text>
        <Text>{this.props.states.states.find(x=> x.id == subject_id).name}</Text>
        <Text>About me: </Text>
        <Text>{about_me}</Text>
      </View>
    )
  }
}

TutorRow.propTypes = {
  tutorInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    states: state.states
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorRow)
