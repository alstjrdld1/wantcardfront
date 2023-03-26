import constant from '../Constants';
import theme from '../Themes';
import FlatButton from '../components/FlatButton';
import FlatTextInput from '../components/FlatTextInput';
import FlatHiddenTouchable from '../components/FlatHiddenTouchable';

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput, // 대신 FlatTextInput 사용하기
  TouchableOpacity, // 대신 FlatButton 사용하기
  TouchableWithoutFeedback, // 대신 FlatHiddenTouchable 사용하기
  StatusBar,
  Keyboard,
  StyleSheet,
  useColorScheme,
} from 'react-native';

function Login({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const nTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;
  const nStyles = createStyles(nTheme);

  const [idText, onChangeIdText] = React.useState('');
  const [pwText, onChangePwText] = React.useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const submitClick = () => {
    // navigation.navigate('Main', {uid: 1}); // code for skip
    // return; // code for skip

    console.log("Sending signup request");
    fetch(constant.BASEURL + 'join/login', {
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
        return response.json();
      }
      else {
        console.log(response.status);
      }
    })
    .then((data) => {
      navigation.navigate('Main', {uid: data.uid});
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const goSignUp = () => {
    console.log("Go Sign Up");
    navigation.navigate('SignUp');
  };

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
          <FlatHiddenTouchable onPress={dismissKeyboard} style={nStyles.dismissKeyboard} />
          <Text style={nStyles.headerTitle}>LOGIN</Text>
        </View>

        {/* Contents */}
        <View style={nStyles.contents}>
          <FlatHiddenTouchable onPress={dismissKeyboard} style={{ ...nStyles.dismissKeyboard, zIndex: 51 }} />

          {/* 1. ID INPUT AREA */}
          <FlatTextInput
            value={idText}
            onChangeText={onChangeIdText}
            placeholder="ID"
            style={{ width: constant.SCREEN_WIDTH * 0.8, marginBottom: 16, zIndex: 52 }}
          />

          {/* 2. PW INPUT AREA */}
          <FlatTextInput
            value={pwText}
            onChangeText={onChangePwText}
            placeholder="PW"
            style={{ width: constant.SCREEN_WIDTH * 0.8, marginBottom: 16, zIndex: 52 }}
          />

          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.8, marginTop: 24, zIndex: 52 }}>
            {/* 3-1. LOGIN BUTTON */}
            <FlatButton
              text='LOGIN'
              onPress={submitClick}
              style={{ flex: 1, marginRight: 16 }}
            />

            {/* 3-2. SIGN UP BUTTON */}
            <FlatButton
              text='Sign Up'
              onPress={goSignUp}
              style={{ flex: 1 }}
            />
          </View>
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
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nTheme.bgColor,
  },
  dismissKeyboard: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Login;
