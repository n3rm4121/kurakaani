import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useEffect, useState } from 'react'
import { PostCard } from './PostCard';

interface Post {
    id: string
    user_id: string
    title: string
    like_count: number
    image?: string
    reposts: number
    content: string
    created_at: string
    updated_at: string
    user: string
    handle: string
}


export const PostList = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])


    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            console.log(data);
            setPosts(data)
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading posts...</div>
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard post={post} ownerId={user?.id as string} />
            ))}
        </div>
    )
}