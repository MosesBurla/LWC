import { useState, useEffect } from 'react'
import { supabase, type Event } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export function useEvents(category?: string, timeFilter?: string) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  const fetchEvents = async () => {
    try {
      let query = supabase
        .from('events')
        .select(`
          *,
          organizer:users(*),
          rsvps:event_rsvps(count),
          user_rsvp:event_rsvps!inner(status)
        `)
        .order('start_time', { ascending: true })

      if (category && category !== 'All') {
        query = query.eq('category', category)
      }

      if (timeFilter === 'upcoming') {
        query = query.gte('start_time', new Date().toISOString())
      } else if (timeFilter === 'past') {
        query = query.lt('start_time', new Date().toISOString())
      }

      const { data, error } = await query

      if (error) throw error
      setEvents(data || [])
    } catch (error: any) {
      toast.error('Failed to load events')
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const rsvpToEvent = async (eventId: string, status: string, note?: string) => {
    if (!user) return

    try {
      // Check if RSVP exists
      const { data: existingRsvp } = await supabase
        .from('event_rsvps')
        .select('*')
        .eq('event_id', eventId)
        .eq('user_id', user.id)
        .single()

      if (existingRsvp) {
        // Update existing RSVP
        const { error } = await supabase
          .from('event_rsvps')
          .update({ status, note })
          .eq('id', existingRsvp.id)

        if (error) throw error
      } else {
        // Create new RSVP
        const { error } = await supabase
          .from('event_rsvps')
          .insert({
            event_id: eventId,
            user_id: user.id,
            status,
            note
          })

        if (error) throw error
      }

      toast.success('RSVP updated successfully!')
      fetchEvents()
    } catch (error: any) {
      toast.error('Failed to update RSVP')
    }
  }

  const createEvent = async (eventData: Partial<Event>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...eventData,
          organizer_id: user.id
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Event created successfully!')
      fetchEvents()
      return data
    } catch (error: any) {
      toast.error('Failed to create event')
      throw error
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [category, timeFilter])

  return {
    events,
    loading,
    rsvpToEvent,
    createEvent,
    refetch: fetchEvents
  }
}