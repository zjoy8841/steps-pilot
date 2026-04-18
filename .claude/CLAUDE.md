## 프로젝트 개요

중학교 2학년 수학 성취기준 기반 교육용 쇼츠 시청 웹앱.
학생이 로그인 후 성취기준 맵을 보고 본인에게 맞는 쇼츠를 선택해서 시청한다.
현재는 사내 파일럿 버전이며 영상 10~20개 규모로 시작한다.

## 기술 스택

- Frontend: React
- Backend / DB / Auth: Supabase
- 영상: YouTube IFrame API (비공개 영상 임베드)
- 스타일: Tailwind CSS
- 배포: Vercel

## 디렉토리 구조

`src/
  components/     # 재사용 컴포넌트
  pages/          # 라우팅 단위 페이지
  hooks/          # 커스텀 훅
  lib/            # Supabase 클라이언트 등 외부 연동
  types/          # TypeScript 타입 정의`

## 사용자 역할

- `student` : 성취기준 맵 조회, 쇼츠 시청
- `teacher` : 영상 등록 가능
- `admin` : 영상 등록 + 삭제, 성취기준 관리

## 추천 알고리즘 원칙

1. 선수학습 완료된 성취기준의 다음 단계 미시청 영상 우선
2. 시청했지만 완료율(watch_rate)이 낮은 영상 재추천
3. completed = true인 영상은 추천에서 제외

## DO

- 컴포넌트는 기능별로 분리해서 작성할 것
- DB 스키마 변경 시 반드시 확인 후 진행할 것
- 영상은 YouTube IFrame API로만 임베드할 것
- 모바일 화면 기준으로 먼저 설계할 것 (쇼츠 특성상)
- 한 번에 기능 하나씩 완성 후 다음으로 넘어갈 것
- 진행 현황은 SPEC.md 체크박스 기준으로 관리할 것

## DON'T

- 기존 파일 무단 삭제 금지
- API 키 / 환경변수 코드에 직접 하드코딩 금지 (.env 사용)
- 한 번에 여러 기능 동시 작업 금지
- 실제 학생 개인정보 테스트 데이터로 사용 금지
- Supabase 스키마를 코드로 직접 수정 금지 (Supabase 대시보드에서 관리)

## 환경변수 (.env)

`VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=`

## 참고

- 기능 목록 및 진행 현황 → SPEC.md 참조
- 파일럿 완료 후 고도화 항목 (영상 스타일/난이도 태그 기반 추천 등) 은 SPEC.md 하단 고도화 섹션 참조