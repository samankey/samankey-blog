---
published: true
title: throttle과 async를 함께 쓸 때 주의할 점
excerpt: 함께쓰면 장담할 수 없다!
coverAlt: throttle & async
date: '2024-11-27T04:46:34.613Z'
createDate: '2024-11-27T04:46:34.613Z'
---

저희 앱에는 요일별로 일감 리스트를 볼 수 있는 페이지가 있습니다. 이슈가 있어 확인해보니 다음과 같은 문제가 있었습니다.

### 정상동작 한다면

요일필터 클릭 시 데이터가 있다

Y: 해당 요일에 일감 데이터가 있다면 리스트 UI 렌더링

N: EmptyItem 컴포넌트 렌더링

### 이슈사항

요일필터 클릭 시 데이터가 있어도 `EmptyItem{:html}` 가 잠시 뜨고 리스트 UI 렌더링

위 현상을 파악해보니 비동기 작업과 throttle을 함께 쓸 때 문제가 발생한다는 걸 파악했습니다.

---

## throttle과 async를 함께 사용할 때 주의할 점

비동기 작업과 throttle을 함께 사용할 때는 몇 가지 중요한 고려사항이 있습니다. 특히 데이터 로딩과 UI 업데이트가 관련된 경우 주의가 필요하죠.

### 비동기 작업의 완료 시점 관리

throttle은 함수 호출 빈도를 제한하지만, async 함수의 완료 시점을 보장하지 않습니다. 이로 인해 여러 비동기 작업이 동시에 진행될 수 있으며, 예상치 못한 결과를 초래할 수 있습니다.

```jsx
getWorkList: _.throttle(async function (init = false) {
  if (init) {
	  // 시점이 보장되지 않아 잠시 initWorkList(workList 배열을 비워주는) 함수 동작
    this.initWorkList();
  }
  await ... // 비동기 작업 수행
}, 1000)
```

이 경우, 1초 내에 여러 번 호출돼도 실제로는 1초에 한 번만 실행됩니다. 하지만 실행이 비동기적으로 처리되기 때문에 이전 작업이 완료되기 전에 새로운 작업이 시작될 수 있습니다.

### 데이터 일관성 유지

비동기 작업과 throttle을 함께 사용할 때는 데이터의 일관성을 유지하는 것이 중요해요. 특히 여러 비동기 작업이 동시에 진행될 때, 최신 데이터가 올바르게 반영되도록 해야 합니다.

예를 들어, `refreshHandler{:js}` 함수에서는 다음과 같이 처리하고 있습니다.

```jsx
// 해당 함수로 selectDate는 변경됨
selectDateAction(date) {
  this.selectDate = date;
  this.aroundWorkListLog('date');
},

// watch에서 감지하고 있는 selectDate가 refreshHandler 트리깅
async selectDate(n, o) {
  // 단기 날짜 필터 변경시
  if (n !== o && this.loadDone && this.isShort) {
    this.refreshHandler(true, true, true);
  }
}

async refreshHandler(changeLoad = false, loading = false, scrollTop = false) {
  try {
    if (changeLoad) this.loadDone = false;
    // ... 기타 작업
    // 비동기 종료 시점 보장이 되지 않아 getWorkList에 파라미터로 init 값을 true로 보내게 됨
    await this.getWorkList(false, this.workType, true);
  } catch (e) {
    this.ajaxError(e);
  } finally {
	  // 여기서 loadDone 이 true가 됨
    if (changeLoad) this.loadDone = true;
    // ... 기타 작업
  }
}
```

여기서 `loadDone{:js}` 플래그를 사용하여 로딩 상태를 관리하고 있습니다. 하지만 throttle로 인해 여러 요청이 대기 중일 수 있으므로, 마지막 요청이 완료되었을 때만 `loadDone{:js}` 을 true로 설정하도록 주의해야합니다.

### UI 업데이트 타이밍

throttle과 async를 함께 사용할 때 UI 업데이트 타이밍에 주의해야 합니다. 예를 들어, `EmptyItem{:html}` 컴포넌트의 표시 여부는 다음과 같이 결정됩니다.

```jsx
<EmptyItem
  v-if="loadDone && !workList.length"
	...
>
```

이 경우, `loadDone` 이 true가 되는 시점과 `workList` 가 업데이트되는 시점이 일치하지 않을 수 있습니다. 따라서 데이터 로딩이 완료되었음을 정확히 판단할 수 있는 추가 메커니즘이 필요할 수 있습니다.
