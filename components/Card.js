import { theme } from '../Themes';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

function Card({cardWidth}) {
  const isDarkMode = useColorScheme() === 'dark';
  const currentTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;

  // styles begin
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#cce1ff',
      width: cardWidth,
      height: cardWidth * 0.625,
      borderRadius: cardWidth * 0.05,
    },
  });
  // styles end

  return (
    <View style={styles.card}>
    </View>
  );
}

export default Card;
