import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Region} from './Location';
import {Dimensions, StyleSheet, View} from 'react-native';

type RegionType = {
  id: number;
  value: string;
  city: {id: number; value: string}[];
};

interface Props {
  setSelectedCity: any;
  setSelectedCity2: any;
}

function LocationPicker({setSelectedCity, setSelectedCity2}: Props) {
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [cityList, setCityListTest] = useState<RegionType | null>(null);

  const region = Region;
  const setCityList = (text: string) => {
    const selected: RegionType = region.filter(item => item.value === text)[0];
    setCityListTest(selected);
    if (!selected.city) {
      setSelectedCity2('도시 없음');
    }
  };
  return (
    <View style={styles.pickerGroup}>
      <Picker
        selectedValue={category}
        onValueChange={itemValue => {
          setCategory(itemValue);
          setCityList(itemValue);
          setSelectedCity(itemValue);
        }}
        style={styles.picker}>
        {region &&
          region.map(item => (
            <Picker.Item key={item.id} label={item.value} value={item.value} />
          ))}
      </Picker>
      <Picker
        selectedValue={city}
        onValueChange={itemValue => {
          setCity(itemValue);
          setSelectedCity2(itemValue);
        }}
        style={styles.picker}>
        {cityList?.city &&
          cityList.city.map(item => (
            <Picker.Item key={item.id} label={item.value} value={item.value} />
          ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: Dimensions.get('window').width / 2 - 20,
  },
});

export default LocationPicker;
