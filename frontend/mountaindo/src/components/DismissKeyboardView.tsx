import React, {ReactNode} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

// 각각의 props의 타입이 다르기 때문에 개별적으로 지정해주어야 함
// ? 를 사용하면 해당 props가 존재할 때만 적용됨
interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>; // style을 가져오려면 사용해야하는 타입, ViewStyle말고 다른 스타일도 가능
}

const DismissKeyboardView: React.FC<Props> = ({children, ...props}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
