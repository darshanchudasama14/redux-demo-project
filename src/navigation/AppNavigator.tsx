import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAppSelector } from '../redux/store';
import { RootStackParamList, MainTabParamList } from '../types';
import { Colors } from '../theme/theme';

import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { EventListScreen } from '../screens/EventListScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';
import {
  TabSearchIcon,
  TabEventsIcon,
  TabFavouritesIcon,
  TabProfileIcon,
} from '../components/Icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const favoriteCount = useAppSelector((state) => state.favorites.favoriteIds.length);

  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.whiteBackground,
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'SEARCH',
          tabBarIcon: ({ color, size }) => <TabSearchIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventListScreen}
        options={{
          tabBarLabel: 'EVENTS',
          tabBarIcon: ({ color, size }) => <TabEventsIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'FAVOURITES',
          tabBarBadge: favoriteCount > 0 ? favoriteCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: Colors.heartActive,
            color: Colors.white,
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, size }) => <TabFavouritesIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({ color, size }) => <TabProfileIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="EventDetail" component={EventDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
