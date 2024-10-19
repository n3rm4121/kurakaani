import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useEffect, useState } from 'react'
import { PostCard } from './PostCard';
import { toast } from '@/hooks/use-toast';
import { Circle } from 'lucide-react';
import Loader from '../Loader';

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
            toast({ title: 'Error fetching posts', description: (error as Error).message, variant: 'destructive' })
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loader size="md" centered={true} />
    }



    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} ownerId={user?.id as string} />
            ))}
        </div>
    )
}