import { useState, useEffect } from 'react'
import { supabase, type Devotional } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export function useDevotionals(tag?: string, search?: string) {
  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [todaysDevotional, setTodaysDevotional] = useState<Devotional | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  const fetchDevotionals = async () => {
    try {
      let query = supabase
        .from('devotionals')
        .select(`
          *,
          author:users(*),
          reactions:devotional_reactions(*)
        `)
        .order('date', { ascending: false })

      if (tag && tag !== 'All') {
        query = query.contains('tags', [tag])
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setDevotionals(data || [])

      // Get today's devotional
      const today = new Date().toISOString().split('T')[0]
      const todaysData = data?.find(d => d.date === today)
      setTodaysDevotional(todaysData || data?.[0] || null)
    } catch (error: any) {
      toast.error('Failed to load devotionals')
      console.error('Error fetching devotionals:', error)
    } finally {
      setLoading(false)
    }
  }

  const reactToDevotional = async (devotionalId: string, reactionType: string) => {
    if (!user) return

    try {
      // Check if user already reacted with this type
      const { data: existingReaction } = await supabase
        .from('devotional_reactions')
        .select('*')
        .eq('devotional_id', devotionalId)
        .eq('user_id', user.id)
        .eq('type', reactionType)
        .single()

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('devotional_reactions')
          .delete()
          .eq('id', existingReaction.id)

        if (error) throw error
        
        const messages: Record<string, string> = {
          'love': 'Reaction removed',
          'bookmark': 'Bookmark removed',
          'share': 'Share removed'
        }
        toast.success(messages[reactionType] || 'Reaction removed')
      } else {
        // Add reaction
        const { error } = await supabase
          .from('devotional_reactions')
          .insert({
            devotional_id: devotionalId,
            user_id: user.id,
            type: reactionType
          })

        if (error) throw error

        const messages: Record<string, string> = {
          'love': 'Devotional loved!',
          'bookmark': 'Devotional bookmarked!',
          'share': 'Devotional shared!'
        }
        toast.success(messages[reactionType] || 'Reaction added')
      }

      fetchDevotionals()
    } catch (error: any) {
      toast.error('Failed to update reaction')
    }
  }

  const subscribeToDevotionals = async (email: string, timePreference?: string, timezone?: string) => {
    try {
      // This would typically call an edge function to handle email subscription
      const { data, error } = await supabase.functions.invoke('subscribe-devotionals', {
        body: { email, time_preference: timePreference, timezone }
      })

      if (error) throw error

      toast.success("You're subscribed! Check your email for confirmation.")
    } catch (error: any) {
      toast.error('Failed to subscribe')
    }
  }

  useEffect(() => {
    fetchDevotionals()
  }, [tag, search])

  return {
    devotionals,
    todaysDevotional,
    loading,
    reactToDevotional,
    subscribeToDevotionals,
    refetch: fetchDevotionals
  }
}