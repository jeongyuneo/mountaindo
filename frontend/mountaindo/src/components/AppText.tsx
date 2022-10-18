import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';

interface Props {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}

const AppText: React.FC<Props> = ({children, ...props}) => (
  <Text {...props} style={StyleSheet.compose(props.style, styles.font)}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  font: {
    fontFamily: 'NanumBarunGothic',
  },
});

export default AppText;
