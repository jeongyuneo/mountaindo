// 임시 데이터
export const CourseListDummy = [
  {
    id: 1,
    mountain: '계룡산',
    location: '대전광역시 유성구',
    trailList: [
      {
        id: 1,
        trail: '계룡산 1번 코스',
        level: '상',
        timeDuration: '1시간 30분',
        location: '대전광역시 유성구 계룡산 1번 코스',
        visitedDate: '2022.09.02',
        totalDistance: 10,
        totalHigh: 1.8,
        imageSrc: require('../../assets/gyeryongTrailCourse.jpg'),
      },
      {
        id: 2,
        trail: '계룡산 2번 코스',
        level: '중',
        timeDuration: '1시간',
        location: '대전광역시 유성구 계룡산 2번 코스',
        visitedDate: '2022.08.02',
        totalDistance: 7.8,
        totalHigh: 0.5,
        imageSrc: require('../../assets/gyeryongTrailCourse.jpg'),
      },
      {
        id: 3,
        trail: '계룡산 3번 코스',
        level: '상',
        timeDuration: '2시간',
        location: '대전광역시 유성구 계룡산 3번 코스',
        visitedDate: '2022.08.02',
        totalDistance: 12,
        totalHigh: 2.5,
        imageSrc: require('../../assets/gyeryongTrailCourse.jpg'),
      },
    ],
  },
];

export default CourseListDummy;
