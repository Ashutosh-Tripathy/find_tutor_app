import React, { Component } from 'react'
import { View, Text, Picker, Button } from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { StatesTypes} from '../Redux/StatesRedux';
import { DistrictsTypes} from '../Redux/DistrictsRedux';

// Styles
import styles from './Styles/SearchTutorStyle'

class SearchTutor extends Component {

  static propTypes = {
    getStates: PropTypes.func,
    getDistricts: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      extraFields: false,
      btnText: "⇩"
    }
    this.showExtraSearchFields = this.showExtraSearchFields.bind(this);
    // this.loadStates = this.loadStates.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({ states: nextProps.states, districts: nextProps.districts }));
  }

  showExtraSearchFields = () => {
    this.setState((prevState) => ({ extraFields: !prevState.extraFields, btnText: prevState.btnText == "⇩" ? "⇧" : "⇩" }));
    if (this.props.states.length == 0) {
    }
    this.props.getStates();
    this.props.getDistricts(15);
  }

  render() {
    return (
      <View style={styles.section} >
        <Text>Subject</Text>
        <Picker>
          <Picker.Item label="Please select any subject" value="0" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Text> JSON String </Text>
        <Text> {JSON.stringify(this.state.states)} </Text>
        <Button onPress={this.showExtraSearchFields} title={this.state.btnText} />
        {(() => {
          if (this.state.extraFields) {
            return (<View>
              <Text>State</Text>
              <Picker>
                <Picker.Item label="Please select any state" value="0" />
                {(this.state.states.states || []).map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
              </Picker>

              <Text>District</Text>
              <Picker>
                <Picker.Item label="Please select any district" value="0" />
                {(this.state.districts.districts || []).map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
              </Picker>
            </View>);
          }
        })()
        }
        <Button title="Search" />
      </View>
    )
  }
}

SearchTutor.propTypes = {
  states: PropTypes.object.isRequired,
  districts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    states: state.states,
    districts: state.districts                                            
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => dispatch({ type: StatesTypes.STATES_REQUEST }),
    getDistricts: (stateId) => dispatch({ type: DistrictsTypes.DISTRICTS_REQUEST, stateId })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTutor)
