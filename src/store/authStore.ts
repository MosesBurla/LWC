import { create } from 'zustand'
import { supabase, type User } from '../lib/supabase'
import toast from 'react-hot-toast'

interface AuthState {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: {
    email: string
    password: string
    full_name: string
    phone?: string
    location?: string
    reason_for_joining: string
    faith_journey: string
  }) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        // Fetch user profile with proper error handling
        const { data: profiles, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .limit(1)

        if (profileError) {
          console.error('Profile fetch error:', profileError)
          throw new Error('Failed to load user profile')
        }

        if (!profiles || profiles.length === 0) {
          throw new Error('User profile not found')
        }

        const profile = profiles[0]

        if (profile.status !== 'approved') {
          await supabase.auth.signOut()
          throw new Error('Account pending approval')
        }

        set({ user: profile })
        toast.success(`Welcome back, ${profile.full_name}!`)
      }
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  },

  signUp: async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name
          }
        }
      })

      if (error) throw error

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: userData.email,
            full_name: userData.full_name,
            phone: userData.phone,
            location: userData.location,
            reason_for_joining: userData.reason_for_joining,
            faith_journey: userData.faith_journey,
            role: 'member',
            status: 'pending'
          })

        if (profileError) throw profileError

        toast.success('Registration submitted! Awaiting admin approval.')
      }
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      set({ user: null })
      toast.success('Signed out successfully')
    } catch (error: any) {
      toast.error(error.message)
    }
  },

  updateProfile: async (updates) => {
    const { user } = get()
    if (!user) return

    try {
      const { data: updatedProfiles, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .limit(1)

      if (error) throw error

      if (updatedProfiles && updatedProfiles.length > 0) {
        set({ user: updatedProfiles[0] })
        toast.success('Profile updated successfully!')
      }
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  },

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: profiles, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .limit(1)

        if (error) {
          console.error('Auth check error:', error)
          throw error
        }

        if (profiles && profiles.length > 0) {
          set({ user: profiles[0] })
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      // Don't throw error here to prevent app crashes
    } finally {
      set({ loading: false })
    }
  }
}))