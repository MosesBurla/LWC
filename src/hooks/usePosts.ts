import { useState, useEffect } from 'react'
import { supabase, type Post } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export function usePosts(filter?: string, groupId?: string) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          author:users(*),
          reactions:post_reactions(*),
          comments:comments(count)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (filter && filter !== 'all') {
        query = query.eq('type', filter)
      }

      if (groupId) {
        query = query.eq('group_id', groupId)
      }

      const { data, error } = await query

      if (error) throw error
      setPosts(data || [])
    } catch (error: any) {
      toast.error('Failed to load posts')
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData: {
    content: string
    type: string
    media_urls?: string[]
    visibility?: string
    group_id?: string
    tags?: string[]
  }) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          author_id: user.id,
          status: 'published'
        })
        .select(`
          *,
          author:users(*),
          reactions:post_reactions(*),
          comments:comments(count)
        `)
        .single()

      if (error) throw error

      setPosts(prev => [data, ...prev])
      toast.success('Post shared with the community!')
      return data
    } catch (error: any) {
      toast.error('Failed to create post')
      throw error
    }
  }

  const reactToPost = async (postId: string, reactionType: string) => {
    if (!user) return

    try {
      // Check if user already reacted
      const { data: existingReaction } = await supabase
        .from('post_reactions')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('type', reactionType)
        .single()

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('post_reactions')
          .delete()
          .eq('id', existingReaction.id)

        if (error) throw error
        toast.success('Reaction removed')
      } else {
        // Add reaction (remove other reactions first)
        await supabase
          .from('post_reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)

        const { error } = await supabase
          .from('post_reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            type: reactionType
          })

        if (error) throw error
        toast.success('Reaction added')
      }

      // Refresh posts
      fetchPosts()
    } catch (error: any) {
      toast.error('Failed to update reaction')
    }
  }

  const addComment = async (postId: string, content: string, parentId?: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content,
          parent_id: parentId
        })

      if (error) throw error

      toast.success('Comment posted')
      fetchPosts() // Refresh to get updated comment count
    } catch (error: any) {
      toast.error('Failed to post comment')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [filter, groupId])

  return {
    posts,
    loading,
    createPost,
    reactToPost,
    addComment,
    refetch: fetchPosts
  }
}