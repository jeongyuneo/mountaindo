export const dummyfamous = [
  {
    id: 1,
    title: '인기순',
  },
  {
    id: 2,
    title: '이름순',
  },
  {
    id: 3,
    title: '고도높은순',
  },
  {
    id: 4,
    title: '고도낮은순',
  },
  {
    id: 5,
    title: '박휘순',
  },
];

export const dummyFiilter = [
  {
    id: 0,
    title: '전체',
  },
  {
    id: 1,
    title: '서울 특별시',
  },
  {
    id: 2,
    title: '인천 광역시',
  },
  {
    id: 3,
    title: '대전 광역시',
  },
  {
    id: 4,
    title: '광주 광역시',
  },
  {
    id: 5,
    title: '대구 광역시',
  },
  {
    id: 6,
    title: '부산 광역시',
  },
  {
    id: 7,
    title: '경기도',
  },
  {
    id: 8,
    title: '강원도',
  },
  {
    id: 9,
    title: '경상남도',
  },
  {
    id: 10,
    title: '경상북도',
  },
  {
    id: 11,
    title: '전라북도',
  },
  {
    id: 12,
    title: '전라남도',
  },
  {
    id: 13,
    title: '충청북도',
  },
  {
    id: 14,
    title: '충청남도',
  },
  {
    id: 15,
    title: '제주도',
  },
];

export const dummyEasy = [
  {
    id: 1,
    profile: require('../../assets/gyeryongMountain.jpg'),
    course: '등린이 코스',
    name: '대전광역시 유성구',
    meter: 3750,
  },
  {
    id: 2,
    profile: require('../../assets/mountainOne.png'),
    course: '등소년 코스',
    name: '충청남도 공주시',
    meter: 3720,
  },
  {
    id: 3,
    profile: require('../../assets/mountainTwo.png'),
    course: '등린이 코스',
    name: '충청남도 보령시',
    meter: 2040,
  },
  {
    id: 4,
    profile: require('../../assets/mountainThree.png'),
    course: '등소년 코스',
    name: '충청남도 예산',
    meter: 3750,
  },
  {
    id: 5,
    profile: require('../../assets/mountainFour.png'),
    course: '등린이 코스',
    name: '충청북도 충주시',
    meter: 3720,
  },
  {
    id: 6,
    profile: require('../../assets/mountainFive.png'),
    course: '등린이 코스',
    name: '충청북도 제천군',
    meter: 2040,
  },
  {
    id: 7,
    profile: require('../../assets/user.png'),
    course: '등린이 코스',
    name: '충청북도 제천군',
    meter: 3750,
  },
  {
    id: 8,
    profile: require('../../assets/jjang.png'),
    course: '등린이 코스',
    name: '짱구는 못말려',
    meter: 3720,
  },
  {
    id: 9,
    profile: require('../../assets/you.png'),
    course: '등린이 코스',
    name: '대한민국 유재석',
    meter: 2040,
  },
];

export const dummyAge = [
  {
    id: 1,
    profile: require('../../assets/workOne.png'),
    course: '등고수 코스',
    name: '대전광역시 서구',
    meter: 3750,
  },
  {
    id: 2,
    profile: require('../../assets/workTwo.png'),
    course: '등중년 코스',
    name: '인천관영시 미추홀',
    meter: 3720,
  },
  {
    id: 3,
    profile: require('../../assets/workThree.png'),
    course: '등소년 코스',
    name: '충청남도 천안시',
    meter: 2040,
  },
  {
    id: 4,
    profile: require('../../assets/workFour.png'),
    course: '등소년 코스',
    name: '충청남도 아산시',
    meter: 3750,
  },
  {
    id: 5,
    profile: require('../../assets/workFive.png'),
    course: '등린이 코스',
    name: '충청북도 충주시',
    meter: 3720,
  },
  {
    id: 6,
    profile: require('../../assets/workSix.png'),
    course: '등린이 코스',
    name: '충청북도 제천군',
    meter: 2040,
  },
  {
    id: 7,
    profile: require('../../assets/workSeven.png'),
    course: '등린이 코스',
    name: '충청북도 제천군',
    meter: 3750,
  },
];

// MainPage에서도 사요되는 Dummy이므로 export
export const dummyUser = [
  {
    id: 1,
    profile: require('../../assets/user.png'),
    name: 'zerojei',
    meter: 3750,
  },
  {
    id: 2,
    profile: require('../../assets/jjang.png'),
    name: 'mountainDo',
    meter: 3720,
  },
  {
    id: 3,
    profile: require('../../assets/you.png'),
    name: 'mDoGod',
    meter: 2040,
  },
  {
    id: 4,
    profile: require('../../assets/user.png'),
    name: 'zerojei',
    meter: 3750,
  },
  {
    id: 5,
    profile: require('../../assets/jjang.png'),
    name: 'mountainDo',
    meter: 3720,
  },
  {
    id: 6,
    profile: require('../../assets/you.png'),
    name: 'mDoGod',
    meter: 2040,
  },
  {
    id: 7,
    profile: require('../../assets/user.png'),
    name: 'zerojei',
    meter: 3750,
  },
  {
    id: 8,
    profile: require('../../assets/jjang.png'),
    name: 'mountainDo',
    meter: 3720,
  },
  {
    id: 9,
    profile: require('../../assets/you.png'),
    name: 'mDoGod',
    meter: 2040,
  },
];

// MainPage에서도 사요되는 Dummy이므로 export
export const dummyFilter = dummyUser.filter(item => item.id < 4);
export const myFilter = dummyFilter.filter(
  item => item.id === 1 && item.name === 'zerojei',
);
