# 🚀 AlgoStudy - 알고리즘 문제 풀이 & 학습 플랫폼

백준(BOJ) 및 프로그래머스(Programmers) 문제를 풀이하고, 웹 기반 학습 대시보드와 블라인드 복습 기능을 제공하는 알고리즘 학습 플랫폼입니다.

---

## 🌟 주요 기능

1. **📊 학습 대시보드 (Learning Dashboard)**
   - 백준(123문제) 및 프로그래머스(32문제) 총 155문제 풀이 통계
   - 티어별(Gold, Silver, Bronze, Level 2, Level 1) 분포 및 학습 정복률 실시간 트래킹
   - 주요 알고리즘 유형별(#DP, #스택/큐, #수학, #정렬, #그래프 등) 빠른 탐색

2. **🔍 모든 문제 탐색기 (Full Problem Explorer)**
   - 검색(문제 번호, 제목, 유형 태그, 핵심 개념) 및 다중 필터
   - 카드 그리드 뷰 및 고밀도 목록 테이블 뷰 지원
   - 페이지네이션 및 **모든 문제 한 번에 보기(Show All)** 지원

3. **💡 인터랙티브 학습 워크벤치 (Study Workbench)**
   - **지문 분할 뷰**: 원본 문제 설명, 입출력 형식, 제한사항, 예제
   - **소스코드 뷰어**: 구문 강조, 라인 번호, 코드 복사 기능
   - **블라인드 연습 모드**: 정답 코드를 가리고 지문만 보며 사고력 훈련
   - **브라우저 실행기 (Code Playground)**: 브라우저 환경에서 자바스크립트 코드 직접 실행 및 콘솔 확인
   - **나만의 학습 노트**: 문제별 복습 메모 자동 로컬(`localStorage`) 저장

4. **🚀 Netlify 배포 지원**
   - SPA 라우팅 및 정적 에셋 최적화 (`netlify.toml` 완비)

---

## 📂 폴더 구조

```text
📁 algorithm
 ┣ 📂 백준                  # 백준 문제 풀이 폴더 (Gold, Silver, Bronze)
 ┣ 📂 프로그래머스           # 프로그래머스 문제 풀이 폴더 (Level 2, 기초/입문)
 ┣ 📂 scripts              # 문제 자동 추출 및 인덱싱 스크립트
 ┣ 📂 src                  # React + Tailwind CSS 학습 플랫폼 소스코드
 ┃ ┣ 📂 components         # 대시보드, 문제 탐색기, 상세 모달 등
 ┃ ┣ 📂 data               # 155개 문제 데이터 (problems.json)
 ┃ ┣ 📂 types              # TypeScript 타입 정의
 ┃ ┗ 📂 utils              # 로컬 스토리지 상태 저장 유틸
 ┣ 📜 netlify.toml         # Netlify 배포 설정 파일
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

## 💻 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 문제 데이터 추출 및 로컬 개발 서버 시작
npm run dev

# 3. 배포용 빌드 테스트
npm run build
```

---

## 🌐 Netlify 배포 가이드

Netlify 저장소 연결 시 아래 설정으로 자동 배포됩니다:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- `netlify.toml`의 SPA 리다이렉트 규칙(`/* -> /index.html 200`)이 자동 적용됩니다.
