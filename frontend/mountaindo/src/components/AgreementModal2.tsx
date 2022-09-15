import React from 'react';
import {Text, Modal, SafeAreaView, Button, ScrollView} from 'react-native';

interface Props {
  setVisibleModal2: any;
  visibleModal2: any;
}

function AgreementModal2({setVisibleModal2, visibleModal2}: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={visibleModal2}>
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 0.8,
            borderRadius: 5,
            borderColor: '#cccccc',
            backgroundColor: '#ffffff',
            padding: 10,
            height: '90%',
            width: '90%',
          }}>
          <Button
            title="닫기"
            onPress={() => setVisibleModal2((visible: boolean) => !visible)}
          />
          <Text>
            제1조 (목적) 본 약관은 엔에이치엔에듀㈜(이하 ’회사’라 함)가 제공하는
            ‘아이엠스쿨’에 관한 모든 제품 및 서비스(이하 ‘서비스’라 함)를
            이용함에 있어 이용자의 권리_의무 및 책임에 관한 사항을 규정함을
            목적으로 합니다. 『인터넷, 정보통신망, 모바일 및 스마트 장치 등을
            이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을
            준용합니다』 제2조 (용어의 정의) 1. '서비스'라 함은 이용매체(PC,
            이동통신단말장치)와 상관없이 '회원'이 이용할 수 있는 모든
            '아이엠스쿨'의 서비스를 의미합니다. 2. ‘개별 서비스’라 함은
            ‘서비스’를 구성하는 하위 서비스를 의미합니다. 3. ’콘텐츠’란 문장,
            음성, 음악, 이미지, 동영상, 기타정보 등을 의미합니다. 4. ‘사이트’란
            '회사'가 콘텐츠, 상품 등 서비스를 '이용자'에게 제공하기 위하여
            컴퓨터 등 정보통신설비를 이용하여 설정한 가상의 영업장을 의미합니다.
            5. ’회원’이라 함은 '사이트'에 회원등록 한 자로서, 계속적으로
            '사이트'에서 제공하는 모든 서비스를 이용할 수 있는 자를 말합니다.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default AgreementModal2;
