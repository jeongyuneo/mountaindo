import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import AppText from '../../components/AppText';
import MountainListItem from '../../components/mountain/MountainListItem';
import SearchedMountainListItem from '../../components/mountain/SearchedMountainListItem';
import {
  getMountainList,
  getSearchedMountain,
} from '../../slices/mountainSlice/mountain';
import {useAppDispatch} from '../../store';

type MountainScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'Mountain'
>;

export type MountainType = {
  address: string;
  height: number;
  hot: boolean;
  imageUrl: string;
  mountainId: number;
  name: string;
};

function Mountain({navigation}: MountainScreenProps) {
  const [mountainList, setMountainList] = useState<MountainType[] | []>([]);
  const [isResult, setIsResult] = useState(0); // 0 : 검색 전, 1: 검색 결과 없음, 2: 검색 결과 있음
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<MountainType[] | []>([]);
  const dispatch = useAppDispatch();

  const onChangeSearch = useCallback(text => {
    setSearchInput(text.trim());
  }, []);

  // 전체 산 목록 API 요청 보내기
  const dispatchMountainList: any = useCallback(() => {
    dispatch(getMountainList(''))
      .then(res => {
        console.log('MOUNTAINLIST RES ==>', res);
        if (res.meta.requestStatus === 'fulfilled') {
          setMountainList(res.payload);
        }
        console.log('mountainList', mountainList);
      })
      .catch((err: any) => {
        console.log('MOUNTAINLIST ERR ==>', err);
      });
  }, []);

  // 특정 산 검색 API 요청 보내가
  const dispatchSearchedMountain = () => {
    dispatch(getSearchedMountain({keyword: searchInput}))
      .then(res => {
        console.log('SEARCHED_MOUNTAIN RES ==>', res);
        if (res.meta.requestStatus === 'fulfilled') {
          if (res.payload) {
            setIsResult(2);
            setSearchResult(res.payload);
          } else {
            setIsResult(1);
          }
        }
      })
      .catch((err: any) => {
        console.log('SEARCHED_MOUNTAIN ERR ==>', err);
      });
  };

  useEffect(() => {
    console.log(1);
    dispatchMountainList();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Text> Mountain</Text>
        <Pressable onPress={() => navigation.navigate('MountainDetail')}>
          <Text>MountainDetail</Text>
        </Pressable>
        <View style={styles.iconSearchWrapper}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={styles.iconMagnifying}
          />
          <TextInput
            style={styles.searchInputText}
            onChangeText={onChangeSearch}
            placeholder="검색할 산 이름을 입력해주세요"
            textContentType="none"
            returnKeyType="send"
            clearButtonMode="while-editing"
            onSubmitEditing={dispatchSearchedMountain}
            blurOnSubmit={false}
          />
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.citiesWrapper}>
            <View style={styles.cityWrapper}>
              <AppText style={styles.cityText}>수도권</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.cityText}>강원도</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.cityText}>충청도</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.cityText}>경상도</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.cityText}>전라도</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.cityText}>제주도</AppText>
            </View>
          </View>
        </ScrollView>
        <ScrollView horizontal={true}>
          <View style={styles.tagsWrapper}>
            <View style={styles.tagWrapper}>
              <AppText style={styles.tagText}>인기순</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.tagText}>이름순</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.tagText2}>고도 높은 순</AppText>
            </View>
            <View style={styles.cityWrapper}>
              <AppText style={styles.tagText2}>고도 낮은 순</AppText>
            </View>
          </View>
        </ScrollView>
        {!!searchResult && isResult === 2 ? (
          <View>
            {searchResult.map(item => (
              <SearchedMountainListItem
                address={item.address}
                height={item.height}
                hot={item.hot}
                imageUrl={item.imageUrl}
                mountainId={item.mountainId}
                name={item.name}
              />
            ))}
          </View>
        ) : isResult === 0 ? (
          <View>
            {mountainList?.length > 0 &&
              mountainList.map(
                (item: {
                  address: string;
                  height: number;
                  hot: boolean;
                  imageUrl: string;
                  mountainId: number;
                  name: string;
                }) => (
                  <MountainListItem
                    address={item.address}
                    height={item.height}
                    hot={item.hot}
                    imageUrl={item.imageUrl}
                    mountainId={item.mountainId}
                    name={item.name}
                  />
                ),
              )}
          </View>
        ) : (
          <View>
            <AppText style={styles.searchResult}>검색 결과가 없습니다.</AppText>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eeeeee',
    padding: 15,
  },
  iconSearchWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  iconMagnifying: {
    marginTop: 15,
  },
  searchInputText: {
    paddingHorizontal: 10,
  },
  citiesWrapper: {
    flexDirection: 'row',
  },
  cityWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 77,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  tagsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 77,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  tagText2: {
    fontSize: 12,
  },
});

export default Mountain;
