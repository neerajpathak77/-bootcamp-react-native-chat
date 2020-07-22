import React from 'react';
import ChatList from './components/chatList';
import Main from './components/main';
import Chat from './components/chat';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const {Navigator, Screen} = createStackNavigator();

const NavStack = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="ChatList" component={ChatList} />
        <Screen name="Chat" component={Chat} />
      </Navigator>
    </NavigationContainer>
  );
};

export default NavStack;
