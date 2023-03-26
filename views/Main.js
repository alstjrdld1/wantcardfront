import constant from '../Constants';
import theme from '../Themes';
import Card from '../components/Card';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

const Stack = createStackNavigator();

function Main({ route, navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const nTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;
  const nStyles = createStyles(nTheme);

  const [listItems, setListItems] = useState([]);
  
  const uid = route.params.uid;
  
  useEffect(() => {
    fetch(constant.BASEURL + 'card', { // from constant.js. Then load server URL for requesting API.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
      })
    })
    .then((response) => {
      if (response.status == 200) {
        console.log("Card List Received!");
      }
      else {
        console.log(response.status);
      }
      return response.json();
    })
    .then((data) => {
      setListItems(data);
      console.log(data);
    });
  }, []);

  return (
    <View style={nStyles.container}>
      <StatusBar
        backgroundColor={nTheme.mainColor}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={nStyles.colorForNav} />
      <SafeAreaView style={nStyles.safeAreaView}>

        {/* Header */}
        <View style={nStyles.header}>
          <Text style={nStyles.headerTitle}>WANT CARD</Text>
          <Text style={nStyles.headerMenu}>Menu</Text>
        </View>

        {/* Contents */}
        <View style={nStyles.contents}>
          <Card cardWidth={constant.SCREEN_WIDTH * 0.7} />
          {listItems.map((item, index) => (
            <Text key={index}>{item.card_file_name}{item.card_nickname}</Text>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

const createStyles = (nTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: nTheme.mainColor,
  },
  colorForNav: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    width: constant.SCREEN_WIDTH,
    height: constant.SCREEN_HEIGHT * 0.5,
    backgroundColor: nTheme.bgColor,
  },
  safeAreaView: {
    zIndex: 2,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: constant.SCREEN_WIDTH,
    height: 70,
    paddingHorizontal: 12,
    backgroundColor: nTheme.mainColor,
  },
  headerTitle: {
    paddingHorizontal: 12,
    fontSize: 28,
    fontWeight: '700',
    color: nTheme.mainTextColor,
  },
  headerMenu: {
    paddingHorizontal: 12,
    fontSize: 20,
    fontWeight: '400',
    color: nTheme.mainTextColor,
  },
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nTheme.bgColor,
  },
});

export default Main;
