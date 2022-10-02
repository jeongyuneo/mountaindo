import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {faCheck, faSquareCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import AppText from '../AppText';
import AppTextBold from '../AppTextBold';

interface Props {
  setVisibleModal3: any;
  visibleModal3: any;
  singleCheck: any;
  isSelected3: any;
}

function AgreementModal3({
  setVisibleModal3,
  visibleModal3,
  singleCheck,
  isSelected3,
}: Props) {
  useEffect(() => {}, [isSelected3]);
  return (
    <Modal animationType="slide" transparent={true} visible={visibleModal3}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
          <Pressable
            onPress={() => setVisibleModal3((visible: boolean) => !visible)}>
            <View>
              <View style={styles.titleWrapper}>
                <FontAwesomeIcon icon={faCheck} style={styles.icon} />
                <AppTextBold style={styles.titleText}>
                  위치기반 서비스 전문
                </AppTextBold>
              </View>
              <AppTextBold style={styles.subtitleText}>제1장 총칙</AppTextBold>
              <AppTextBold style={styles.subtitleText}>
                제 1조 (목적)
              </AppTextBold>
              <AppText style={styles.contentText}>
                본 약관은 회원(서비스 이용약관에 동의한 자를 말합니다. 이하
                “회원”이라고 합니다.)이 MountainDo 주식회사(이하 “회사”라고
                합니다.)가 제공하는 위치기반서비스(이하 “서비스”라고 합니다)를
                이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을
                목적으로 합니다.
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 2 조 (이용약관의 효력 및 변경)
              </AppTextBold>
              <AppText style={styles.contentText}>
                ① 본 약관은 서비스를 신청한 고객 또는 개인위치정보주체가 본
                약관에 동의하고 회사가 정한 소정의 절차에 따라 서비스의 이용자로
                등록함으로써 효력이 발생합니다.
              </AppText>
              <AppText style={styles.contentText}>
                ② 회원이 온라인에서 본 약관의 "동의하기" 버튼을 클릭하였을 경우
                본 약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에
                동의한 것으로 봅니다.
              </AppText>
              <AppText style={styles.contentText}>
                ③ 회사는 위치정보의 보호 및 이용 등에 관한 법률, 콘텐츠산업
                진흥법, 전자상거래 등에서의 소비자보호에 관한 법률, 소비자기본법
                약관의 규제에 관한 법률 등 관련법령을 위배하지 않는 범위에서 본
                약관을 개정할 수 있습니다.
              </AppText>
              <AppText style={styles.contentText}>
                ④ 회사가 약관을 개정할 경우에는 기존약관과 개정약관 및
                개정약관의 적용일자와 개정사유를 명시하여 기존 약관과 함께 그
                적용일자 7일 전부터 적용일 이후 상당한 기간 동안 공지만을 하고,
                개정 내용이 회원에게 불리한 경우에는 그 적용일자 30일 전부터
                적용일 이후 상당한 기간 동안 각각 이를 서비스 홈페이지에
                게시하거나 회원에게 전자적 형태(전자우편, SMS 등)로 약관 개정
                사실을 발송하여 고지합니다.
              </AppText>
              <AppText style={styles.contentText}>
                ⑤ 회사가 전항에 따라 회원에게 통지하면서 공지 또는
                공지∙고지일로부터 개정약관 시행일 7일 후까지 거부 의사를
                표시하지 아니하면 이용약관에 승인한 것으로 봅니다. 회원이
                개정약관에 동의하지 않을 경우 회원은 이용계약을 해지할 수
                있습니다.
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 3 조 (관계법령의 적용)
              </AppTextBold>
              <AppText style={styles.contentText}>
                회사는 직접 위치정보를 수집하거나 위치정보사업자로부터
                위치정보를 전달받아 아래와 같은 위치기반서비스를 제공합니다.
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 4 조 (서비스의 내용)
              </AppTextBold>
              <AppText style={styles.contentText}>
                본 약관은 신의성실의 원칙에 따라 공정하게 적용하며, 본 약관에
                명시되지 아니한 사항에 대하여는 관계법령 또는 상관례에 따릅니다.
              </AppText>
              <AppText style={styles.contentText}>
                1. 등산경로 트래킹 서비스: 등산경로를 추적해 등산과정을 기록하고
                분석한 데이터를 제공합니다.
              </AppText>
              <AppText style={styles.contentText}>
                2. 현재 위치를 활용한 검색결과 제공 서비스: 정보 검색 요청 시
                개인위치정보주체의 현 위치를 이용한 검색결과 및 주변결과(등산로
                코스 추천, 산 추천, 지역정보, 주변업체 등)를 제시합니다.
              </AppText>
              <AppText style={styles.contentText}>
                3. 이용자 맞춤형 서비스: 인구통계학적 특성에 따른 서비스 제공,
                접속빈도 분석, 기능개선, 서비스 이용에 대한 통계, 서비스 분석 및
                통계에 따른 이용자 관심 등에 기반한 신규 서비스(개인 맞춤형 상품
                추천 서비스 등 포함)를 제공하기 위하여 이용자의 개인위치정보를
                이용합니다.
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 5 조 (서비스이용의 제한 및 중지)
              </AppTextBold>
              <AppText style={styles.contentText}>
                ① 회사는 아래 각 호의 1에 해당하는 사유가 발생한 경우에는 회원의
                서비스 이용을 제한하거나 중지시킬 수 있습니다.
              </AppText>
              <AppText style={styles.contentText}>
                1. 회원이 회사 서비스의 운영을 고의 또는 중과실로 방해하는 경우
              </AppText>
              <AppText style={styles.contentText}>
                2. 서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우
              </AppText>
              <AppText style={styles.contentText}>
                3. 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를
                중지했을 경우
              </AppText>
              <AppText style={styles.contentText}>
                4. 국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주
                등으로 서비스 이용에 지장이 있는 때
              </AppText>
              <AppText style={styles.contentText}>
                5. 기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이
                부적당하다고 인정하는 경우
              </AppText>
              <AppText style={styles.contentText}>
                ② 회사는 전항의 규정에 의하여 서비스의 이용을 제한하거나 중지한
                때에는 그 사유 및 제한기간 등을 회원에게 알려야 합니다.
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 6 조 (개인위치정보의 이용 또는 제공)
              </AppTextBold>
              <AppText style={styles.contentText}>
                ① 회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는
                경우에는 미리 이용약관에 명시한 후 개인위치정보주체의 동의를
                얻어야 합니다.
              </AppText>
              <AppText style={styles.contentText}>
                ② 회원 및 법정대리인의 권리와 그 행사방법은 제소 당시의 이용자의
                주소에 의하며, 주소가 없는 경우에는 거소를 관할하는 지방법원의
                전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가
                분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에
                제기합니다.
              </AppText>
              <AppText style={styles.contentText}>
                ③ 회사는 타사업자 또는 이용 고객과의 요금정산 및 민원처리를 위해
                위치정보 이용·제공·사실 확인자료를 자동 기록·보존하며, 해당
                자료는 6개월 이상 보관합니다.
              </AppText>
              <AppText style={styles.contentText}>
                ④회사는 개인위치정보주체의 동의 없이 개인위치정보를 제3자에게
                제공하지 아니하며, 제3자에게 개인위치정보를 제공하는 경우에는
                제공 받는자 및 제공목적을 사전에 개인위치정보주체에게 고지하고
                동의를 받습니다.
              </AppText>
              <AppText style={styles.contentText}>
                ⑤ 회사는 개인위치정보를 회원이 지정하는 제3자에게 제공하는
                경우에는 개인위치정보를 수집한 당해 통신 단말장치로 매회
                회원에게 제공받는 자, 제공일시 및 제공목적을 즉시 통보합니다.
                단, 아래 각 호의 1에 해당하는 경우에는 회원이 미리 특정하여
                지정한 통신 단말장치 또는 전자우편주소로 통보합니다.
              </AppText>
              <AppText style={styles.contentText}>
                1. 개인위치정보를 수집한 당해 통신단말장치가 문자, 음성 또는
                영상의 수신기능을 갖추지 아니한 경우
              </AppText>
              <AppText style={styles.contentText}>
                2. 개인위치정보주체가 개인위치정보를 수집한 해당 통신단말장치
                외의 통신단말장치 또는 전자우편주소 등으로 통보할 것을 미리
                요청한 경우
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 7 조 (개인위치정보주체의 권리)
              </AppTextBold>
              <AppText style={styles.contentText}>
                ① 회원은 회사에 대하여 언제든지 개인위치정보를 이용한
                위치기반서비스 제공 및 개인위치정보의 제3자 제공에 대한 동의의
                전부 또는 일부를 철회할 수 있습니다. 이 경우 회사는 수집한
                개인위치정보 및 위치정보 이용, 제공사실 확인자료를 파기합니다.
              </AppText>
              <AppText style={styles.contentText}>
                ② 회원은 회사에 대하여 언제든지 개인위치정보의 수집, 이용 또는
                제공의 일시적인 중지를 요구할 수 있으며, 회사는 이를 거절할 수
                없고 이를 위한 기술적 수단을 갖추고 있습니다.
              </AppText>
              <AppText style={styles.contentText}>
                1. 본인에 대한 위치정보 수집, 이용, 제공사실 확인자료
              </AppText>
              <AppText style={styles.contentText}>
                2. 본인의 개인위치정보가 위치정보의 보호 및 이용 등에 관한 법률
                또는 다른 법률 규정에 의하여 제3자에게 제공된 이유 및 내용
              </AppText>
              <AppText style={styles.contentText}>
                ④ 회원은 제1항 내지 제3항의 권리행사를 위해 회사의 소정의 절차를
                통해 요구할 수 있습니다.
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 8 조 (개인위치정보의 보유목적 및 이용기간)
              </AppTextBold>
              <AppText style={styles.contentText}>
                ① 회사는 제4조에 명시된 위치기반서비스를 제공하기 위한 목적으로
                개인위치정보를 보유 및 이용합니다.
              </AppText>
              <AppText style={styles.contentText}>
                ② 회사는 위치정보 이용·제공사실 확인자료 외의 개인위치정보는
                이용·제공 목적 달성 시 까지 보유합니다.
              </AppText>
              <AppTextBold style={styles.subtitleText}>
                제 9 조 (면책)
              </AppTextBold>
              <AppText style={styles.contentText}>
                ① 회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로
                인하여 회원에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.
              </AppText>
              <AppText style={styles.contentText}>
                1. 천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우
              </AppText>
              <AppText style={styles.contentText}>
                2. 서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의
                고의적인 서비스 방해가 있는 경우
              </AppText>
              <AppText style={styles.contentText}>
                3. 회원의 귀책사유로 서비스 이용에 장애가 있는 경우
              </AppText>
              <AppText style={styles.contentText}>
                4. 제1호 내지 제3호를 제외한 기타 회사의 고의∙과실이 없는 사유로
                인한 경우
              </AppText>
              <AppText style={styles.contentText}>
                ② 회사는 서비스 및 서비스에 게재된 정보, 자료, 사실의 신뢰도,
                정확성 등에 대해서는 보증을 하지 않으며 이로 인해 발생한 회원의
                손해에 대하여는 책임을 부담하지 아니합니다.
              </AppText>
            </View>
            <View style={styles.agreementWrapper}>
              {isSelected3 ? (
                <Pressable onPress={() => singleCheck(false, 2)}>
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    style={styles.iconSquareCheck}
                  />
                </Pressable>
              ) : (
                <Pressable onPress={() => singleCheck(true, 2)}>
                  <FontAwesomeIcon icon={faSquare} style={styles.iconSquare} />
                </Pressable>
              )}
              <AppTextBold style={styles.agreementText}>
                동의합니다.
              </AppTextBold>
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    flex: 0.8,
    borderRadius: 5,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
    padding: 10,
    height: '90%',
    width: '90%',
  },
  agreementWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreementText: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
    marginVertical: 20,
  },
  subtitleText: {
    fontSize: 13,
    marginVertical: 8,
  },
  contentText: {
    marginVertical: 5,
    fontSize: 12,
  },
  iconSquare: {
    color: 'grey',
    marginTop: 7,
  },
  iconSquareCheck: {
    color: '#57d696',
    marginTop: 7,
  },
});

export default AgreementModal3;
