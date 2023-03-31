import React, { useState, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

function FlatTextInput({ value, onChangeText, placeholder, style, editable=true}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={'#999'}
      style={{ ...styles.input, ...style }}
      editable={editable}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#012',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
  },
});

export default FlatTextInput;
