import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useEffect, useState } from 'react'
import { PostCard } from './PostCard';

export interface GetPostsResponse {
    id: string
    owner: {
        id: string
        avatar_url: string
        name: string
    }
    title: string
    content: string
    like_count: number
    image_url?: string
    liked_by: string[]
    reposted_by: string[]
    repost_count: number
    created_at: string
}


export const PostList = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<GetPostsResponse[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])


    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    id, 
                    title, 
                    content, 
                    like_count,
                    repost_count,
                    image_url, 
                    created_at, 
                    liked_by,
                    reposted_by,
                    owner
                  `)
                .order('created_at', { ascending: false });

            if (error) throw error
            setPosts(data.map(post => ({
                ...post,
                likedBy: post.liked_by
            })))
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
                <PostCard key={post.id} post={post} ownerId={user?.id as string} />
            ))}
        </div>
    )
}