---
published: true
title: throttle과 async를 함께 쓸 때 주의할 점
excerpt: 함께쓰면 장담할 수 없다!
coverAlt: throttle & async
date: '2024-11-23T12:56:02.316Z'
createDate: '2024-11-22T06:33:29.282Z'
---

```jsx
<!-- Filter -->
<DateFilter
  v-if="isShort"
  :date="selectDate"
  :countByDate="countByDate"
  @selectDate="selectDateAction"
/>

...

// 해당 함수로 selectDate는 변경됨
selectDateAction(date) {
  this.selectDate = date;
  this.aroundWorkListLog('date');
},

...

// watch에서 감지하고 있는 selectDate가 refreshHandler 트리깅
async selectDate(n, o) {
  // 단기 날짜 필터 변경시
  if (n !== o && this.loadDone && this.isShort) {
    this.refreshHandler(true, true, true);
  }
}

...

async refreshHandler(changeLoad = false, loading = false, scrollTop = false) {
  try {
    if (changeLoad) this.loadDone = false;
    if (loading) this.$nuxt.$loading.start(0);
    if (scrollTop) this.scrollTopAction();
    // 비동기 종료 시점 보장이 되지 않아
    await this.getFilterWorkList(false, this.workType, true);
  } catch (e) {
    this.ajaxError(e);
  } finally {
	  // 여기서 loadDone 이 true가 됨
    if (changeLoad) this.loadDone = true;
    if (loading) this.$nuxt.$loading.finish();
  }
},

```

`getFilterWorkList`를 호출하면서 인자로 `init = true` 로 넘기면서 일감 데이터를 비워주는 시점이 생김

```jsx
getFilterWorkList: _.throttle(async function (isPull = false, paramWorkType = 0, init = false) {
	if (init) {
    this.initWorkList();
  }
  ...
  const [count, data] = await Promise.all([
    // 단기 날짜별 일감 카운트
    paramIsShort ? this.getCountByDate() : Promise.resolve(),
    this.getAroundAllWorkList(params)
  ]);
  ...
}, 1000)
```

즉 `EmptyItem` 의 노출조건이 만들어지는 시점이 있다

```jsx
<EmptyItem
  v-if="loadDone && !workList.length"
  class="empty__wrap"
  :img-type="'Not_Helper_img'"
  :title="emptyInfo.title"
  :text="emptyInfo.text"
>
```

비동기 작업의 완료 시점

throttle은 함수 호출 빈도를 제한하지만, async 함수의 완료 시점을 보장하지 않는다. 따라서 여러 비동기 작업이 동시에 진행될 수 있다.
