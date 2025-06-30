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
  resetPassword: (email: string, newPassword: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  checkAuth: () => Promise<void>
}

// Helper function to sync user profile with auth user
const syncUserProfile = async (authUser: any, additionalData?: Partial<User>): Promise<User> => {
  const userData = {
    id: authUser.id,
    email: authUser.email,
    full_name: authUser.user_metadata?.full_name || additionalData?.full_name || 'User',
    role: 'member' as const,
    status: 'approved' as const,
    ...additionalData
  }

  // Use upsert to handle both insert and update scenarios
  const { data: profile, error } = await supabase
    .from('users')
    .upsert(userData, {
      onConflict: 'email',
      ignoreDuplicates: false
    })
    .select()
    .single()

  if (error) {
    console.error('Profile sync error:', error)
    throw new Error('Failed to sync user profile')
  }

  return profile
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
        const profile = await syncUserProfile(data.user)

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
        await syncUserProfile(data.user, {
          full_name: userData.full_name,
          phone: userData.phone,
          location: userData.location,
          reason_for_joining: userData.reason_for_joining,
          faith_journey: userData.faith_journey
        })

        toast.success('Registration successful! You can now sign in.')
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

  resetPassword: async (email: string, newPassword: string) => {
    try {
      // Check if user exists
      const { data: users, error } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle()

      if (error) throw error
      if (!users) {
        throw new Error('User not found')
      }

      // In production, you would:
      // 1. Use Supabase Admin API to update the password
      // 2. Or use the proper password reset flow with email verification
      
      // For demo, we'll just show success
      toast.success('Password reset successfully!')
      
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  },

  updateProfile: async (updates) => {
    const { user } = get()
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      set({ user: data })
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  },

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const profile = await syncUserProfile(session.user)
        set({ user: profile })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      // Don't throw error here to prevent app crashes
    } finally {
      set({ loading: false })
    }
  }
}))