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

function SignUp({navigation}) {
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
        id: idText
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
        if(data.data != null){
            console.log("Bad ID");
            onChangeIdAvailable(false);
        }
        else if(data.data === null){
            console.log("GOOD ID ");
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
      <View style={nStyles.overlayBg}>
      </View>
      <SafeAreaView style={nStyles.safeAreaView}>
        <View style={nStyles.header}>
          <Text style={nStyles.headerTitle}>
            SignUp
          </Text>
        </View>
        <View style={nStyles.contents}>
          <View style={nStyles.dismissKeyboardTouchView}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={nStyles.dismissKeyboardTouch}>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* ID INPUT AREA */}
          <TextInput
            style={nStyles.input}
            value={idText}
            onChangeText={onChangeIdText}
            placeholder="ID"
            placeholderTextColor={'#000'}
          />

          <TouchableOpacity
            style={nStyles.btn}
            onPress={checkId}
            activeOpacity={0.6}
          >
            <Text style={nStyles.btnText}>
              중복확인 
            </Text>
          </TouchableOpacity>

          {/* PW INPUT AREA */}
          <TextInput
            style={nStyles.input}
            value={pwText}
            onChangeText={onChangePwText}
            placeholder="PW"
            placeholderTextColor={'#000'}
          />

          {/* NAME INPUT AREA */}
          <TextInput
            style={nStyles.input}
            value={nameText}
            onChangeText={onChangeNameText}
            placeholder="NAME"
            placeholderTextColor={'#000'}
          />

          {/* PHONE NUMBER INPUT AREA */}
          <TextInput
            style={nStyles.input}
            value={phoneNumberText}
            onChangeText={onChangePhoneNumberText}
            placeholder="Write like this 010-1111-1111"
            placeholderTextColor={'#000'}
          />

          {/* EMAIL INPUT AREA */}
          <TextInput
            style={nStyles.input}
            value={emailText}
            onChangeText={onChangeEmailText}
            placeholder="example@gmail.com"
            placeholderTextColor={'#000'}
          />

          <TouchableOpacity
            style={nStyles.btn}
            onPress={submitClick}
            activeOpacity={0.6}
          >
            <Text style={nStyles.btnText}>
              SignUp
            </Text>
          </TouchableOpacity>
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
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nTheme.bgColor,
  },
  dismissKeyboardTouchView: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
  },
  dismissKeyboardTouch: {
    width: constant.SCREEN_WIDTH,
    height: constant.SCREEN_HEIGHT,
  },
  input: {
    zIndex: 3,
    width: constant.SCREEN_WIDTH - 80,
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
    width: (constant.SCREEN_WIDTH - 80) * 0.5,
    height: 56,
    marginTop: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nTheme.mainColor,
  },
  btnText: {
    color: nTheme.mainTextColor,
    fontSize: 18,
  },
});

export default SignUp;
