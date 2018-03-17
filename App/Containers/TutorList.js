import React, { Component } from 'react'
import { FlatList, ScrollView, View, Text, Button, ListView, TouchableHighlight } from 'react-native'
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
    super(props);
  }

  onUserPress = (user) => {
    // this.props.navigation.navigate('Component6', { user });
  }

  renderRow = (tutor) => {
    const { name, gender, min_rate, max_rate, summary, subject_id, about_me } = tutor;
    return (
      <TouchableHighlight onPress={this.props.tutorRowPress}>
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
          <Text>{this.props.states.states.find(x => x.id == subject_id) && this.props.states.states.find(x => x.id == subject_id).name}</Text>
          <Text>About me: </Text>
          <Text>{about_me}</Text>
          <Text>----------------------------</Text>
        </View>
      </TouchableHighlight>
    );
  }
  _keyExtractor = (item, index) => item.id;
  render() {

    let item;
    if (this.props.tutors.length > 0) {
      // item = <ListView dataSource={this.state.tutorDataSource} renderRow={this.renderRow.bind(this)} />;
      item = <FlatList data={this.props.tutors} renderItem={({ item }) => this.renderRow(item)} keyExtractor={this._keyExtractor} />
    } else {
      item = <Text>No item present</Text>
    }
    return (
      item
    )
  }
}

TutorList.propTypes = {
  tutors: PropTypes.array.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(TutorList)
