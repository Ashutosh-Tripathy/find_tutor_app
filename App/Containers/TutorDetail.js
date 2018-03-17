import React, { Component } from 'react'
import { ScrollView, View, Text, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from "react-native"
import PropTypes from 'prop-types';
import { TutorDetailTypes } from '../Redux/TutorDetailRedux';


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

  componentWillMount() {
    this.props.getTutorDetail(this.props.navigation.state.params.tutorInfo.id);
  }
  static propTypes = {
    getTutorDetail: PropTypes.func,
  }

  render() {
    const { state } = this.props.navigation;
    var tutorInfo = state.params ? state.params.tutorInfo : "<undefined>";
    const { name, gender, min_rate, max_rate, summary, subject_id, about_me } = tutorInfo;
    const { email, mobile, about_session, qualification, availability, state_id, district_id, comment } = this.props.tutorDetail.tutorDetail;
    return (
      <ScrollView>
        <Text>TutorDetail Container</Text>
        <Text>{JSON.stringify(tutorInfo)}</Text>
        <Text>{JSON.stringify(this.props.tutorDetail.tutorDetail)}</Text>
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

        <Text>Email: </Text>
        <Text selectable={true}>{email}</Text>
        <Text>Mobile: </Text>
        <Text selectable={true}>{mobile}</Text>
        <Text>Qualification: </Text>
        <Text>{qualification}</Text>

        <Text>Availability: </Text>
        <Text>{availability}</Text>
        <Text>State: </Text>
        <Text>{state_id}</Text>
        <Text>District: </Text>
        <Text>{district_id}</Text>
        <Text>Comment: </Text>
        <Text>{comment}</Text>

        <Text>About me: </Text>
        <Text>{about_me}</Text>
        <Text>About session: </Text>
        <Text>{about_session}</Text>
        <Text>----------------------------</Text>

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    states: state.states,
    tutorDetail: state.tutorDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTutorDetail: (tutorId) => dispatch({ type: TutorDetailTypes.TUTOR_DETAIL_REQUEST, tutorId })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetail)
