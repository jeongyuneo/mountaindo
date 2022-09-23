import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DetailFilter from '../../components/main/DetailFilter';
import DetailList from '../../components/main/DetailList';
import DetailLocalList from '../../components/main/DetailLocalList';
import SearchFilter from '../../components/main/SearchFilter';
import {DummyMountain, SeoulDummy, incheonDummy} from './DummyMountain';

function MainDetail() {
  // 더미 방식의 필터링을 하기 위한 함수
  const [local, setLocal] = useState(''); //Filter에서 일치하는 단어 불러오기.
  const [constructor, setConstructor] = useState(''); // 검색을 위한 단어 불러오기.

  // 더미 방식의 필터링을 하기 위한 함수
  const city = (local: string) => {
    if (local === '서울 특별시') {
      return SeoulDummy;
    } else if (local === '인천 광역시') {
      return incheonDummy;
    }
    return DummyMountain; // 이외 버튼 클릭시 임시 전체 목록 화면 보여주기
  };

  // 불러온 검색 필터로 일치하는 산 종류 필터링
  const filterDummy = DummyMountain.filter(item => item.name === constructor);
  console.log(filterDummy.map(item => item.name)); // Item Test

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.filterCon}>
          <DetailFilter
            setLocal={setLocal}
            DummyMountain={DummyMountain}
            setConstructor={setConstructor}
          />
        </View>
        {filterDummy.length !== 0 ? (
          <View style={styles.container}>
            <SearchFilter filterDummy={filterDummy} />
          </View>
        ) : (
          <View style={styles.container}>
            {local === '전체' ? (
              <DetailList DummyMountain={DummyMountain} />
            ) : (
              <DetailLocalList SeoulDummy={city(local)} />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterCon: {
    flex: 0.3,
  },
  container: {
    flex: 1,
  },
});

export default MainDetail;
