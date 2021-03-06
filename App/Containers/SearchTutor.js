import React, { Component } from 'react'
import { View, Text, Picker, Button, AsyncStorage, ToastAndroid } from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { SubjectsTypes } from '../Redux/SubjectsRedux';
import { StatesTypes } from '../Redux/StatesRedux';
import { DistrictsTypes } from '../Redux/DistrictsRedux';
import { AppUserTypes } from '../Redux/AppUserRedux';
import { SearchTutorTypes } from '../Redux/SearchTutorRedux';
import TutorList from './TutorList';

// Styles
import styles from './Styles/SearchTutorStyle'

class SearchTutor extends Component {

  static propTypes = {
    getSubjects: PropTypes.func,
    getStates: PropTypes.func,
    getDistricts: PropTypes.func,
    searchTutor: PropTypes.func,
    getAppUser: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      extraFields: false,
      btnText: "⇩",
      subjectId: 0,
      stateId: 0,
      districtId: 0,
      tutors: [],
      userInfo: {}
    }
    this.showExtraSearchFields = this.showExtraSearchFields.bind(this);

    // this.loadStates = this.loadStates.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      subjects: nextProps.subjects, states: nextProps.states, districts: nextProps.districts,
      searchTutor: nextProps.searchTutor, appUser: nextProps.appUser
    }));
  }

  showExtraSearchFields = () => {
    this.setState((prevState) => ({ extraFields: !prevState.extraFields, btnText: prevState.btnText == "⇩" ? "⇧" : "⇩" }));
    if (this.props.states.states.length == 0) {
      this.props.getStates();
    }
  }

  getStoredToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@FindTutorStore:token');
      if (token !== null) {
        this.state.userInfo['token'] = token;
      }
    } catch (error) {
      // Error retrieving data
      ToastAndroid.showWithGravity('Failed to get data.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  }

  getStoredUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('@FindTutorStore:userId');
      if (userId !== null) {
        this.state.userInfo['userId'] = userId;
        this.props.getAppUser(this.state.userInfo.token, this.state.userInfo.userId);
      }
    } catch (error) {
      // Error retrieving data
      ToastAndroid.showWithGravity('Failed to get data.', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  }

  componentDidMount() {
    if (this.props.subjects.subjects.length == 0) {
      this.props.getSubjects();
    }
    // if (this.state.userInfo.token) this.props.getAppUser(this.state.userInfo.token, this.state.userInfo.userId)
    this.getStoredToken();
    this.getStoredUserId();
  }

  stateChange = (stateValue) => {
    this.setState({ stateId: stateValue });
    this.props.getDistricts(stateValue);
  }

  onTutorRowPress = (tutorInfo) => {
    this.props.navigation.navigate('TutorDetail', { tutorInfo });
  }

  render() {
    return (
      <View style={styles.section} >
        <Text>{JSON.stringify(this.state.userInfo)}</Text>
        <Text>{JSON.stringify(this.state.appUser)}</Text>
        <Text>Subject*</Text>
        <Picker selectedValue={this.state.subjectId} onValueChange={(subjectValue) => this.setState({ subjectId: subjectValue })}>
          <Picker.Item label="Please select any subject" value="0" />
          {((this.state.subjects && this.state.subjects.subjects) || []).map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
        </Picker>
        <Text> SubjectId: </Text>
        <Text> {this.state.subjectId} </Text>
        <Text> StateId: </Text>
        <Text> {this.state.stateId} </Text>
        <Text> DistrictId: </Text>
        <Text> {this.state.districtId} </Text>
        <Text> Tutors: </Text>
        <Text> {JSON.stringify(this.state.searchTutor && this.state.searchTutor.tutors)} </Text>
        <Button onPress={this.showExtraSearchFields} title={this.state.btnText} />
        {(() => {
          if (this.state.extraFields) {
            return (<View>
              <Text>State</Text>
              <Picker selectedValue={this.state.stateId} onValueChange={(stateValue) => this.stateChange(stateValue)}>
                <Picker.Item label="Please select any state" value="0" />
                {(this.state.states.states || []).map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
              </Picker>

              <Text>District</Text>
              <Picker selectedValue={this.state.districtId} onValueChange={(districtValue) => this.setState({ districtId: districtValue })}>
                <Picker.Item label="Please select any district" value="0" />
                {(this.state.districts.districts || []).map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
              </Picker>
            </View>);
          }
        })()
        }
        <Button title="Search" onPress={() => this.props.pressSearchTutor(this.state.subjectId, this.state.stateId, this.state.districtId)} />
        <TutorList tutors={(this.state.searchTutor && this.state.searchTutor.tutors) || []} tutorRowPress={this.onTutorRowPress} />
      </View>
    )
  }
}

SearchTutor.propTypes = {
  subjects: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
  districts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    subjects: state.subjects,
    states: state.states,
    districts: state.districts,
    searchTutor: state.searchTutor,
    appUser: state.appUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubjects: () => dispatch({ type: SubjectsTypes.SUBJECTS_REQUEST }),
    getStates: () => dispatch({ type: StatesTypes.STATES_REQUEST }),
    getDistricts: (stateId) => dispatch({ type: DistrictsTypes.DISTRICTS_REQUEST, stateId }),
    pressSearchTutor: (subjectId, stateId, districtId) => dispatch({ type: SearchTutorTypes.SEARCH_TUTOR_REQUEST, subjectId, stateId, districtId }),
    getAppUser: (token, userId) => dispatch({ type: AppUserTypes.APP_USER_REQUEST, token, userId })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTutor)

// npx babel - node test.js

