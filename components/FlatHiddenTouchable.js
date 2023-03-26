import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

function FlatHiddenTouchable({ onPress, style }) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FlatHiddenTouchable;
