import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TutorRow from './TutorRow';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

//import { TutorListTypes } from '../Redux/TutorListRedux';

// Styles
import styles from './Styles/TutorListStyle'

class TutorList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.section} >
        <Text>Tutor List</Text>
        {((this.props.tutors) || []).map(x => <TutorRow key={x} tutorInfo={({ x })} />)}
      </View>
    )
  }
}

TutorList.propTypes = {
  tutors: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorList)
