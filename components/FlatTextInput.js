import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

function FlatTextInput({ value, onChangeText, placeholder, style, editable = true}) {
  const nStyles = createStyles(editable);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={'#999'}
      autoCapitalize='none'
      style={{ ...nStyles.input, ...style }}
      editable={editable}
    />
  );
}

const createStyles = (editable) => StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#012',
    backgroundColor: editable ? '#fff' : '#ddd',
    color: editable ? '#000' : '#999',
    fontSize: 16,
  },
});

export default FlatTextInput;
