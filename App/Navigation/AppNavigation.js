import { StackNavigator } from 'react-navigation'
import TutorDetail from '../Containers/TutorDetail'
import TutorRow from '../Containers/TutorRow'
import TutorList from '../Containers/TutorList'
import SearchTutor from '../Containers/SearchTutor'
import Header from '../Containers/Header'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SearchTutor: { screen: SearchTutor },
  TutorDetail: { screen: TutorDetail },
  TutorRow: { screen: TutorRow },
  TutorList: { screen: TutorList },
  Header: { screen: Header },
  LaunchScreen: { screen: LaunchScreen }
}, {
    // Default config for all screens
    initialRouteName: 'SearchTutor',
    navigationOptions: {
      headerStyle: styles.header
    }
  })

export default PrimaryNav
