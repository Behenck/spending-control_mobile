import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ArrowsLeftRight, MagnifyingGlass, House, Plus, SoccerBall } from 'phosphor-react-native';
import { Button, Fab, useTheme } from 'native-base';
import { Transactions } from '../screens/Transactions';
import { New } from '../screens/New';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {

  const { colors, sizes, fontSizes } = useTheme();

  const size = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarLabelStyle: {
        fontSize: fontSizes.md
      },
      tabBarActiveTintColor: colors.orange[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: sizes[22],
        borderTopWidth: 0,
        backgroundColor: colors.blue[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0
      }
    }}>
      <Screen 
        name="transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={size} />,
          tabBarLabel: '',
        }}
      />

      <Screen 
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <Plus color={color} size={size} />,
          tabBarLabel: '',
        }}
      />

      <Screen 
        name="search"
        component={Transactions}
        options={{
          tabBarIcon: ({ color }) => <MagnifyingGlass color={color} size={size} />,
          tabBarLabel: '',
        }}
      />

      {/* <Screen 
        name="find"
        component={Find}
        options={{ tabBarButton: () => null }}
      /> */}
    </Navigator>
  )
}