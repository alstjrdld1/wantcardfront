import theme from '../Themes';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

function Card({ cardWidth }) {
  const isDarkMode = useColorScheme() === 'dark';
  const nTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;
  const nStyles = createStyles(nTheme, cardWidth);

  return (
    <View style={nStyles.card}>
    </View>
  );
}

// Create Styles를 함수화 해서 컴포넌트가 변수를 받아서 스타일 설정 할 수 있게 만들어줌 
const createStyles = (nTheme, cardWidth) => StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardWidth * 0.625,
    borderRadius: cardWidth * 0.05,
    backgroundColor: nTheme.cardColor,
  },
});

export default Card;
