import React from 'react';
import {ScrollView} from 'react-native';
import VisitedListItem from './VisitedListItem';

export type TrailType = {
  id: number;
  trail: string;
  level: string;
  timeDuration: string;
  location: string;
  visitedDate: string;
};

// Visited 페이지에서 받아온 정보 타입 설정
interface Props {
  visitedMountainList: {
    id: number;
    mountain: string;
    location: string;
    trailList: TrailType[];
  }[];
  moveToVisitedDetail: any;
}

function VisitedList({visitedMountainList, moveToVisitedDetail}: Props) {
  return (
    // visitedMountainList의 길이가 0이상일 경우 map으로 VisitedListItem에 전달
    <ScrollView>
      {visitedMountainList.length > 0 &&
        visitedMountainList.map(item => (
          <VisitedListItem
            key={item.id}
            mountain={item.mountain}
            location={item.location}
            trailList={item.trailList}
            moveToVisitedDetail={moveToVisitedDetail}
          />
        ))}
    </ScrollView>
  );
}

export default VisitedList;
