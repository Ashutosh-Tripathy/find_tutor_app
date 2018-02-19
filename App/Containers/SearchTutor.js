import React, { Component } from 'react'
import { View, Text, Picker, Button } from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import StatesActions from '../Redux/StatesRedux';

// Styles
import styles from './Styles/SearchTutorStyle'

class SearchTutor extends Component {

  static propTypes = {
    getStates: PropTypes.func
  }

  constructor (props) {
    super(props)
      this.state = {
        extraFields: false,
        btnText: "⇩",
        states: [],
        districts: []
      }
    this.showExtraSearchFields = this.showExtraSearchFields.bind(this);
    this.loadStates = this.loadStates.bind(this);
  }

  showExtraSearchFields = () => {
    this.setState((prevState)=> ({extraFields: !prevState.extraFields, btnText: prevState.btnText=="⇩"? "⇧": "⇩"}));
    if(this.state.states.length == 0) {
      this.props.getStates();
    }
  }

  loadStates() {
    this.props.getStates()
      .catch((error) => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  loadDistrict(event) {
    let stateId = event.target.id;
    let users = Object.assign({}, this.state.districts);
    this.props.actions.loadDistricts(stateId)
      .catch((error) => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  render () {
    return (
        <View style={styles.section} >
        <Text>Subject</Text>
        <Picker>
        <Picker.Item label="Please select any subject" value="0" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Button onPress ={this.showExtraSearchFields} title= {this.state.btnText} />
        {(() => {
                  if(this.state.extraFields){
                    return (<View>
                        <Text>State</Text>
                        <Picker>
                        <Picker.Item label="Please select any state" value="0" />
                        <Picker.Item label="Karnataka" value="karnataka" />
                        <Picker.Item label="UP" value="up" />
                        </Picker>

                        <Text>District</Text>
                        <Picker>
                        <Picker.Item label="Please select any district" value="0" />
                        <Picker.Item label="Gorakhpur" value="gorakhpur" />
                        <Picker.Item label="Deoria" value="deoria" />
                        </Picker>
                        </View> );

                  }
                })()

        }
    <Button title="Search"/>
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
    getStates: () => dispatch(StatesActions.getStates())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTutor)
