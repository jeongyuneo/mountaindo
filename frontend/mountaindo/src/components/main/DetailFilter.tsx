import React, {useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import DismissKeyboardView from '../DismissKeyboardView';
import {dummyLocalFilter, dummyfamous} from './Dummy';

interface Props {
  DummyMountain: {
    id: number;
    name: string;
    meter: number;
    now: string;
    profile: any;
    fire: any;
    cnt: number;
  }[];
  setLocal: any;
  setConstructor: any;
}
function DeatilFilter({setLocal, setConstructor}: Props) {
  return (
    <DismissKeyboardView>
      <View>
        <View>
          <View style={styles.findInput}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={15}
              style={styles.magnify}
            />
            <TextInput
              placeholder="산 정보 및 등산로 검색"
              onChangeText={term => setConstructor(term)}
              style={styles.find}
            />
          </View>
        </View>
        <View>
          <Text style={styles.filterTitle}>원하시는 정보를 선택 해보세요.</Text>
          <ScrollView horizontal={true}>
            {dummyfamous.map(item => (
              <Pressable
                onPress={() => {
                  setLocal(item.title);
                }}
                style={styles.pressableLocal}>
                <View key={item.id}>
                  <Text style={styles.filterLocal}>{item.title}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <ScrollView horizontal={true}>
            {dummyLocalFilter.map(item => (
              <Pressable
                onPress={() => {
                  setLocal(item.title);
                }}
                style={styles.pressableLocal}>
                <View key={item.id}>
                  <Text style={styles.filterLocal}>{item.title}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
  },
  pressableLocal: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  filterLocal: {
    backgroundColor: '#57AAFF',
    borderRadius: 50,
    marginHorizontal: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  find: {
    marginLeft: 3,
  },
  magnify: {
    marginTop: 17,
    marginLeft: 10,
  },
  findInput: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
});

export default DeatilFilter;
