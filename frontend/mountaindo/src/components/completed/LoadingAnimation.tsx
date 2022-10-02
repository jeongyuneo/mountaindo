import React from 'react';
import LottieView from 'lottie-react-native';

// 등산 기록 중에 띄울 애니메이션 컴포넌트
function LoadingAnimation() {
  return (
    <LottieView
      source={require('../../assets/loadingMountain.json')}
      autoPlay
      speed={2.5}
      loop
    />
  );
}

export default LoadingAnimation;
