import { StackNavigator } from 'react-navigation'
import TutorRow from '../Containers/TutorRow'
import TutorList from '../Containers/TutorList'
import SearchTutor from '../Containers/SearchTutor'
import Header from '../Containers/Header'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  TutorRow: { screen: TutorRow },
  TutorList: { screen: TutorList },
  SearchTutor: { screen: SearchTutor },
  Header: { screen: Header },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
