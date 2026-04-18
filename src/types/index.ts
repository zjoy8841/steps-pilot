export type Role = 'student' | 'teacher' | 'admin'

export interface User {
  id: string
  name: string
  school: string
  grade: number | null
  role: Role
  created_at: string
}
