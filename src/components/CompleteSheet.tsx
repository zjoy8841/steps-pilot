import { useNavigate } from 'react-router-dom'

interface VideoData {
  title: string
  achievement: { unit: string; name: string }
  orderInAchievement: number
  totalInAchievement: number
}

interface Props {
  video: VideoData
  onNext: () => void
  onClose: () => void
}

export default function CompleteSheet({ video, onNext, onClose }: Props) {
  const navigate = useNavigate()
  const { orderInAchievement: order, totalInAchievement: total } = video
  const pct = Math.round((order / total) * 100)
  const isLastVideo = order === total

  return (
    <>
      {/* 딤 배경 */}
      <div className="absolute inset-0 z-30" style={{ background: 'rgba(0,0,0,.4)' }} onClick={onClose} />

      {/* 바텀시트 */}
      <div className="absolute bottom-0 left-0 right-0 z-40 rounded-t-3xl px-6 pb-12 pt-7"
        style={{ background: '#12121e', border: '1px solid rgba(255,255,255,.1)', borderBottom: 'none' }}>

        {/* 드래그 핸들 */}
        <div className="w-9 h-1 rounded-full mx-auto mb-6" style={{ background: 'rgba(255,255,255,.15)' }} />

        {/* 완료 아이콘 */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-18 h-18 rounded-full flex items-center justify-center mb-3.5 relative"
            style={{
              width: 72, height: 72,
              background: 'linear-gradient(145deg, rgba(99,102,241,.3), rgba(168,85,247,.3))',
              border: '2px solid rgba(99,102,241,.5)',
              boxShadow: '0 0 32px rgba(99,102,241,.25)',
            }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16l6 6 10-11" stroke="#a5b4fc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-2xl font-black text-white mb-1" style={{ letterSpacing: -0.5 }}>학습 완료!</p>
          <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>
            <span style={{ color: '#a5b4fc', fontWeight: 700 }}>{video.achievement.name}</span> {order}번째 영상<br />을 모두 시청했어요
          </p>
        </div>

        {/* 성취기준 진도 */}
        <div className="rounded-2xl px-4 py-3.5 mb-4"
          style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,.45)' }}>
              {video.achievement.name} 진도
            </span>
            <span className="text-xs font-bold" style={{ color: '#a5b4fc' }}>{order} / {total} 완료</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden mb-2.5" style={{ background: 'rgba(255,255,255,.08)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
          </div>
          <div className="flex gap-1.5 justify-center">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full"
                style={{ background: i < order ? '#6366f1' : 'rgba(255,255,255,.12)' }} />
            ))}
          </div>
        </div>

        {/* 버튼 */}
        {!isLastVideo ? (
          <button onClick={onNext}
            className="w-full h-14 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2 mb-2.5"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 8px 24px rgba(99,102,241,.35)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polygon points="5,3 15,9 5,15" fill="white" />
            </svg>
            다음 영상 바로 보기
          </button>
        ) : (
          <button onClick={onClose}
            className="w-full h-14 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2 mb-2.5"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 8px 24px rgba(99,102,241,.35)' }}>
            🎉 성취기준 완료!
          </button>
        )}
        <button onClick={() => navigate('/map')}
          className="w-full h-12 rounded-2xl text-sm font-semibold"
          style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.45)' }}>
          성취기준 맵으로 이동
        </button>
      </div>
    </>
  )
}
