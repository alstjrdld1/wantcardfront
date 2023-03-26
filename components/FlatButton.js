import theme from '../Themes';

import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

function FlatButton({ text, onPress, style }) {
  const isDarkMode = useColorScheme() === "dark";
  const nTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;
  const nStyles = createStyles(nTheme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...nStyles.button, ...style }}
      activeOpacity={0.6}
    >
      <Text style={nStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const createStyles = (nTheme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      borderRadius: 24,
      backgroundColor: nTheme.mainColor,
    },
    buttonText: {
      color: nTheme.mainTextColor,
      fontSize: 18,
    },
  });

export default FlatButton;
