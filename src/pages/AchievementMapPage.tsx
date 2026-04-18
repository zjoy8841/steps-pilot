import { useNavigate } from 'react-router-dom'

type VideoStatus = 'done' | 'skipped' | 'unseen'
type AchStatus = 'done' | 'current' | 'locked'
type UnitColor = 'green' | 'blue' | 'purple' | 'locked'

interface VideoBar { status: VideoStatus; watchRate?: number }
interface Achievement { id: string; code: string; name: string; status: AchStatus; videos: VideoBar[] }
interface Unit { name: string; color: UnitColor; completed: number; total: number; achievements: Achievement[] }

// 더미 데이터 — Supabase 연결 후 교체 예정
const UNITS: Unit[] = [
  {
    name: '수와 연산', color: 'green', completed: 2, total: 4,
    achievements: [
      {
        id: '1', code: '수학-중2-01', name: '유리수와 순환소수', status: 'done',
        videos: [{ status: 'done' }, { status: 'done' }, { status: 'done' }],
      },
      {
        id: '2', code: '수학-중2-02', name: '소수의 분류', status: 'done',
        videos: [{ status: 'done' }, { status: 'skipped', watchRate: 42 }, { status: 'done' }],
      },
      {
        id: '3', code: '수학-중2-03', name: '단항식의 계산', status: 'current',
        videos: [{ status: 'done' }, { status: 'skipped', watchRate: 67 }, { status: 'unseen' }],
      },
      {
        id: '4', code: '수학-중2-04', name: '다항식의 계산', status: 'locked',
        videos: [],
      },
    ],
  },
  {
    name: '방정식과 부등식', color: 'blue', completed: 0, total: 3,
    achievements: [
      { id: '5', code: '수학-중2-05', name: '연립방정식', status: 'locked', videos: [] },
      { id: '6', code: '수학-중2-06', name: '일차부등식', status: 'locked', videos: [] },
    ],
  },
  {
    name: '도형과 측정', color: 'locked', completed: 0, total: 4,
    achievements: [],
  },
]

const UNIT_COLORS: Record<UnitColor, { header: string; dot: string; dotGlow: string }> = {
  green:  { header: 'rgba(88,204,2,.12)',    dot: '#58CC02', dotGlow: 'rgba(88,204,2,.5)' },
  blue:   { header: 'rgba(28,176,246,.10)',  dot: '#1CB0F6', dotGlow: 'rgba(28,176,246,.5)' },
  purple: { header: 'rgba(168,85,247,.10)',  dot: '#a855f7', dotGlow: 'rgba(168,85,247,.5)' },
  locked: { header: 'rgba(255,255,255,.04)', dot: 'rgba(255,255,255,.2)', dotGlow: 'transparent' },
}

const UNIT_BORDER: Record<UnitColor, string> = {
  green:  'rgba(88,204,2,.2)',
  blue:   'rgba(28,176,246,.18)',
  purple: 'rgba(168,85,247,.18)',
  locked: 'rgba(255,255,255,.08)',
}

export default function AchievementMapPage() {
  const navigate = useNavigate()

  const totalCompleted = UNITS.reduce((s, u) => s + u.completed, 0)
  const totalAll = UNITS.reduce((s, u) => s + u.total, 0)
  const pct = Math.round((totalCompleted / totalAll) * 100)

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#0a0a14', maxWidth: 430, margin: '0 auto' }}>

      {/* 배경 글로우 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,.15) 0%, transparent 70%)',
      }} />

      {/* 헤더 */}
      <div className="relative z-10 px-5 pt-12 pb-4 flex-shrink-0"
        style={{ background: 'linear-gradient(to bottom, #0a0a14 80%, transparent)' }}>

        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/main')}
            className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8l5-5" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-lg font-black text-white" style={{ letterSpacing: -0.4 }}>성취기준 맵</span>
        </div>

        {/* 전체 진도 카드 */}
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)' }}>
          <div className="flex-1">
            <p className="text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,.45)' }}>전체 학습 진도</p>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.08)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
            </div>
            <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,.22)' }}>
              {totalCompleted}개 완료 · {totalAll - totalCompleted}개 남음
            </p>
          </div>
          <p className="font-black flex-shrink-0" style={{ fontSize: 26, color: '#a5b4fc', lineHeight: 1 }}>
            {pct}<span className="text-sm font-medium">%</span>
          </p>
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-5 pb-8" style={{ scrollbarWidth: 'none' }}>

        {/* 범례 */}
        <div className="flex gap-3 mb-4 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,.04)' }}>
          {[
            { color: '#4ade80', label: '완료' },
            { color: '#fb923c', label: '넘김 (부분 시청)' },
            { color: 'rgba(255,255,255,.15)', label: '미시청' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-1 rounded-sm flex-shrink-0" style={{ background: color }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,.22)' }}>{label}</span>
            </div>
          ))}
        </div>

        {UNITS.map((unit, ui) => {
          const col = UNIT_COLORS[unit.color]
          const isLocked = unit.color === 'locked'
          return (
            <div key={ui} className="mb-3">
              {/* 단원 헤더 */}
              <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl mb-1.5"
                style={{ background: col.header, border: `1px solid ${UNIT_BORDER[unit.color]}`, opacity: isLocked ? 0.6 : 1 }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: col.dot, boxShadow: `0 0 6px ${col.dotGlow}` }} />
                  <span className="text-sm font-bold" style={{ color: isLocked ? 'rgba(255,255,255,.22)' : 'rgba(255,255,255,.9)' }}>
                    {unit.name}
                  </span>
                </div>
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,.22)' }}>
                  {unit.completed} / {unit.total} 완료
                </span>
              </div>

              {/* 성취기준 목록 */}
              {unit.achievements.length > 0 && (
                <div className="flex flex-col gap-1.5 pl-2">
                  {unit.achievements.map((ach, ai) => (
                    <div key={ach.id}>
                      <AchItem ach={ach} />
                      {ai < unit.achievements.length - 1 && (
                        <div className="w-px h-2 ml-7" style={{ background: 'rgba(255,255,255,.08)' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AchItem({ ach }: { ach: Achievement }) {
  const isCurrent = ach.status === 'current'
  const isDone = ach.status === 'done'
  const isLocked = ach.status === 'locked'

  return (
    <div className="relative overflow-hidden rounded-2xl px-3.5 py-3 flex flex-col gap-2.5"
      style={{
        background: isCurrent ? 'rgba(99,102,241,.12)' : '#12121e',
        border: `1px solid ${isCurrent ? 'rgba(99,102,241,.35)' : 'rgba(255,255,255,.06)'}`,
        opacity: isLocked ? 0.38 : 1,
        cursor: isLocked ? 'default' : 'pointer',
      }}>

      {/* 좌측 강조 바 (현재 진행 중) */}
      {isCurrent && (
        <div className="absolute left-0 rounded-r-sm"
          style={{ top: '10%', bottom: '10%', width: 3, background: 'linear-gradient(to bottom, #6366f1, #a855f7)' }} />
      )}

      {/* 상단 행 */}
      <div className="flex items-center gap-2.5">
        <StatusIcon status={ach.status} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold mb-0.5"
            style={{ color: isCurrent ? '#818cf8' : 'rgba(255,255,255,.22)' }}>
            {ach.code}
          </p>
          <p className="text-sm font-bold truncate"
            style={{ color: isCurrent ? '#c7d2fe' : isDone ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.22)' }}>
            {ach.name}
          </p>
        </div>
        <span style={{ color: isCurrent ? '#818cf8' : 'rgba(255,255,255,.22)', fontSize: 14 }}>›</span>
      </div>

      {/* 영상별 시청 바 */}
      {ach.videos.length > 0 && (
        <div className="flex gap-1.5">
          {ach.videos.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col gap-1">
              <div className="h-1.5 rounded-sm overflow-hidden relative" style={{ background: 'rgba(255,255,255,.08)' }}>
                <div className="absolute inset-y-0 left-0 rounded-sm"
                  style={{
                    width: v.status === 'done' ? '100%' : v.status === 'skipped' ? `${v.watchRate}%` : '0%',
                    background: v.status === 'done' ? '#4ade80' : v.status === 'skipped' ? '#fb923c' : 'transparent',
                  }} />
              </div>
              <span className="text-xs" style={{
                fontSize: 9, fontWeight: 600, lineHeight: 1,
                color: v.status === 'done' ? '#4ade80' : v.status === 'skipped' ? '#fb923c' : 'rgba(255,255,255,.22)',
              }}>
                {v.status === 'done' ? '완료' : v.status === 'skipped' ? `${v.watchRate}% 넘김` : '미시청'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusIcon({ status }: { status: AchStatus }) {
  const bg = status === 'done' ? 'rgba(88,204,2,.15)' : status === 'current' ? 'rgba(99,102,241,.2)' : 'rgba(255,255,255,.06)'
  return (
    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
      {status === 'done' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="rgba(88,204,2,.2)" />
          <path d="M5 8l2.5 2.5L11 5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {status === 'current' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="rgba(99,102,241,.6)" strokeWidth="1.5" />
          <polygon points="6.5,5 11.5,8 6.5,11" fill="#818cf8" />
        </svg>
      )}
      {status === 'locked' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="4" y="7" width="8" height="6" rx="1.5" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />
          <path d="M6 7V5a2 2 0 014 0v2" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}
