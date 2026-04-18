-- ================================================
-- Steps 파일럿 DB 스키마
-- ================================================

-- 1. users (학생 / 교사 / 관리자)
create table public.users (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  school     text not null,
  grade      int,
  role       text not null default 'student'
               check (role in ('student', 'teacher', 'admin')),
  created_at timestamptz default now()
);

-- 2. achievements (성취기준)
create table public.achievements (
  id               uuid primary key default gen_random_uuid(),
  code             text not null unique,
  title            text not null,
  description      text,
  prerequisite_ids uuid[] default '{}',
  order_index      int default 0,
  created_at       timestamptz default now()
);

-- 3. videos (영상)
create table public.videos (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  youtube_url  text not null,
  created_at   timestamptz default now()
);

-- 4. video_achievements (영상 ↔ 성취기준 다대다)
create table public.video_achievements (
  video_id       uuid references public.videos(id)       on delete cascade,
  achievement_id uuid references public.achievements(id) on delete cascade,
  primary key (video_id, achievement_id)
);

-- 5. watch_history (시청 기록)
create table public.watch_history (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users(id)  on delete cascade,
  video_id   uuid references public.videos(id) on delete cascade,
  watched_at timestamptz default now(),
  completed  boolean default false,
  watch_rate int default 0 check (watch_rate >= 0 and watch_rate <= 100)
);

-- ================================================
-- 인덱스 (조회 성능)
-- ================================================
create index on public.watch_history (user_id);
create index on public.watch_history (video_id);
create index on public.video_achievements (achievement_id);
create index on public.achievements (order_index);
