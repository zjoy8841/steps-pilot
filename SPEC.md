중학교 2학년 수학 / 파일럿 버전

핵심 목표
- 학생이 로그인 후 수학 성취기준 맵을 보고, 본인에게 맞는 교육용 쇼츠를 선택해서 시청할 수 있는 웹앱

## 기능 목록

### ✅ 1. 인증

- [ ]  학생 로그인 (학교명 / 학년 / 이름 or 학번)
- [ ]  로그아웃
- [ ]  관리자 로그인 (영상 및 성취기준 관리용)

> **세션 정책**: 첫 로그인 시 학교명·학년·이름 입력 → 이후 자동 로그인 (세션 유지).
> 로그아웃은 햄버거 메뉴에서만 가능. 공용 기기 지원은 파일럿 이후 검토.

### ✅ 2. 성취기준 맵

- [ ]  중2 수학 성취기준 목록 표시
- [ ]  성취기준 간 위계(선수학습) 시각화
- [ ]  각 성취기준별 학습 완료 여부 표시 (시청 완료 기준)
- [ ]  성취기준 클릭 시 연결된 쇼츠 목록 표시

### ✅ 3. 쇼츠 추천 & 탐색

- [ ]  성취기준 기반 영상 추천 (해당 성취기준에 태깅된 영상)
- [ ]  전체 영상 목록 탐색 가능
- [ ]  영상별 성취기준 태그 표시

### ✅ 3-1. 추천 알고리즘 (파일럿)

**기본 원칙: 성취기준 기반 추천 + 시청 완료율 보정**

추천 우선순위:

1. 선수학습 완료된 성취기준의 다음 단계 영상 (아직 미시청)
2. 시청했지만 완료율이 낮은 영상 (다시 보기 유도)
3. 현재 성취기준 내 미시청 영상

제외 대상:

- 완료 처리된 영상 (completed = true)

> 고도화 시 추가 예정: 영상 스타일 / 난이도 태그 기반 흥미 추천

> **아이디어 메모 (미확정)**: 영상 시청 후 AI가 문제를 제출하고 학생이 음성으로 답변하는 방식.
> 수학은 계산 과정 검증이 어려워 객관식·O/X 개념 확인 정도에 적합.
> 타 과목 확장 시 핵심 기능으로 검토. (음성 인식 + LLM 채점 필요)

### ✅ 4. 쇼츠 시청

- [ ]  YouTube IFrame으로 영상 재생
- [ ]  시청 완료 시 해당 성취기준 진도 업데이트
- [ ]  시청 기록 저장

### ✅ 5. 관리자 기능

- [ ]  영상 등록 (YouTube URL + 성취기준 태깅)
- [ ]  영상 수정 / 삭제
- [ ]  성취기준 목록 관리

---

## 고도화 섹션

> **학생 데이터 보안 (정식 도입 시 검토)**
> 파일럿은 사내 테스트 수준으로 실제 학생 개인정보 미사용 → 현재 문제없음.
> 정식 학교 도입 시: 교육부 개인정보 처리방침 확인, Supabase 서버 위치(현재 미국) 이슈 가능.
> 대응책: 국내 클라우드(NCP 등)에 Supabase 셀프호스팅 또는 자체 백엔드 전환.

> **YouTube 의존도 축소 (파일럿 이후 검토)**
> 파일럿은 YouTube unlisted 영상으로 운영.
> 정식 서비스 전환 시 Cloudflare Stream 또는 자체 S3+CloudFront로 이전 검토.
> 이유: 학교 방화벽 우회 + 학생 개인정보(Google 미전송) + 영상 접근 권한 통제.

---

## DO

- 컴포넌트는 기능별로 분리해서 작성
- DB 스키마 변경 시 반드시 확인 후 진행
- 영상은 YouTube IFrame API로만 임베드
- 스타일은 Tailwind CSS 사용
- 모바일 화면 기준으로 먼저 설계 (쇼츠 특성상)

## DON'T

- 기존 파일 무단 삭제 금지
- API 키 / 환경변수 코드에 직접 하드코딩 금지
- 한 번에 여러 기능 동시에 작업 금지 — 하나씩 완성 후 다음으로
- 실제 학생 개인정보 테스트 데이터로 사용 금지

---

## 기술 스택

- Frontend: React
- Backend / DB / Auth: Supabase
- 영상: YouTube IFrame API
- 스타일: Tailwind CSS
- 배포: Vercel (예정)

---

## DB 테이블 (초안)

### users (통합 계정)

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | PK |
| name | text | 이름 |
| school | text | 학교명 |
| grade | int | 학년 (학생만) |
| role | text | student / teacher / admin |

> 파일럿 권한 정책: teacher와 admin 모두 영상 등록 가능. 삭제는 admin만. 추후 세분화 예정.
> 

### achievements (성취기준)

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | PK |
| code | text | 성취기준 코드 (예: 수학-중2-01) |
| title | text | 성취기준명 |
| description | text | 설명 |
| prerequisite_ids | uuid[] | 선수 성취기준 목록 |

### videos (영상)

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | PK |
| title | text | 영상 제목 |
| youtube_url | text | YouTube URL |

### video_achievements (영상-성취기준 연결)

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| video_id | uuid | FK |
| achievement_id | uuid | FK |

> 영상 1개 → 성취기준 여러 개 태깅 가능 (다대다)
> 

### watch_history (시청 기록)

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | PK |
| user_id | uuid | FK |
| video_id | uuid | FK |
| watched_at | timestamp | 시청 시각 |
| completed | boolean | 완료 여부 |
| watch_rate | int | 시청 완료율 (0~100%) |

---

## 진행 현황

- [x]  기획 확정
- [x]  CLAUDE.md 작성
- [x]  화면 디자인 목업 완료 (mockups/ 폴더, 총 8개 화면)
- [x]  React 프로젝트 초기화 (Vite + React + TypeScript + Tailwind + Supabase JS)
- [x]  Supabase 프로젝트 생성 (steps-pilot / Northeast Asia Seoul)
- [x]  DB 스키마 세팅 (테이블 5개: users, achievements, videos, video_achievements, watch_history)
- [x]  로그인 화면 구현 (학교명/학년/이름 입력 → Supabase 조회 → 세션 유지)
- [x]  쇼츠 시청 화면 구현 (YouTube IFrame, 카테고리 탭, 햄버거 드로어 — 더미 데이터)
- [x]  성취기준 맵 구현 (단원별 성취기준, 영상별 시청 바 — 더미 데이터)
- [ ]  로그아웃 확인 모달 구현
- [ ]  영상 완료 후 바텀시트 구현
- [ ]  관리자 화면 구현 (영상 등록/삭제, 성취기준 관리)
- [ ]  Vercel 배포

## 실제 데이터 연동 (영상 확보 후)

> 현재 쇼츠 시청 화면과 성취기준 맵은 더미 데이터로 동작. 영상 확보 후 아래 순서로 연동.

- [ ]  Supabase `achievements` 테이블에 중2 수학 성취기준 데이터 입력
- [ ]  Supabase `videos` 테이블에 영상 데이터 입력 (YouTube URL + 성취기준 태깅)
- [ ]  MainPage: 더미 데이터 → Supabase `videos` + `video_achievements` 조회로 교체
- [ ]  YouTube IFrame API로 실제 시청 시간(watch_rate) 추적 구현
- [ ]  완료 버튼 → Supabase `watch_history` 테이블에 저장
- [ ]  AchievementMapPage: 더미 데이터 → `watch_history` 읽어서 완료율 바 렌더링으로 교체
- [ ]  추천 알고리즘 적용 (선수학습 완료 기준 다음 단계 영상 우선 노출)

## 환경 설정 현황

- Supabase URL: https://qvctejeahzokfoxwohht.supabase.co
- Supabase 리전: Northeast Asia (Seoul)
- API 키: .env 파일에 저장 (VITE_SUPABASE_ANON_KEY)