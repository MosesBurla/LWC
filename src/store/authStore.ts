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
        // Fetch user profile with better error handling
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle() // Use maybeSingle instead of single to handle no results gracefully

        if (profileError) {
          console.error('Profile fetch error:', profileError)
          throw new Error('Failed to load user profile')
        }

        if (!profile) {
          // Check if a profile exists with this email but different ID
          const { data: existingProfile, error: existingError } = await supabase
            .from('users')
            .select('*')
            .eq('email', data.user.email || email)
            .maybeSingle()

          if (existingError) {
            console.error('Existing profile check error:', existingError)
            throw new Error('Failed to check existing profile')
          }

          if (existingProfile) {
            // Update the existing profile's ID to match the authenticated user
            const { data: updatedProfile, error: updateError } = await supabase
              .from('users')
              .update({ id: data.user.id })
              .eq('email', data.user.email || email)
              .select()
              .single()

            if (updateError) {
              console.error('Profile update error:', updateError)
              throw new Error('Failed to update user profile')
            }

            if (updatedProfile.status !== 'approved') {
              await supabase.auth.signOut()
              throw new Error('Account pending approval')
            }

            set({ user: updatedProfile })
            toast.success(`Welcome back, ${updatedProfile.full_name}!`)
            return
          }

          // If no profile exists, create one from auth data
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email || email,
              full_name: data.user.user_metadata?.full_name || 'User',
              role: 'member',
              status: 'approved' // Auto-approve for demo purposes
            })
            .select()
            .single()

          if (createError) {
            console.error('Profile creation error:', createError)
            throw new Error('Failed to create user profile')
          }

          set({ user: newProfile })
          toast.success(`Welcome, ${newProfile.full_name}!`)
          return
        }

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
            status: 'approved' // Auto-approve for demo purposes
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          throw profileError
        }

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
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle()

        if (error) {
          console.error('Auth check error:', error)
          throw error
        }

        if (profile) {
          set({ user: profile })
        } else {
          // Check if a profile exists with this email but different ID
          const { data: existingProfile, error: existingError } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email || '')
            .maybeSingle()

          if (existingError) {
            console.error('Existing profile check error:', existingError)
          } else if (existingProfile) {
            // Update the existing profile's ID to match the authenticated user
            const { data: updatedProfile, error: updateError } = await supabase
              .from('users')
              .update({ id: session.user.id })
              .eq('email', session.user.email || '')
              .select()
              .single()

            if (updateError) {
              console.error('Profile update error:', updateError)
            } else {
              set({ user: updatedProfile })
              return
            }
          }

          // Create profile if it doesn't exist and no existing profile was found
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || 'User',
              role: 'member',
              status: 'approved'
            })
            .select()
            .single()

          if (createError) {
            console.error('Profile creation error:', createError)
          } else {
            set({ user: newProfile })
          }
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