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
  const nTheme = isDarkMode ? theme.darkTheme : theme.lightTheme;
  const nStyles = createStyles(nTheme, cardWidth);

  return (
    <View style={nStyles.card}>
    </View>
  );
}

const createStyles = (nTheme, cardWidth) => StyleSheet.create({
  card: {
    backgroundColor: nTheme.cardColor,
    width: cardWidth,
    height: cardWidth * 0.625,
    borderRadius: cardWidth * 0.05,
  },
});

export default Card;
