import React from 'react';
import {ScrollView} from 'react-native';
import TrailListItem from './TrailListItem';
import {TrailType} from './VisitedList';

interface Props {
  trails: TrailType[]; // VisitedDetail 페이지에서 받아온 정보 타입 설정
  modalVisible: any;
  setModalVisible: any;
  setModalNumber: any;
}

function TrailList({
  trails,
  modalVisible,
  setModalVisible,
  setModalNumber,
}: Props) {
  return (
    // 트레일이 있고, 길이가 0이상일 경우 map으로 TrailListItem에 요소 전달
    <ScrollView>
      {trails &&
        trails.length > 0 &&
        trails.map(item => (
          <TrailListItem
            key={item.id}
            trailId={item.id}
            trail={item.trail}
            level={item.level}
            timeDuration={item.timeDuration}
            location={item.location}
            visitedDate={item.visitedDate}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setModalNumber={setModalNumber}
          />
        ))}
    </ScrollView>
  );
}

export default TrailList;
