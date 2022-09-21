// react import
import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// fontawesom import
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

// component import
import {LoggedInParamList} from '../../../../AppInner';

// Navigation 사용
type MyPageScreenProps = NativeStackScreenProps<LoggedInParamList, 'MyPage'>;
function MyPage({navigation}: MyPageScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.containerUp}>
        <View style={styles.containerTop}>
          <View>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={30}
              style={styles.backIcon}
            />
          </View>

          <View style={styles.myPageHeader}>
            <Text style={styles.myPageText}>마이 페이지</Text>
          </View>
        </View>
        <View style={styles.containerDown}>
          <View style={styles.userInfo}>
            <Image
              source={require('../../../assets/user.png')}
              style={styles.userImg}
            />
            <Text style={styles.userName}>등산짱님</Text>
          </View>

          <View style={styles.containerRank}>
            <View style={styles.userRank}>
              <View>
                <Text style={styles.title}>총 고도</Text>
                <Text style={styles.info}>1823m</Text>
              </View>
              <View>
                <Text style={styles.title}>전체 랭킹</Text>
                <Text style={styles.info}>2위</Text>
              </View>
              <View>
                <Text style={styles.title}>최근 등반한 산</Text>
                <Text style={styles.info}>계룡산</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.mentStart}>
          <View style={styles.line} />
          <Pressable onPress={() => navigation.push('UserInfoChange')}>
            <View style={styles.menuStyle}>
              <Text style={styles.goMenuText}>개인 정보 수정</Text>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={15}
                style={styles.angleIcon}
              />
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.push('PasswordChange')}>
            <View style={styles.menuStyle}>
              <Text style={styles.goMenuText}>비밀번호 변경</Text>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={15}
                style={styles.angleIcon}
              />
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.push('Notice')}>
            <View style={styles.menuStyle}>
              <Text style={styles.goMenuText}>공지사항</Text>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={15}
                style={styles.angleIcon}
              />
            </View>
          </Pressable>

          <View style={styles.menuStyle}>
            <Text style={styles.goMenuText}>로그아웃</Text>
            <FontAwesomeIcon
              icon={faAngleRight}
              size={15}
              style={styles.angleIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myPageHeader: {
    marginLeft: 10,
  },
  myPageText: {
    fontSize: 15,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  containerUp: {
    flex: 1,
  },
  containerTop: {
    flex: 1,
  },
  containerBottom: {
    flex: 1,
  },
  containerDown: {
    flex: 3,
  },
  containerRank: {
    flex: 0.5,
  },
  userInfo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
  },
  userRank: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#57AAFF',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  backIcon: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  line: {
    marginTop: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
  },
  mentStart: {
    flex: 1,
    justifyContent: 'space-around',
  },
  goMenuText: {
    marginLeft: 30,
    color: 'black',
    fontSize: 15,
  },
  angleIcon: {
    marginRight: 50,
  },
  menuStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyPage;
