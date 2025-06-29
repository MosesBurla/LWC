import { useState, useEffect } from 'react'
import { supabase, type Group } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export function useGroups(category?: string, search?: string) {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  const fetchGroups = async () => {
    try {
      let query = supabase
        .from('groups')
        .select(`
          *,
          leader:users(*),
          members:group_members(count),
          user_membership:group_members!inner(role, status)
        `)
        .order('created_at', { ascending: false })

      if (category && category !== 'All') {
        query = query.eq('category', category)
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setGroups(data || [])
    } catch (error: any) {
      toast.error('Failed to load groups')
      console.error('Error fetching groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const joinGroup = async (groupId: string, message?: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: user.id,
          role: 'member',
          status: 'active'
        })

      if (error) throw error

      toast.success('Welcome to the group!')
      fetchGroups()
    } catch (error: any) {
      toast.error('Failed to join group')
    }
  }

  const leaveGroup = async (groupId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id)

      if (error) throw error

      toast.success('Left group successfully')
      fetchGroups()
    } catch (error: any) {
      toast.error('Failed to leave group')
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [category, search])

  return {
    groups,
    loading,
    joinGroup,
    leaveGroup,
    refetch: fetchGroups
  }
}