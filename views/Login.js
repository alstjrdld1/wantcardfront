import constant from '../Constants';
import React from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Login ({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [idText, onChangeIdText] = React.useState('');
  const [pwText, onChangePwText] = React.useState('');

  const submitClick = () =>{
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
      if(response.status == 200){
        navigation.navigate('Main', {uid: 1});
        console.log("Go Next Page");
      }  
      else{
        console.log(response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Text
            style={styles.appName}
          > 
            WANTCARD 
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeIdText}
            value={idText}
            placeholder="ID"
          /> 
          <TextInput
            style={styles.input}
            onChangeText={onChangePwText}
            value={pwText}
            placeholder="PW"
          /> 
          <Button
            onPress={submitClick}
            title="LOGIN"
          />
          
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
  },
  appName:{
  },
});

export default Login;