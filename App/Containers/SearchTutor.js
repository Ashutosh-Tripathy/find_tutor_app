import React, { Component } from 'react'
import { View, Text, Picker, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SearchTutorStyle'

class SearchTutor extends Component {
  constructor (props) {
    super(props)
      this.state = {
        extraFields: false,
        btnText: "⇩"
      }
    this.showExtraSearchFields = this.showExtraSearchFields.bind(this);
  }

  showExtraSearchFields = () => {
    this.setState((prevState)=> ({extraFields: !prevState.extraFields, btnText: prevState.btnText=="⇩"? "⇧": "⇩"}));
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTutor)
