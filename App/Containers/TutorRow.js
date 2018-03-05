import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
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
    return (
      <View>
        <Text>Tutor Row</Text>
      </View>
    )
  }
}

TutorRow.propTypes = {
  tutorInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorRow)
