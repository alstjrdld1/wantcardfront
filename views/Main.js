import constant from '../Constants';
import { theme } from '../Themes';
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
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

function Main({route, navigation}) {
  const currentPlatform = Platform.OS;
  const isDarkMode = useColorScheme() === 'dark';
  const currentTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;

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

  // styles begin
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.mainColor,
    },
    overlayBg: {
      position: 'absolute',
      bottom: 0,
      width: SCREEN_WIDTH,
      height: 160,
      backgroundColor: currentTheme.bgColor,
    },
    innerContainer: {
      zIndex: 1,
      flex: 1,
    },
    header: {
      width: SCREEN_WIDTH,
      height: 70,
      paddingHorizontal: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: currentTheme.mainColor,
    },
    headerTitle: {
      fontSize: 28,
      paddingHorizontal: 12,
      fontWeight: '700',
      color: currentTheme.mainTextColor,
    },
    headerMenu: {
      fontSize: 20,
      paddingHorizontal: 12,
      fontWeight: '400',
      color: currentTheme.mainTextColor,
    },
    contents: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: currentTheme.bgColor,
    },
  });
  // styles end

  return (
    <View style={styles.container}>
      <View style={styles.overlayBg} />
      <SafeAreaView style={styles.innerContainer}>
        <StatusBar
          backgroundColor={currentTheme.mainColor}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            WANT CARD
          </Text>
          <Text style={styles.headerMenu}>
            Menu
          </Text>
        </View>
        <View style={styles.contents}>
          <Card cardWidth={SCREEN_WIDTH * 0.7} />
          {listItems.map((item, index) => (
            <Text key={index}>{item.card_file_name}{item.card_nickname}</Text>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Main;
