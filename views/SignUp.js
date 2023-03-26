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

function SignUp({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const nTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;
  const nStyles = createStyles(nTheme);

  const [nameText, onChangeNameText] = React.useState('');
  const [phoneNumberText, onChangePhoneNumberText] = React.useState('');
  const [emailText, onChangeEmailText] = React.useState('');

  const [idText, onChangeIdText] = React.useState('');
  const [pwText, onChangePwText] = React.useState('');

  const [isIdAvailable, onChangeIdAvailable] = React.useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const submitClick = () => {
    navigation.goBack();

    // navigation.navigate('Main', {uid: 1}); // code for skip
    // return; // code for skip
    /*
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
        return response.json();
      }  
      else {
        console.log(response.status);
      }
    })
    .then((data) => {
    //   navigation.navigate('Main', {uid: data.uid});
      navigation.goBack();
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
    */
  };

  const checkId = () => {
    fetch(constant.BASEURL + 'join/checkId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idText,
      })
    })
    .then((response) => {
      // console.log("response");
      console.log(response);
      if (response.status == 200){
        return response.json();
      }
      else {
        console.log(response.status);
      }
    })
    .then((data) => {
      if (data.data != null){
        console.log("Bad ID");
        onChangeIdAvailable(false);
      }
      else if (data.data === null){
        console.log("GOOD ID");
        onChangeIdAvailable(true);
      }

      console.log(data.message);
    });
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
          <Text style={nStyles.headerTitle}>SignUp</Text>
        </View>

        {/* Contents */}
        <View style={nStyles.contents}>
          <FlatHiddenTouchable onPress={dismissKeyboard} style={{ ...nStyles.dismissKeyboard, zIndex: 51 }} />

          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}>
            {/* 1-1. ID INPUT AREA */}
            <FlatTextInput
              value={idText}
              onChangeText={onChangeIdText}
              placeholder="ID"
              style={{ flex: 1, marginRight: 12 }}
            />

            {/* 1-2. 중복 확인 BUTTON */}
            <FlatButton
              text="중복 확인"
              onPress={checkId}
              style={{ width: 100 }}
            />
          </View>

          {/* 2. PW INPUT AREA */}
          <FlatTextInput
            value={pwText}
            onChangeText={onChangePwText}
            placeholder="PW"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 3. NAME INPUT AREA */}
          <FlatTextInput
            value={nameText}
            onChangeText={onChangeNameText}
            placeholder="NAME"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 4. PHONE NUMBER INPUT AREA */}
          <FlatTextInput
            value={phoneNumberText}
            onChangeText={onChangePhoneNumberText}
            placeholder="Write like this 010-1111-1111"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 5. EMAIL INPUT AREA */}
          <FlatTextInput
            value={emailText}
            onChangeText={onChangeEmailText}
            placeholder="example@gmail.com"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 6. SIGN UP BUTTON */}
          <FlatButton
            text="Sign Up"
            onPress={submitClick}
            style={{ width: constant.SCREEN_WIDTH * 0.45, marginTop: 24, zIndex: 52 }}
          />
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

export default SignUp;
