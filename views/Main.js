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
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  useColorScheme,
} from 'react-native';

const Stack = createStackNavigator();

function Main({route, navigation}) {
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
      <View style={nStyles.overlayBg} />
      <SafeAreaView style={nStyles.safeAreaView}>
        <StatusBar
          backgroundColor={nTheme.mainColor}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />

        {/* Header */}
        <View style={nStyles.header}>
          <Text style={nStyles.headerTitle}>
            WANT CARD
          </Text>
          <Text style={nStyles.headerMenu}>
            Menu
          </Text>
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
  overlayBg: {
    position: 'absolute',
    bottom: 0,
    width: constant.SCREEN_WIDTH,
    height: 160,
    backgroundColor: nTheme.bgColor,
  },
  safeAreaView: {
    zIndex: 1,
    flex: 1,
  },
  header: {
    width: constant.SCREEN_WIDTH,
    height: 70,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: nTheme.mainColor,
  },
  headerTitle: {
    fontSize: 28,
    paddingHorizontal: 12,
    fontWeight: '700',
    color: nTheme.mainTextColor,
  },
  headerMenu: {
    fontSize: 20,
    paddingHorizontal: 12,
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
