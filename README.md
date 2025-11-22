## 필수 기술 스택

### Framework & Language

- Next.js 16
- TypeScript
- React 19

### Dependency

- tailwindcss
- tailwind-merge: className 정리용
- clsx: className 정리용
- lucide-react: 아이콘 라이브러리(현재까지 Chevron Arrow만 썼으므로 삭제 무방)
- eslint-plugin-jsx-a11y: 접근성 요소 린팅

### Styling

- Tailwind CSS
- 반응형 디자인 (Mobile First)
- Utility-First

### SEO & Performance

- generateMetadata 함수 구현
- 구조화된 데이터 (JSON-LD)
- 이미지 최적화 (next/image)
- Core Web Vitals 최적화

## 반응형 브레이크포인트

- Mobile: < 768px
- Desktop: > 1024px

## 필수 구현 기능

### 헤더

- [v] 로고 및 병원명
- [v] 네비게이션 메뉴 (모바일에서 햄버거 메뉴)
- [v] 전화번호 (클릭 시 전화 연결)
- [v] 플로팅 버튼

### 메인 섹션

- [v] 배경 이미지
- [v] 메인 캐러셀
- [v] CTA 버튼 (진료예약, 상담문의)

### 병원 특징 섹션

- [v] 4가지 주요 특징 카드 형태
- [v] 아이콘 + 제목 + 설명
- [v] 호버 효과 애니메이션

### 의료진 소개

- [v] 의료진
- [v] 인사말 섹션

### 진료과목 안내

- [v] 카테고리별 서비스 분류
- [v] 각 질환별 상세 정보
- [v] 아이콘 및 시각적 구분

### 시설 갤러리

- [v] 병원 내부 시설 이미지
- [v] 갤러리 모달 또는 슬라이더

### 블로그 섹션

- [v] 최신 포스트 3-4개 표시
- [v] 제목, 요약, 발행일, 읽기 시간
- [v] "더 보기" 링크

### 오시는길

- [v] 지도 이미지
- [v] 주소 및 연락처 정보
- [v] 대중교통 안내
- [v] 주차 정보

### 푸터

- [v] 병원 정보 및 사업자 정보
- [v] 개인정보처리방침 등

---

## 추가 작업 필요

- 모바일 대응: LCP 및 SI 개선을 위해 모바일용 이미지로 대체 작업 필요(컴포넌트 분리 작업 필요 예상)
- CSS 요소 디테일링: 제시된 제플린 UI와 일치율 향상을 위한 작업 필요
- 미흡한 시각화 요소(fade in 등) 보강
- 반응형 브레이크 포인트 md 파트 보강
