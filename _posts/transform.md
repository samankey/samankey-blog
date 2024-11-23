---
published: true
title: CSS 전환함수 transform
excerpt: 전환함수 적용할 때마다 헷갈리셨죠
coverAlt: transform
date: '2024-11-23T13:00:44.535Z'
createDate: '2024-11-22T06:33:29.283Z'
---

# CSS 전환함수 transform

```jsx
<div class="rotate-translate">Rotated + Translated</div>
<div class="translate-rotate">Translated + Rotated</div>

// div는 width 40px height 40px

.rotate-translate {
  background-color: pink;
  transform: rotate(45deg) translateX(180px);
}

.translate-rotate {
  background-color: gold;
  transform: translateX(180px) rotate(45deg);
}
```

- 두 결과가 다른 이유는 CSS transform 함수의 적용 순서 때문
- transform 속성에 여러 함수를 적용할 때, 이들은 오른쪽에서 왼쪽으로 순차적으로 적용
- 각 변환은 이전 변환의 결과에 기반하여 적용되므로, 순서가 최종 결과에 영향을 미침

1. rotate-translate 클래스:
   - transform: rotate(45deg) translateX(180px);
   - 먼저 요소를 45도 회전시킵니다.
   - 그 다음 회전된 축을 기준으로 X축 방향으로 180px 이동합니다.
   - 결과적으로 요소는 대각선 방향으로 이동합니다.
2. translate-rotate 클래스:
   - transform: translateX(180px) rotate(45deg);
   - 먼저 요소를 X축 방향으로 180px 이동시킵니다.
   - 그 다음 이동된 위치에서 45도 회전합니다.
   - 결과적으로 요소는 먼저 수평으로 이동한 후 제자리에서 회전합니다.

### 전환 함수의 적용 순서의 중요성

1. 오른쪽에서 왼쪽으로 순차적 적용하므로 변환 결과에 의해 적용되기 때문
2. [변환 함수들은 일반적으로 교환법칙이 성립되지 않음](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate#a)

   > 변환 행렬의 곱셈 순서와 관련이 있습니다. 각 변환은 행렬로 표현될 수 있으며, 여러 변환을 적용할 때 이 행렬들이 곱해집니다. 행렬 곱셈은 교환법칙이 성립하지 않기 때문에, 곱하는 순서에 따라 결과가 달라집니다.

3. 브라우저는 변환 순서를 고려해 렌더링하므로 성능 최적화에 영향을 줄 수 있음

   > translate() -> rotate() -> scale() 순서가 성능상 유리

4. 명확한 순서는 코드 가독성과 유지보수를 향상시킴

### 적용 순서 최적화

- translate() -> rotate() -> scale() 순서로 브라우저 레이아웃 계산을 최소화 시키기
- 3D변환보다는 2D변환으로 사용
- matrix() 함수 대신 개별 변환 함수를 사용
- transform: translate3d(0,0,0)나 will-change 속성을 사용하여 GPU 가속을 유도
- 불필요한 변환은 제거하고 애니메이션이 필요한 속성만 변환에 포함

- `translate3d(0,0,0)`와 `will-change`
