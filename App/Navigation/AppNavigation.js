import { StackNavigator } from 'react-navigation'
import SearchTutor from '../Containers/SearchTutor'
import Header from '../Containers/Header'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
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
