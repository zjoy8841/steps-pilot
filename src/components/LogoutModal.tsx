import type { User } from '../types'

interface Props {
  user: User | null
  onCancel: () => void
  onConfirm: () => void
}

export default function LogoutModal({ user, onCancel, onConfirm }: Props) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(8px)' }}
      onClick={onCancel}>

      <div className="w-72 rounded-3xl p-7 mx-4"
        style={{ background: '#1e1e30', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 24px 60px rgba(0,0,0,.6)' }}
        onClick={e => e.stopPropagation()}>

        {/* 아이콘 */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(239,68,68,.15)', border: '1px solid rgba(239,68,68,.25)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16 17 21 12 16 7" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <p className="text-lg font-black text-white text-center mb-2" style={{ letterSpacing: -0.3 }}>로그아웃</p>
        <p className="text-sm text-center mb-5" style={{ color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>
          다음에 앱을 열면<br />다시 로그인이 필요해요
        </p>

        {/* 사용자 칩 */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl mb-5"
          style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', fontSize: 15 }}>
            {user?.name?.[0] ?? '?'}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{user?.name}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,.22)', marginTop: 1 }}>
              {user?.school} · {user?.grade}학년
            </p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <button onClick={onCancel}
            className="flex-1 h-12 rounded-2xl text-sm font-bold"
            style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.45)' }}>
            취소
          </button>
          <button onClick={onConfirm}
            className="flex-1 h-12 rounded-2xl text-sm font-bold"
            style={{ background: 'rgba(239,68,68,.15)', border: '1px solid rgba(239,68,68,.3)', color: '#f87171' }}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}
