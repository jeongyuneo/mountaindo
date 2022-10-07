# README [예비]

![search_logo](https://user-images.githubusercontent.com/62989828/194452249-8e3f06ee-2608-483b-83f5-8d8ac78f0ee6.png)

## ⛰️MountainDo


사용자 맞춤 등산 코스 추천 서비스


## ✨서비스 소개


**MountainDo**는 등산에 관심 있는 사용자들에게 **맞춤 등산 코스를 추천**해주고 **등산 기록** 관리를 돕습니다. 기존에 등산에 관심이 있던 사용자들에게는 원하는 정보를 쉽게 찾을 수 있도록 산/등산로 **검색 기능**을 제공합니다. 새롭게 등산에 관심을 가지는 사용자들에게는 자신에게 맞는 등산로를 추천해줌으로써 등산에 지속적인 흥미를 가질 수 있도록 합니다.

- 사용자의 등산 코스를 **추천**
- 매 등산 시 **해당 코스** 및  **관련 정보** **저장**

## 👤 프로젝트 멤버

---

### BE

어정윤(팀장)

박기윤(파트장)

박범수

### FE

신영제(파트장)

김은혜

조유진

## ⏰프로젝트 진행 기간



> 22/08/29 ~ 22/10/07


## ⌨️ 기술 스택


### 클라이언트

- React 17.0.2
- React-Native 0.68.2
- React-Redux 8.0.2
- Typescript 4.4.4
- Axios 0.24.0
- Node.js 16.16.0
- Android SDK Platform 29

### 백엔드

- Java 1.8
- Spring Boot 2.7.3
- Spring Data JPA 2.7.3
- Spring Security 5.7.3
- Spring REST Docs 2.0.6
- MySQL 8.0.3
- Redis 5.0.7

### 인프라

- AWS EC2
- Docker 20.10.18
- NGINX 1.18.0

## 📗주요 기능


| 기능                  | 내용                                                         |
| --------------------- | :----------------------------------------------------------- |
| 등산로 추천           | **사용자 별 맞춤 등산로를 추천해줍니다.**<br /><br />등산 기록이 없는 사용자의 경우 회원가입 시 진행한 사전설문을 기반으로 사용자가 만족할 수 있는 등산로를 추천해줍니다. 등산 기록이 있는 사용자의 경우 기존 데이터를 기반으로 유사한 사용자 기반 추천 및 마지막으로 방문한 등산 코스 기반 추천 서비스를 제공합니다. |
| 산 / 등산로 정보 제공 | **산에 대한 기본 정보 및 등산로 정보를 제공합니다.**<br /><br />산 목록을 제공하고 사용자는 지역 및 정렬 필터를 사용하여 원하는 정보를 쉽게 찾을 수 있습니다. 산, 등산로 검색을 통해 산의 상세  정보를 빠르게 찾을 수 있습니다. 산 상세 페이지에서는 해당 지역의 일주일 날씨를 확인할 수 있으며 등산로의 난이도, 상행시간, 하행시간, 위험 여부에 대한 정보도 확인할 수 있습니다. |
| 등산 기록             | **나의 등산 기록을 측정하고 저장할 수 있습니다.**<br /><br />등산 기록을 시작하면 사용자의 실시간 위치 정보를 기반으로 이동 거리 및 등산 시간을 보여줍니다. 등산을 종료할 경우 사용자의 이동 경로를 표시한 지도와 총 이동 거리, 총 고도 변화량, 소요 시간 정보를 제공합니다. 사용자는 해당 정보를 저장하거나 SNS로 공유할 수 있습니다. |
| 유저 랭킹             | **누적 고도를 기반으로 사용자 간 랭킹 시스템을 제공합니다.**<br /><br />메인페이지에서는 모든 유저들의 누적 고도를 기반으로 랭킹 정보를 제공합니다. 산 상세 페이지에서는 해당 산을 등반한 유저들의 누적 고도를 기반으로 랭킹 정보를 제공합니다. 자신의 랭킹은 상단에서 확인할 수 있으며 유저 닉네임 검색으로 원하는 사용자의 랭킹을 확인할 수 있습니다. |

## 📽️기능 영상


- 메인 페이지

    ![KakaoTalk_Video_2022-10-07-10-11-49](https://user-images.githubusercontent.com/62989828/194450156-ef84afe2-2d8c-4b3d-ba1d-7d15428bbf2d.gif)

- 산 목록 조회

    ![KakaoTalk_Video_2022-10-07-10-16-54](https://user-images.githubusercontent.com/62989828/194450178-7dd2b59b-379b-4905-ac73-b0e49f031f2a.gif)

    - 필터링 및 정렬

        ![KakaoTalk_Video_2022-10-07-10-16-59](https://user-images.githubusercontent.com/62989828/194451169-98f6422a-a3ac-498e-8011-f7d213426f75.gif)

- 사전 설문

    ![KakaoTalk_Video_2022-10-07-10-09-53](https://user-images.githubusercontent.com/62989828/194450149-8df405ca-9567-459b-8fbc-a0d2805111bb.gif)

- 등산 기록
  ![KakaoTalk_Video_2022-10-07-10-15-18](https://user-images.githubusercontent.com/62989828/194450170-502767b3-2789-4bea-9353-f7baa83727e7.gif)

    - 저장된 이미지

        ![Untitled](https://user-images.githubusercontent.com/62989828/194451016-37c740cf-a68e-4b0e-b296-b38a7a66c667.png)

- 랭킹 서비스
  ![KakaoTalk_Video_2022-10-07-10-16-21](https://user-images.githubusercontent.com/62989828/194450173-2608cec1-5c7c-479f-a6c2-7e627872541b.gif)

- 회원가입

    ![KakaoTalk_Video_2022-10-07-10-44-48](https://user-images.githubusercontent.com/62989828/194450187-7d959439-5bc3-441a-b6d7-76ab5c2d4d38.gif)

- 아이디 찾기

  ![KakaoTalk_Video_2022-10-07-10-41-23](https://user-images.githubusercontent.com/62989828/194450181-14ab74af-4819-4208-8502-4e7ed4365a2b.gif)

- 로그인

    ![KakaoTalk_Video_2022-10-07-10-42-32](https://user-images.githubusercontent.com/62989828/194450182-6d8dd7d6-0893-42ad-a441-c076a2bfbff9.gif)

- 프로필 이미지 수정

    ![KakaoTalk_Video_2022-10-07-10-46-20](https://user-images.githubusercontent.com/62989828/194450188-0b4202d3-0a24-46b5-afec-c5eac367ee5a.gif)

- 닉네임 수정

    ![KakaoTalk_Video_2022-10-07-10-49-50](https://user-images.githubusercontent.com/62989828/194450190-4ff1db8e-25fd-453f-96ba-8b60a383b102.gif)

## 📚산출물

[팀 문화](https://www.notion.so/6427887d910447cbb6e8317ea60208f0)

[Code Convention](https://www.notion.so/Convention-d195fbaecebb4e9cadee3476cf7e111c)

[와이어 프레임](https://www.figma.com/file/pEmqw7maJKsLhgbRKIfFeA/MountainDo?node-id=0%3A1)

[기능명세서](https://docs.google.com/spreadsheets/d/1b8iNJoCT0vpHtCzKwmMkPvEw1-wBLo-w_xtTrtpd8Gw/edit?usp=sharing)

[ERD](https://www.erdcloud.com/d/NKF8nyq9KQaGsxCjk)

[API 명세서](https://j7b201.p.ssafy.io/docs/index.html)

## 🔍 시스템 아키텍쳐

<img width="1218" alt="스크린샷 2022-10-07 오전 6 42 43" src="https://user-images.githubusercontent.com/62989828/194450135-d2d37390-e5fc-4565-8e04-1133acdc5af2.png">