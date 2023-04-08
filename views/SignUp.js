import constant from '../Constants';
import theme from '../Themes';
import FlatButton from '../components/FlatButton';
import FlatTextInput from '../components/FlatTextInput';
import FlatHiddenTouchable from '../components/FlatHiddenTouchable';
import { generateRandomNumber } from '../utils/generate';
import { requestCheckId, requestSignUp } from './SignUpAPI';

import React, { useState, useEffect } from 'react';
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

  const dismissKeyboard = () => Keyboard.dismiss();

  // 1. 아이디 입력 및 중복 확인

  const [idText, onChangeIdText] = useState('');
  const [idAvailable, onChangeIdAvailable] = useState('needCheck');

  useEffect(() => {
    onChangeIdAvailable('needCheck');
  }, [idText]);

  const onSubmitCheckId = async () => {
    console.log("Sending CheckId Request");
    const result = await requestCheckId(idText);
    onChangeIdAvailable(result ? 'good' : 'bad');
  };

  // 2. 비밀번호 입력 및 확인

  const [pwText, onChangePwText] = useState('');
  const [pwText2, onChangePwText2] = useState('');
  const [pwVerified, onChangePwVerified] = useState('needCheck');

  useEffect(() => {
    onChangePwVerified((pwText === '' || pwText2 === '') ? 'needCheck' : (pwText === pwText2 ? 'good' : 'bad'));
  }, [pwText, pwText2]);

  // 3. 이름 입력

  const [nameText, onChangeNameText] = useState('');

  // 4. 전화번호 입력 및 인증

  const [phoneNumberText, onChangePhoneNumberText] = useState('');
  const [phoneNumberEditable, onChangePhoneNumberEditable] = useState(true);

  const [verifyCode, onChangeVerifyCode] = useState('');
  const [verifyCodeInput, onChangeVerifyCodeInput] = useState('');
  const [verifyCodeEditable, onChangeVerifyCodeEditable] = useState(true);

  // Check variables for sign up query submission
  const [isVerified, onChangeVerifiedState] = useState(false);

  // ABOUT VERIFY 
  const sendVerifyCode = () => {
    let num = generateRandomNumber();
    console.log(num);
    onChangeVerifyCode(num);
    onChangeVerifyCodeInput('');
  };

  const checkVerifyCode = () => {
    if (verifyCode !== '') {
      if (Number(verifyCode) === Number(verifyCodeInput)){
        onChangeVerifiedState(true);
        onChangePhoneNumberEditable(false);
        onChangeVerifyCodeEditable(false);
        console.log("Correct");
      }
      else {
        console.log(verifyCode);
        console.log("Something Wrong");
        onChangeVerifyCodeInput(''); // 입력 초기화
      }
    }
    else {
      console.log("Please Generate VerifyNumber");
    }
  };

  const handleVerifyCodeInput = (value) => {
    const regex = /^[0-9]{0,6}$/;
    if (regex.test(value)) {
      onChangeVerifyCodeInput(value);
    }
  };

  // 5. 이메일 입력

  const [emailText, onChangeEmailText] = useState('');

  // 6. 회원가입 버튼

  const onSubmitSignUp = async () => {
    console.log("Sending SignUp Request");
    const result = await requestSignUp(idText, pwText, '11', '010-1234-5678', 'mmm@gmail.com'); // When doing signUp, put variables id, pw, name, phonenumber, email.
    result ? navigation.goBack() : console.log("SignUp request failed");
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

          {/* 1. 아이디 입력 및 중복 확인 */}
          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}>
            <FlatTextInput
              value={idText}
              onChangeText={onChangeIdText}
              placeholder="아이디"
              style={{ flex: 1, marginRight: 12 }}
            />
            <FlatButton
              text="중복 확인"
              onPress={onSubmitCheckId}
              style={{ width: 116 }}
            />
          </View>

          {/* 사용 가능한 아이디입니다 메시지 출력 */}
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

          {/* 2. 비밀번호 입력 및 확인 */}
          <FlatTextInput
            value={pwText}
            onChangeText={onChangePwText}
            placeholder="비밀번호"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />
          <FlatTextInput
            value={pwText2}
            onChangeText={onChangePwText2}
            placeholder="비밀번호 확인"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 비밀번호가 일치하지 않습니다 메시지 출력 */}
          {pwVerified === "needCheck" ?
            <View />
            :
            <View style={{ marginBottom: 12 }}>
              {pwVerified === "good" ?
                <Text style={{ color: "green" }}>
                  비밀번호가 일치합니다.
                </Text>
                :
                <Text style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </Text>
              }
            </View>
          }

          {/* 3. 이름 입력 */}
          <FlatTextInput
            value={nameText}
            onChangeText={onChangeNameText}
            placeholder="이름"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 4. 전화번호 입력 및 인증 */}
          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}>
            <FlatTextInput
              value={phoneNumberText}
              onChangeText={onChangePhoneNumberText}
              placeholder= "010-1234-5678"
              style={{ flex: 1, marginRight: 12 }}
              editable={phoneNumberEditable}
            />
            <FlatButton
              text="인증번호 전송"
              onPress={sendVerifyCode}
              style={{ width: 116 }}
              disabled={!phoneNumberEditable}
            />
          </View>

          <View style={{ flexDirection: 'row', width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}>
            {/* 인증번호 INPUT AREA 여기에 번호만 입력하는 부분 어떻게 할지.. */}
            <FlatTextInput
              value={verifyCodeInput}
              onChangeText={handleVerifyCodeInput}
              placeholder= "인증번호"
              style={{ flex: 1, marginRight: 12 }}
              editable={verifyCodeEditable}
              keyboardType='numeric'
            />
            <FlatButton
              text="인증 확인"
              onPress={checkVerifyCode}
              style={{ width: 116 }}
              disabled={!verifyCodeEditable}
            />
          </View>

          {/* 5. 이메일 입력 */}
          <FlatTextInput
            value={emailText}
            onChangeText={onChangeEmailText}
            placeholder="example@gmail.com"
            style={{ width: constant.SCREEN_WIDTH * 0.9, marginBottom: 12, zIndex: 52 }}
          />

          {/* 6. 회원가입 버튼 */}
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
