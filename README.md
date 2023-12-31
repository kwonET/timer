## 보미의 시간은 유유히 흘러간다

#### 시, 분, 초 를 입력 받는 3개 인풋이 있습니다. (초기값 = 0) 시작, 멈춤, 초기화 3개 버튼이 있습니다.

![스크린샷 2023-12-04 오전 12 52 25](https://github.com/kwonET/timer/assets/49463954/4b577cf8-2fb9-4e5f-828f-c4a51cf9b76b)


- [x] 시작 버튼은 주어진 인풋 3개 중 값이 1이상이 생긴 경우 활성화되며 클릭 시 카운트가 시작(동작 상태)됩니다.
- [x] 모든 인풋이 0이 되어야 동작 상태는 종료되며
- [x] 동작 상태 중 시, 분, 초 인풋은 비활성화 상태로 값만 변경되고 시작 버튼은 정지 버튼으로 변경됩니다.
- [x] 정지 버튼을 클릭 시 모든 값은 0이 되며 초기 상태로 돌아갑니다.

- [x] 멈춤 버튼은 클릭 시 타이머가 멈추며 재시작으로 버튼이 변경됩니다.
- [x] 재시작을 클릭 시 멈췄던 타이머가 다시 작동하며 다시 멈춤 상태로 변경됩니다.
- [x] 초기화 버튼은 클릭 시 시작 이전 상태(입력한 시,분,초 초기 상태)로 돌아갑니다.
- [x] 동작 상태가 아닌 경우 초기화는 비활성화 상태입니다.

<br/>

## 구현 결과물
- 소요시간 `4h 30m`
- 사용 기술 및 특징
  - Typescript, React 사용
  - useRef, setInterval을 이용해 타이머 구현
  - timetoHMS 함수를 통해 전체시간을 시, 분, 초로 구분
  
https://github.com/kwonET/timer/assets/49463954/7a87b37f-8383-45ef-9bd6-d4f6c88cfded

<br/>

### 참고자료

타이머의 주요 기능은 아래 글을 참고해서 구현했습니다.

- setInterval을 useEffect에서 쓰는법
  https://iborymagic.tistory.com/96

- useRef의 type에 대해
  https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5

- setInterval을 쓰는 커스텀훅
  https://velog.io/@rkio/Typescript-React%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
