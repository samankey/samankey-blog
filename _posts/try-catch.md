---
published: true
title: 비동기와 try/catch를 함께 쓸 때 주의할 것들
excerpt: try/catch 내에서 의도적인 지연을 시켜야할 때와 비동기를 사용하면서 조심해야 할 몇 가지
coverAlt: try / catch
date: '2024-11-26T14:49:14.398Z'
createDate: '2024-11-24T07:38:25.098Z'
---

### try-catch 내에서 의도적인 지연을 시켜야할 때

```jsx
/** 정산요청 */
async requestSettlement(type) {

  ...

  try {
    this.$nuxt.$loading.start(0, 'settlement');

    // 정산 함수 호출
    await putImmediatePayroll();

    // ============================= //
    // 3초 지연 후 콜백함수 실행
    // 콜백함수 내부에 error가 throw 되면 catch에서 잡힐거라 예상
    setTimeout(() => {
      this.toast(toastText);
      await this.getPayrollData();
      this.openPayrollList({ type, tab });
    }, 3000);
    // ============================= //

  } catch (error) {
    console.error('정산 요청 중 오류 발생:', error);
    this.ajaxError(error);
  } finally {
    this.$nuxt.$loading.finish();
  }
}
```

실행과정

1. try 블록이 실행되고 setTimeout 호출
2. setTimeout은 Web API로 전달되고, 3초 후 콜백 함수를 태스크 큐에 추가하도록 예약
3. try-catch 블록의 실행이 즉시 완료되고 콜스택에서 제거
4. 3초 후 이벤트 루프는 태스크 큐에서 setTimeout의 콜백을 가져와 콜스택에 추가
5. 콜백 함수가 실행됨
6. 에러가 발생하면 이미 try-catch 블록이 콜 스택에서 사라졌기 때문에 에러는 캐치되지 않고 전역으로 전파

```jsx
async requestSettlement(type) {

  ...

  try {
		// 로딩시작
    ...
    // 정산 함수 호출
		...

    // ============================= //
    // 정산 3초 대기
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    // 나머지 코드
    ...
    // ============================= //

  } catch (error) {
    console.error('정산 요청 중 오류 발생:', error);
    this.ajaxError(error);
  } finally {
    this.$nuxt.$loading.finish();
  }
}
```

---

### 비동기와 try-catch를 사용할 때 주의할 점

- 타이밍 문제

```jsx
try {
  setTimeout(() => {
    throw new Error("비동기 에러");
  }, 1000);
} catch (error) {
  console.error("이 catch 블록은 에러를 잡지 못합니다:", error);
}
```

- 비동기 콜백에서의 에러 처리 누락

```jsx
try {
  fs.readFile("nonexistent.txt", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
} catch (error) {
  console.error("이 catch 블록은 콜백 내부의 에러를 잡지 못합니다:", error);
}
```

콜백 함수 내부에서 발생한 에러는 외부의 try-catch로 잡을 수 없음

- Promise 체인에서의 에러 전파 문제

```jsx
Promise.resolve()
  .then(() => {
    try {
      throw new Error("에러 발생");
    } catch (error) {
      console.error("에러를 여기서 잡았습니다:", error);
    }
  })
  .catch((error) => {
    console.error("이 catch 블록은 실행되지 않습니다:", error);
  });
```

- async/await 사용 시 주의점

```jsx
async function fetchData() {
  throw new Error("비동기 함수 내부 에러");
}

try {
  fetchData(); // 이 호출은 try-catch로 잡히지 않음, await가 있다면 잡힘
} catch (error) {
  console.error("이 catch 블록은 에러를 잡지 못합니다:", error);
}
```
