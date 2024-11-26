---
published: true
title: 문자열 정렬하기
excerpt: sort() 메서드로 문자열을 정렬하는 여러가지 방법
coverAlt: sort()
date: '2024-11-26T14:49:14.394Z'
createDate: '2024-11-25T11:52:48.372Z'
---

문자열 소팅하기

```jsx
const 참여한사람 = [
  "!import!",
  "!중요!",
  "?qa?",
  "?질문?",
  "Kore@",
  "Korea",
  "[Test]",
  "[테스트]",
  "kore@",
  "korea",
  "{test}",
  "{테스트}",
  "Übermensch",
  "übermensch",
  "한국",
];
```

1. **비교함수 없이 sort()**

```jsx
arr.sort();
```

- ASCII 문자 순서 > 유니코드 순서 > 대소문자 구분
- 다만 예상과 다를 수 있음
  - ASCII로 표현되는 영어가 한글보다 낮은 유니코드 포인트 값을 가지고 있음
  - 모든 특수문자가 항상 낮은 유니코드 포인트 값을 가지지는 않음

1. **숫자처럼 sort((a, b) ⇒ a - b)**

```jsx
arr.sort((a, b) => a - b);
```

- 문자열과 숫자로만 구성된 문자열을 비교할 때 숫자 문자열은 숫자로 형변환되어 비교됨
- 문자열은 NaN로 인식되어 배열이 정렬되지 않음

1. **비교연산자 사용**

```jsx
if (a > b) return 1;
else if (a < b) return -1;
return 0;
```

- 1번과 유사한 방식으로 정렬

1. **localeCompare 사용**

> **`localeCompare()`** 메서드는 참조 문자열이 정렬 순으로 지정된 문자열 앞 혹은 뒤에 오는지 또는 동일한 문자열인지 나타내는 수치를 반환합니다.

```jsx
localeCompare(compareString, locales, options);
```

```jsx
// 시스템 로케일 사용
arr.sort((a, b) => a.localeCompare(b, undefined));
```

`locales`

```jsx
// 'ko' locale 기준으로 정렬
arr.sort((a, b) => a.localeCompare(b, "ko"));
```

`options`

```jsx
// 독일어에선 ä는 a를 기본 문자(base letter)로 가집니다.
"ä".localeCompare("a", "de", { sensitivity: "base" }); // 0

// 스웨덴어에선 ä와 a는 별도의 기본 문자입니다.
"ä".localeCompare("a", "sv", { sensitivity: "base" }); // 양수

// sensitivity: base | accent | case | variant

// ignorePunctuation (대소문자 구분 없는 옵션)
items.sort((a, b) => a.localeCompare(b, "fr", { ignorePunctuation: true }));
```

```jsx
// 기본적으로 "2" > "10"
console.log("2".localeCompare("10")); // 1

// numeric 옵션 사용
console.log("2".localeCompare("10", undefined, { numeric: true })); // -1

// locales tag 사용
console.log("2".localeCompare("10", "en-u-kn-true")); // -1
```

> `en-u-kn-true`
> 숫자를 문자열로 변환 후 유니코드 값에 따라 정렬되는데 문자는 그대로 비교하고 숫자가 포함되어있으면 숫자값 자체로 비교

1. **Intl.Collator 사용**

```jsx
arr.sort((a, b) => new Intl.Collator("ko").compare(a, b));
```

- 큰 배열의 정렬과 같이 대량의 문자열을 비교하는 경우 권장
- 언어에 민감한 문자열 비교를 가능하게 하는 객체

---

> 참고
>
> http://www.devdic.com/javascript/reference/NATIVE/function:8227/Intl.Collator()
>
> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#locales_%EC%82%AC%EC%9A%A9
>
> https://medium.com/@changjoopark/%EC%96%B4%EB%94%98%EA%B0%80-%EC%9D%B4%EC%83%81%ED%95%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AC%B8%EC%9E%90%EC%97%B4-%EB%B0%B0%EC%97%B4-%EC%A0%95%EB%A0%AC-%EC%9D%B4%EC%95%BC%EA%B8%B0-ed9c6e9fc3d8
>
> https://js-string-array-sort.netlify.app/
