import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const GRADES = [1, 2, 3]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [school, setSchool] = useState('')
  const [grade, setGrade] = useState<number>(2)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isReady = school.trim() && name.trim()

  const handleLogin = async () => {
    if (!isReady) return
    setLoading(true)
    setError('')

    const { data, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('school', school.trim())
      .eq('grade', grade)
      .eq('name', name.trim())
      .eq('role', 'student')
      .single()

    setLoading(false)

    if (dbError || !data) {
      setError('입력한 정보와 일치하는 학생을 찾을 수 없어요.\n선생님께 등록 여부를 확인해주세요.')
      return
    }

    login(data)
    navigate('/main')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse 80% 50% at 80% -10%, rgba(99,102,241,.15) 0%, transparent 60%), linear-gradient(160deg, #0a0a14 0%, #0d0d1e 50%, #120820 100%)' }}>

      {/* 배경 수식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <span className="absolute font-black top-[-5%] right-[-18%]" style={{ fontSize: 200, color: 'rgba(255,255,255,.025)' }}>∑</span>
        <span className="absolute font-black bottom-[20%] left-[-5%]" style={{ fontSize: 80, color: 'rgba(255,255,255,.03)' }}>∫</span>
      </div>

      {/* 상단 */}
      <div className="relative px-6 pt-14">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-xl flex items-center justify-center mb-7"
          style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 13L5 8l5-5" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-3xl font-black text-white tracking-tight">안녕하세요 👋</h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.38)' }}>
          선생님께 받은 정보로<br />로그인해 주세요
        </p>
      </div>

      {/* 폼 */}
      <div className="relative flex-1 px-6 pt-8 space-y-5">

        {/* 학교명 */}
        <div>
          <label className="block text-xs font-bold mb-2 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,.35)' }}>학교명</label>
          <div className="flex items-center gap-3 h-14 px-4 rounded-2xl" style={{ background: 'rgba(255,255,255,.07)', border: `1px solid ${school ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.12)'}` }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ opacity: .5, flexShrink: 0 }}>
              <path d="M2 16V8l7-5 7 5v8" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
              <rect x="6.5" y="11" width="5" height="5" rx="1" stroke="white" strokeWidth="1.6" />
            </svg>
            <input
              type="text"
              placeholder="학교명을 입력하세요"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:font-normal"
              style={{ color: 'rgba(255,255,255,.88)', caretColor: '#818cf8' }}
            />
          </div>
        </div>

        {/* 학년 */}
        <div>
          <label className="block text-xs font-bold mb-2 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,.35)' }}>학년</label>
          <div className="flex gap-2">
            {GRADES.map((g) => (
              <button key={g} onClick={() => setGrade(g)}
                className="flex-1 h-14 rounded-2xl text-sm font-bold transition-all"
                style={grade === g
                  ? { background: 'rgba(99,102,241,.25)', border: '1px solid rgba(99,102,241,.5)', color: '#a5b4fc' }
                  : { background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.4)' }}>
                {g}학년
              </button>
            ))}
          </div>
        </div>

        {/* 이름 */}
        <div>
          <label className="block text-xs font-bold mb-2 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,.35)' }}>이름</label>
          <div className="flex items-center gap-3 h-14 px-4 rounded-2xl" style={{ background: 'rgba(255,255,255,.07)', border: `1px solid ${name ? 'rgba(99,102,241,.55)' : 'rgba(255,255,255,.12)'}`, boxShadow: name ? '0 0 0 3px rgba(99,102,241,.12)' : 'none' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ opacity: .5, flexShrink: 0 }}>
              <circle cx="9" cy="6" r="3" stroke="white" strokeWidth="1.6" />
              <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:font-normal"
              style={{ color: 'rgba(255,255,255,.88)', caretColor: '#818cf8' }}
            />
          </div>
          <p className="mt-2 text-xs pl-1" style={{ color: 'rgba(255,255,255,.2)' }}>* 학교에 등록된 이름과 동일하게 입력하세요</p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="px-4 py-3 rounded-xl text-xs leading-relaxed whitespace-pre-line"
            style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', color: '#fca5a5' }}>
            {error}
          </div>
        )}
      </div>

      {/* 로그인 버튼 */}
      <div className="relative px-6 pb-14 pt-6">
        <button
          onClick={handleLogin}
          disabled={!isReady || loading}
          className="w-full h-14 rounded-2xl font-bold text-base transition-all"
          style={isReady
            ? { background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', boxShadow: '0 10px 30px rgba(99,102,241,.4)' }
            : { background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.3)', cursor: 'not-allowed' }}>
          {loading ? '확인 중...' : '로그인'}
        </button>
      </div>

    </div>
  )
}
