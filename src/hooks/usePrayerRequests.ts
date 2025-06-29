import { useState, useEffect } from 'react'
import { supabase, type PrayerRequest } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export function usePrayerRequests(status?: string, category?: string) {
  const [requests, setRequests] = useState<PrayerRequest[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  const fetchRequests = async () => {
    try {
      let query = supabase
        .from('prayer_requests')
        .select(`
          *,
          author:users(*),
          prayers:prayer_responses(count),
          updates:prayer_updates(*)
        `)
        .order('created_at', { ascending: false })

      if (status && status !== 'All') {
        const statusMap: Record<string, string> = {
          'Needs Prayer': 'needs_prayer',
          'Ongoing': 'ongoing',
          'Answered': 'answered'
        }
        query = query.eq('status', statusMap[status])
      }

      if (category && category !== 'All') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) throw error
      setRequests(data || [])
    } catch (error: any) {
      toast.error('Failed to load prayer requests')
      console.error('Error fetching prayer requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const createRequest = async (requestData: {
    title: string
    content: string
    category: string
    urgency?: string
    is_anonymous?: boolean
    visibility?: string
  }) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .insert({
          ...requestData,
          author_id: user.id,
          status: 'needs_prayer',
          urgency: requestData.urgency || 'normal',
          visibility: requestData.visibility || 'public'
        })
        .select(`
          *,
          author:users(*),
          prayers:prayer_responses(count)
        `)
        .single()

      if (error) throw error

      setRequests(prev => [data, ...prev])
      toast.success('Prayer request submitted successfully')
      return data
    } catch (error: any) {
      toast.error('Failed to submit prayer request')
      throw error
    }
  }

  const prayForRequest = async (requestId: string) => {
    if (!user) return

    try {
      // Check if user already prayed
      const { data: existingPrayer } = await supabase
        .from('prayer_responses')
        .select('*')
        .eq('prayer_request_id', requestId)
        .eq('user_id', user.id)
        .eq('type', 'prayed')
        .single()

      if (existingPrayer) {
        // Remove prayer
        const { error } = await supabase
          .from('prayer_responses')
          .delete()
          .eq('id', existingPrayer.id)

        if (error) throw error
        toast.success('Prayer removed')
      } else {
        // Add prayer
        const { error } = await supabase
          .from('prayer_responses')
          .insert({
            prayer_request_id: requestId,
            user_id: user.id,
            type: 'prayed'
          })

        if (error) throw error
        toast.success('Thank you for praying! Your support means everything.')
      }

      fetchRequests()
    } catch (error: any) {
      toast.error('Failed to update prayer')
    }
  }

  const updateRequestStatus = async (requestId: string, status: string, updateMessage?: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ status })
        .eq('id', requestId)
        .eq('author_id', user.id) // Only author can update

      if (error) throw error

      if (updateMessage) {
        await supabase
          .from('prayer_updates')
          .insert({
            prayer_request_id: requestId,
            content: updateMessage
          })
      }

      const statusMessages: Record<string, string> = {
        'answered': "Status updated to 'Answered' - Praise God!",
        'ongoing': "Status updated to 'Ongoing'",
        'needs_prayer': "Status updated to 'Needs Prayer'"
      }

      toast.success(statusMessages[status] || 'Status updated')
      fetchRequests()
    } catch (error: any) {
      toast.error('Failed to update status')
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [status, category])

  return {
    requests,
    loading,
    createRequest,
    prayForRequest,
    updateRequestStatus,
    refetch: fetchRequests
  }
}