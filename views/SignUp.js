import constant from '../Constants';
import theme from '../Themes';
import FlatButton from '../components/FlatButton';
import FlatTextInput from '../components/FlatTextInput';
import FlatHiddenTouchable from '../components/FlatHiddenTouchable';
import { generateRandomNumber } from '../utils/generate';
import { requestSignUp, requestCheckId } from './SignUpAPI';

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

  const [idText, onChangeIdText] = React.useState('');
  const [idAvailable, onChangeIdAvailable] = React.useState('needCheck');

  const [pwText, onChangePwText] = React.useState('');
  const [pwText2, onChangePwText2] = React.useState('');
  const [pwVerified, onChangePwVerified] = React.useState('needCheck');

  const [nameText, onChangeNameText] = React.useState('');

  const [phoneNumberText, onChangePhoneNumberText] = React.useState('');
  const [phoneNumberEditable, onChangePhoneNumberEditable] = React.useState(true);

  const [generatedVerifyNumber, onGenerateNumber] = React.useState('');
  const [enteredVerifyNumber, onChangeVerifyNumber] = React.useState('');
  const [verifyNumberEditable, onChangeVerifyEditable] = React.useState(true);

  const [emailText, onChangeEmailText] = React.useState('');

  // Check variables for sign up query submission
  const [isVerified, onChangeVerifiedState] = React.useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleChangeIdText = (id) => {
    onChangeIdText(id);
    onChangeIdAvailable('needCheck')
  };

  const handleChangePwText = (pw) => {
    onChangePwText(pw);
    onChangePwVerified(pwText === pwText2 ? 'good' : 'bad');
  };

  const handleChangePwText2 = (pw2) => {
    onChangePwText2(pw2);
    onChangePwVerified(pwText === pwText2 ? 'good' : 'bad');
  };

  // ABOUT VERIFY 
  const sendVerifyNumber = () => {
    let num = generateRandomNumber();
    console.log(num);
    onGenerateNumber(num);
    onChangeVerifyNumber('');
  }

  const checkVerifyNumber = () => {
    if(generatedVerifyNumber != ''){
      if(Number(generatedVerifyNumber) == Number(enteredVerifyNumber)){
        onChangeVerifiedState(true);
        onChangePhoneNumberEditable(false);
        onChangeVerifyEditable(false);
        console.log("Correct");
      }
      else{
        console.log(generatedVerifyNumber);
        console.log("Something Wrong");
      }
    }
    else{
      console.log("Please Generate VerifyNumber");
    }
  }

  const handleVerifyNumberChange = (value) => {
    const regex = /^[0-9]{0,6}$/;
    if (regex.test(value)) {
      onChangeVerifyNumber(value);
    }
  };
  
  const onSubmitCheckId = async () => {
    console.log("ID Check Reuqest");
    const result = await requestCheckId(idText);
    onChangeIdAvailable(result ? 'good' : 'bad');
    console.log("onSubmitCheckId", result);
  };

  const onSubmitSignUp = async () => {
    console.log("Sending signup request");
    const result = await requestSignUp(idText, pwText, '11', '010-1234-5678', 'mmm@gmail.com'); // When doing signUp, put variables id, pw, name, phonenumber, email.
    result ? navigation.goBack() : console.log("sign up request falied");
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
          <Text style={nStyles.headerTitle}>회원가입</Text>
        </View>

        {/* Contents */}
        <View style={nStyles.contents}>
          <FlatHiddenTouchable onPress={dismissKeyboard} style={{ ...nStyles.dismissKeyboard, zIndex: 51 }} />

          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}>
            {/* 1-1. ID INPUT AREA */}
            <FlatTextInput
              value={idText}
              onChangeText={handleChangeIdText}
              placeholder="아이디"
              style={{ flex: 1, marginRight: 12 }}
            />

            {/* 1-2. 중복 확인 BUTTON */}
            <FlatButton
              text="중복 확인"
              onPress={onSubmitCheckId}
              style={{ width: 116 }}
            />
          </View>

          {idAvailable === "needCheck" ?
            <View />
            :
            <View style={{ marginBottom: 12 }}>
              {idAvailable === "good" ?
                <Text style={{ color: "green" }}>
                  사용 가능한 아이디입니다.
                </Text>
                :
                <Text style={{ color: "red" }}>
                  사용할 수 없는 아이디입니다.
                </Text>
              }
            </View>
          }

          {/* 2. PW INPUT AREA */}
          <FlatTextInput
            value={pwText}
            onChangeText={handleChangePwText}
            placeholder="비밀번호"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          <FlatTextInput
            value={pwText2}
            onChangeText={handleChangePwText2}
            placeholder="비밀번호 확인"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 3. NAME INPUT AREA */}
          <FlatTextInput
            value={nameText}
            onChangeText={onChangeNameText}
            placeholder="이름"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}>
            {/* 4-1. PHONE NUMBER INPUT AREA */}
            <FlatTextInput
              value={phoneNumberText}
              onChangeText={onChangePhoneNumberText}
              placeholder= "010-1234-5678"
              style={{ flex: 1, marginRight: 12 }}
              editable={phoneNumberEditable}
            />

            {/* 4-2. 인증번호 전송 BUTTON */}
            <FlatButton
              text="인증번호 전송"
              onPress={sendVerifyNumber}
              style={{ width: 100 }}
            />
          </View>

          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}>
            {/* 5-1. 인증번호 INPUT AREA 여기에 번호만 입력하는 부분 어떻게 할지..*/}  
            <FlatTextInput
              value={enteredVerifyNumber}
              onChangeText={handleVerifyNumberChange}
              placeholder= "인증번호"
              style={{ flex: 1, marginRight: 12 }}
              editable={verifyNumberEditable}
              keyboardType='numeric'
            />

            {/* 5-2. 인증번호 BUTTON */}
            <FlatButton
              text="인증 확인"
              onPress={checkVerifyNumber}
              style={{ width: 116 }}
            />
          </View>

          {/* 6. EMAIL INPUT AREA */}
          <FlatTextInput
            value={emailText}
            onChangeText={onChangeEmailText}
            placeholder="example@gmail.com"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 7. SIGN UP BUTTON */}
          <FlatButton
            text="회원가입"
            onPress={onSubmitSignUp}
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