import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Drawer from '../components/Drawer'
import LogoutModal from '../components/LogoutModal'
import CompleteSheet from '../components/CompleteSheet'

interface VideoData {
  id: string
  youtubeId: string
  title: string
  achievement: { unit: string; name: string }
  orderInAchievement: number
  totalInAchievement: number
}

// 더미 데이터 — 실제 영상 확보 후 Supabase로 교체 예정
const DUMMY_VIDEOS: VideoData[] = [
  {
    id: '1',
    youtubeId: 'OmJ-4B-mS-Y',
    title: '지수법칙 완전 정복 — 곱셈과 나눗셈 핵심 정리',
    achievement: { unit: '수와 연산', name: '단항식의 계산' },
    orderInAchievement: 2,
    totalInAchievement: 3,
  },
  {
    id: '2',
    youtubeId: 'NybHckSEQBI',
    title: '다항식의 덧셈과 뺄셈 — 동류항 정리부터',
    achievement: { unit: '수와 연산', name: '다항식의 계산' },
    orderInAchievement: 1,
    totalInAchievement: 2,
  },
  {
    id: '3',
    youtubeId: 'l3XzepN03KQ',
    title: '일차방정식 풀이 완전 정복',
    achievement: { unit: '문자와 식', name: '일차방정식' },
    orderInAchievement: 1,
    totalInAchievement: 2,
  },
]

const CATEGORIES = ['유리수', '단항식', '다항식', '방정식', '함수']

export default function MainPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showCompleteSheet, setShowCompleteSheet] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCat, setActiveCat] = useState(1)

  const handleLogoutConfirm = () => {
    logout()
    navigate('/')
  }

  const video = DUMMY_VIDEOS[currentIndex]

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#000' }}>
      <div className="relative w-full h-full" style={{ maxWidth: 430, margin: '0 auto' }}>

        {/* YouTube 플레이어 */}
        <iframe
          key={video.youtubeId}
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />

        {/* 상단 오버레이 */}
        <div
          className="absolute top-0 left-0 right-0 z-10 px-4 pt-12 pb-4 flex items-center gap-3"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.75) 0%, transparent 100%)' }}
        >
          {/* 햄버거 버튼 */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
            style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)' }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} className="block rounded-sm" style={{ width: 18, height: 2, background: 'rgba(255,255,255,.9)' }} />
            ))}
          </button>

          {/* 성취기준 카테고리 가로 스크롤 */}
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCat(i)}
                className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap flex-shrink-0"
                style={
                  i < activeCat
                    ? { background: 'rgba(255,255,255,.13)', color: 'rgba(255,255,255,.4)', textDecoration: 'line-through', fontWeight: 500 }
                    : i === activeCat
                    ? { background: '#fff', color: '#111', fontWeight: 700 }
                    : { background: 'rgba(255,255,255,.13)', color: 'rgba(255,255,255,.6)', fontWeight: 500 }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 성취기준 배지 */}
        <div
          className="absolute z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ top: 100, left: 18, background: 'rgba(99,102,241,.2)', border: '1px solid rgba(99,102,241,.4)', backdropFilter: 'blur(10px)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#818cf8' }} />
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,.8)' }}>
            {video.achievement.unit} › {video.achievement.name}
          </span>
          <span className="text-xs font-bold" style={{ color: '#a5b4fc' }}>
            {video.orderInAchievement} / {video.totalInAchievement}
          </span>
        </div>

        {/* 우측 액션 버튼 */}
        <div className="absolute z-10 flex flex-col items-center gap-5" style={{ right: 14, bottom: 210 }}>
          <ActionBtn
            label="완료"
            style={{ background: 'rgba(99,102,241,.25)', border: '1px solid rgba(99,102,241,.5)' }}
            onClick={() => setShowCompleteSheet(true)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="9" stroke="rgba(165,180,252,.9)" strokeWidth="1.8" />
              <path d="M7 11.5l3 3 5-5" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ActionBtn>

          <ActionBtn
            label="저장"
            style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)' }}
            onClick={() => {}}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4h12v13l-6-3-6 3V4z" stroke="rgba(255,255,255,.75)" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </ActionBtn>
        </div>

        {/* 하단 오버레이 */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.5) 65%, transparent 100%)' }}
        >
          {/* 성취기준 경로 */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,.5)' }}>{video.achievement.unit}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,.3)' }}>›</span>
            <span className="text-xs font-bold" style={{ color: '#a5b4fc' }}>{video.achievement.name}</span>
          </div>

          {/* 영상 제목 */}
          <p className="font-bold text-white mb-3" style={{ fontSize: 17, lineHeight: 1.4, letterSpacing: -0.3 }}>
            {video.title}
          </p>

          {/* 순서 도트 */}
          <div className="flex items-center gap-1.5 mb-4">
            {Array.from({ length: video.totalInAchievement }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i + 1 === video.orderInAchievement ? 20 : 6,
                  background:
                    i + 1 < video.orderInAchievement
                      ? 'rgba(255,255,255,.55)'
                      : i + 1 === video.orderInAchievement
                      ? '#818cf8'
                      : 'rgba(255,255,255,.25)',
                }}
              />
            ))}
            <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,.4)' }}>
              이 성취기준의 {video.orderInAchievement}번째 영상
            </span>
          </div>

          {/* 이전 / 다음 */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="flex-1 h-10 rounded-xl text-sm font-bold"
              style={{
                background: 'rgba(255,255,255,.08)',
                color: currentIndex === 0 ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.75)',
              }}
            >
              ← 이전
            </button>
            <button
              onClick={() => setCurrentIndex(i => Math.min(DUMMY_VIDEOS.length - 1, i + 1))}
              disabled={currentIndex === DUMMY_VIDEOS.length - 1}
              className="flex-1 h-10 rounded-xl text-sm font-bold"
              style={{
                background: 'rgba(255,255,255,.08)',
                color: currentIndex === DUMMY_VIDEOS.length - 1 ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.75)',
              }}
            >
              다음 →
            </button>
          </div>
        </div>

        {/* 드로어 딤 배경 */}
        {drawerOpen && (
          <div
            className="absolute inset-0 z-20"
            style={{ background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(3px)' }}
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* 드로어 */}
        {drawerOpen && (
          <Drawer
            user={user}
            onClose={() => setDrawerOpen(false)}
            onLogoutRequest={() => { setDrawerOpen(false); setShowLogoutModal(true) }}
          />
        )}

        {/* 완료 바텀시트 */}
        {showCompleteSheet && (
          <CompleteSheet
            video={video}
            onNext={() => {
              setShowCompleteSheet(false)
              setCurrentIndex(i => Math.min(DUMMY_VIDEOS.length - 1, i + 1))
            }}
            onClose={() => setShowCompleteSheet(false)}
          />
        )}

        {/* 로그아웃 확인 모달 */}
        {showLogoutModal && (
          <LogoutModal
            user={user}
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={handleLogoutConfirm}
          />
        )}
      </div>
    </div>
  )
}

function ActionBtn({ label, style, onClick, children }: {
  label: string
  style: React.CSSProperties
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <div className="w-11 h-11 rounded-full flex items-center justify-center" style={style}>
        {children}
      </div>
      <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,.7)' }}>{label}</span>
    </button>
  )
}
