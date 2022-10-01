import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import {mountainDetail, searchMountain} from '../../slices/hikingSlice/hiking';
import {useAppDispatch} from '../../store';

export type Trails = {
  trailId: number;
  name: string;
  length: any;
  level: string;
  imageUrl: any;
};

type FindMountainScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'FindMountain'
>;

function FindMountain({navigation}: FindMountainScreenProps) {
  const [search, setSearch] = useState('');
  const [isMountain, setIsMountain] = useState(0); // 0: 검색 전, 1: 검색 결과 없음, 2: 검색 결과 있음
  const [mountainName, setMountainName] = useState('');

  const [trailList, setTrailList] = useState<Trails[] | []>([]);
  const [isTrailList, setIsTrailList] = useState(false);

  const dispatch = useAppDispatch();

  // 산 아이디로 해당 산의 등산로 정보 받아와서 저장
  const getTrailList = (id: number) => {
    dispatch(mountainDetail({mountainId: id}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          if (res.payload?.trails.length > 0) {
            setTrailList(res.payload?.trails);
            setMountainName(res.payload?.name);
            setIsTrailList(true);
          } else {
            setIsTrailList(false);
          }
        }
      })
      .catch(err => {
        console.log(err);
        setIsTrailList(false);
      });
  };

  // 사용자가 입력한 keyword로 산 검색 요청
  const onSearch = () => {
    dispatch(searchMountain({keyword: search}))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          if (res.payload?.length > 0) {
            setIsMountain(2);
            getTrailList(res.payload[0].mountainId);
          } else {
            setIsMountain(1);
          }
        }
      })
      .catch(err => {
        console.log(err);
        setIsMountain(1);
      });
  };

  const onChangeSearchInput = (text: any) => {
    if (!text.trim()) {
      setIsMountain(0);
    }
    setSearch(text.trim());
  };
  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <AppTextBold style={styles.titleText}>
            {`오늘 \n등산할 산을 \n검색해주세요`}
          </AppTextBold>
          <View>
            <TextInput
              style={styles.searchInput}
              onChangeText={onChangeSearchInput}
              placeholder="산 검색하기"
              placeholderTextColor="#666"
              importantForAutofill="yes"
              value={search}
              returnKeyType="send"
              clearButtonMode="while-editing"
              onSubmitEditing={onSearch}
              blurOnSubmit={false}
            />
          </View>
          <ScrollView>
            {isMountain === 2 && isTrailList && trailList?.length > 0 ? (
              <View style={styles.searchContainer}>
                {mountainName && (
                  <AppTextBold style={styles.mountainText}>
                    {mountainName}의 등산 코스
                  </AppTextBold>
                )}
                <AppTextBold style={styles.chooseText}>
                  등산 코스를 선택해주세요
                </AppTextBold>
                {trailList.map((item, index) => (
                  <Pressable
                    key={index}
                    style={styles.searchList}
                    onPress={() => {
                      navigation.navigate('Hiking', {
                        trailId: item.trailId,
                        trailName: item.name,
                      });
                      setSearch('');
                      setIsMountain(0);
                      setTrailList([]);
                      setIsTrailList(false);
                    }}>
                    <AppTextBold key={index} style={styles.searchText}>
                      {item?.name}
                    </AppTextBold>
                  </Pressable>
                ))}
              </View>
            ) : isMountain === 1 ? (
              <View style={styles.searchContainer}>
                <AppText style={styles.text}>검색 결과가 없습니다.</AppText>
                <AppText style={styles.text}>다른 산을 검색해주세요!</AppText>
              </View>
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  contentContainer: {
    marginVertical: 80,
    marginHorizontal: 30,
  },
  titleText: {
    fontSize: 30,
    marginBottom: 40,
  },
  searchInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    width: 300,
  },
  chooseText: {
    marginLeft: 5,
    marginBottom: 20,
  },
  searchContainer: {
    marginTop: 20,
  },
  searchList: {
    marginBottom: 10,
    backgroundColor: '#57d696',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  mountainText: {
    marginLeft: 5,
  },
  searchText: {
    color: 'white',
    fontSize: 15,
  },
  text: {
    marginVertical: 5,
    fontSize: 15,
  },
});

export default FindMountain;
