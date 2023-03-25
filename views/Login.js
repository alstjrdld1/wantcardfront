import constant from '../Constants';
import { theme } from '../Themes';

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  StatusBar,
  Dimensions,
  useColorScheme,
} from 'react-native';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

function Login({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const currentTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;

  const [idText, onChangeIdText] = React.useState('');
  const [pwText, onChangePwText] = React.useState('');

  const submitClick = () => {
    navigation.navigate('Main', {uid: 1});
    return;

    console.log("Sending signup request");
    fetch(constant.BASEURL + 'join/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idText,
        password: pwText
      })
    })
    .then((response) => {
      // console.log("response");
      console.log(response);
      if (response.status == 200){
        console.log("Go Next Page");
        navigation.navigate('Main', {uid: 1});
        return response.json();
      }  
      else {
        console.log(response.status);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
    contents: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: currentTheme.bgColor,
    },
    dismissKeyboardTouchView: {
      zIndex: 2,
      position: 'absolute',
      top: 0,
    },
    dismissKeyboardTouch: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
    input: {
      zIndex: 3,
      width: SCREEN_WIDTH - 80,
      height: 56,
      marginBottom: 20,
      padding: 20,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: '#012',
      backgroundColor: '#fff',
      color: '#000',
      fontSize: 16,
    },
    btn: {
      zIndex: 3,
      width: (SCREEN_WIDTH - 80) * 0.5,
      height: 56,
      marginTop: 20,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: currentTheme.mainColor,
    },
    btnText: {
      color: currentTheme.mainTextColor,
      fontSize: 18,
    },
  });
  // styles end

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={currentTheme.mainColor}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={styles.overlayBg}>
      </View>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            LOGIN
          </Text>
        </View>
        <View style={styles.contents}>
          <View style={styles.dismissKeyboardTouchView}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.dismissKeyboardTouch}>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TextInput
            style={styles.input}
            value={idText}
            onChangeText={onChangeIdText}
            placeholder="ID"
            placeholderTextColor={'#000'}
          />
          <TextInput
            style={styles.input}
            value={pwText}
            onChangeText={onChangePwText}
            placeholder="PW"
            placeholderTextColor={'#000'}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={submitClick}
            activeOpacity={0.6}
          >
            <Text style={styles.btnText}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
