---
published: true
title: width 설정 없이 text-overflow 적용하기
excerpt: flex만 있으면 width는 필요없다
coverAlt: text-overflow
date: '2024-11-25T11:17:50.145Z'
createDate: '2024-11-25T11:17:26.558Z'
---

### flex-box에서 text-overflow: ellipsis 적용하기

1. 해당 영역에 임의의 width 설정하기
   - viewport 너비에 따라 넘칠수도 모자랄수도 있음
   - 앱 내 대부분 이 방법을 사용중
2. mounted 시 (전체너비 - 다른 요소 너비) 계산 후 해당 요소에 width 설정
3. flex 사용

   ```jsx
   .item {
     @include flex-item(space-between);
     gap: 1.5rem;
     padding: 1rem 0;

     &-left {
       @include flex-item(flex-start, flex-start, $flex-direction: column);
       gap: 0.3rem;
       flex: 1; // 이 부분을 추가
       // 왼쪽 부분이 가능한 많은 공간을 차지하도록 하여, 내용이 충분히 표시될 수 있게 함
   		// 오른쪽 부분의 크기가 고정되어 있을 때, 나머지 공간을 모두 차지하게 됨
       min-width: 0; // 이 부분을 추가하여 텍스트 오버플로우를 방지

       &-bottom {
         width: 100%; // 100%로 설정
         @extend .text_overflow;
       }
     }

     &-right {
       @include flex-item(flex-end, flex-end, $flex-direction: column);
       gap: 0.3rem;
       flex-shrink: 0; // 이 부분을 추가합니다
       // 0으로 설정하면 컨테이너가 줄어들어도 해당 요소의 크기는 줄어들지 않음
       // 오른쪽 부분의 내용(상태 표시 등)이 항상 온전히 표시되도록 보장
     }
   }
   ```
