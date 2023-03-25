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
            LOGIN
          </Text>
        </View>
        <View style={nStyles.contents}>
          <View style={nStyles.dismissKeyboardTouchView}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={nStyles.dismissKeyboardTouch}>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TextInput
            style={nStyles.input}
            value={idText}
            onChangeText={onChangeIdText}
            placeholder="ID"
            placeholderTextColor={'#000'}
          />
          <TextInput
            style={nStyles.input}
            value={pwText}
            onChangeText={onChangePwText}
            placeholder="PW"
            placeholderTextColor={'#000'}
          />
          <TouchableOpacity
            style={nStyles.btn}
            onPress={submitClick}
            activeOpacity={0.6}
          >
            <Text style={nStyles.btnText}>
              LOGIN
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
    width: SCREEN_WIDTH,
    height: 160,
    backgroundColor: nTheme.bgColor,
  },
  safeAreaView: {
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
    backgroundColor: nTheme.mainColor,
  },
  btnText: {
    color: nTheme.mainTextColor,
    fontSize: 18,
  },
});

export default Login;
