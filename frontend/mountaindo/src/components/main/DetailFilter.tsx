import React from 'react';
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
import {dummyFiilter} from './Dummy';

interface Props {
  setLocal: any;
}
function DeatilFilter({setLocal}: Props) {
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
              style={styles.find}
            />
          </View>
        </View>
        <View>
          <Text style={styles.filterTitle}>원하시는 지역을 선택 해보세요.</Text>
          <ScrollView horizontal={true}>
            {dummyFiilter.map(item => (
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
          <Text style={styles.filterTitle}>원하시는 지역을 선택 해보세요.</Text>
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
    borderWidth: 1,
    borderColor: 'green',
    borderStyle: 'solid',
    borderRadius: 15,
    marginHorizontal: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
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
