import { useNavigate } from 'react-router-dom'

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(99,102,241,.2) 0%, transparent 70%), linear-gradient(160deg, #0a0a14 0%, #0d0d1e 50%, #120820 100%)' }}>

      {/* 배경 수식 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <span className="absolute text-[120px] font-black top-[8%] left-[-5%]" style={{ color: 'rgba(255,255,255,.03)' }}>∑</span>
        <span className="absolute text-[80px] font-black top-[20%] right-[-3%]" style={{ color: 'rgba(255,255,255,.03)' }}>π</span>
        <span className="absolute text-[90px] font-black top-[55%] left-[60%]" style={{ color: 'rgba(255,255,255,.03)' }}>∫</span>
        <span className="absolute text-[60px] font-black top-[70%] left-[-4%]" style={{ color: 'rgba(255,255,255,.03)' }}>√</span>
      </div>

      {/* 브랜딩 */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">

        {/* 로고 */}
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(145deg, #6366f1, #a855f7)', boxShadow: '0 16px 40px rgba(99,102,241,.45)' }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M10 28L19 10L28 28" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 22h11" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-4xl font-black text-white tracking-tight mb-3">Steps</h1>
        <p className="text-sm text-center leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>
          성취기준에 맞춘 <span style={{ color: 'rgba(165,180,252,.75)', fontWeight: 600 }}>짧은 수학 영상</span>으로<br />
          내 수준부터 차근차근
        </p>

        {/* 기능 태그 */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {['성취기준 맞춤 추천', '3분 이내 핵심 정리', '내 진도 자동 기록'].map((text) => (
            <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.6)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="relative px-6 pb-14">
        <button
          onClick={() => navigate('/login')}
          className="w-full h-14 rounded-2xl font-bold text-base text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 10px 30px rgba(99,102,241,.4)' }}>
          학생으로 시작하기
        </button>
        <p className="mt-4 text-center text-xs" style={{ color: 'rgba(255,255,255,.22)' }}>
          처음 한 번만 정보를 입력하면 이후엔 자동으로 로그인돼요
        </p>
      </div>

    </div>
  )
}
