import { useNavigate } from 'react-router-dom'
import type { User } from '../types'

interface Props {
  user: User | null
  onClose: () => void
  onLogoutRequest: () => void
}

export default function Drawer({ user, onClose, onLogoutRequest }: Props) {
  const navigate = useNavigate()

  return (
    <div
      className="absolute top-0 left-0 bottom-0 z-30 flex flex-col"
      style={{ width: 280, background: '#12121e', paddingTop: 52, paddingBottom: 32 }}
    >
      {/* 프로필 헤더 */}
      <div className="px-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
          >
            {user?.name?.[0] ?? '?'}
          </div>
          <div>
            <p className="font-bold text-white" style={{ fontSize: 16 }}>{user?.name}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,.4)' }}>
              {user?.school} {user?.grade}학년
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl p-3" style={{ background: 'rgba(255,255,255,.06)' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,.5)' }}>전체 학습 진도</span>
            <span className="text-sm font-extrabold" style={{ color: '#818cf8' }}>35%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,.1)' }}>
            <div className="h-full rounded-full" style={{ width: '35%', background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="flex-1 py-4 overflow-y-auto">
        <p className="px-6 pt-2 pb-1 text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,.25)' }}>학습</p>

        <MenuItem icon="▶" color="rgba(99,102,241,.2)" title="쇼츠 보기" sub="지금 추천된 영상 시청" active onClick={onClose} />
        <MenuItem icon="🗺" color="rgba(59,130,246,.2)" title="성취기준 맵" sub="전체 학습 경로 보기" onClick={() => { onClose(); navigate('/map') }} />
        <MenuItem icon="✓" color="rgba(16,185,129,.2)" title="내 시청 기록" sub="완료한 영상 목록" badge="12" onClick={onClose} />

        <p className="px-6 pt-4 pb-1 text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,.25)' }}>탐색</p>
        <MenuItem icon="🔍" color="rgba(245,158,11,.2)" title="전체 영상 목록" sub="성취기준별 모아보기" onClick={onClose} />
      </div>

      {/* 로그아웃 */}
      <div className="px-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <button onClick={onLogoutRequest} className="flex items-center gap-2.5 py-2.5 w-full">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: 'rgba(239,68,68,.15)' }}
          >↩</div>
          <span className="text-sm font-semibold" style={{ color: 'rgba(239,68,68,.75)' }}>로그아웃</span>
        </button>
      </div>
    </div>
  )
}

function MenuItem({ icon, color, title, sub, active, badge, onClick }: {
  icon: string
  color: string
  title: string
  sub: string
  active?: boolean
  badge?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3.5 px-6 py-3"
      style={{ background: active ? 'rgba(99,102,241,.12)' : 'transparent' }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: color }}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold" style={{ color: active ? '#a5b4fc' : 'rgba(255,255,255,.85)' }}>{title}</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,.35)', marginTop: 1 }}>{sub}</p>
      </div>
      {badge && (
        <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ background: '#6366f1' }}>{badge}</span>
      )}
    </button>
  )
}
