import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/supabase/supabaseClient'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'
import { Button } from './ui/button'
import { Repeat, ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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

const PostCard = ({ post, currentUserId }: { post: Post, currentUserId: string }) => {
    const isOwner = post.user_id === currentUserId

    const handleLike = async (postId: string) => {
        try {
            const { error } = await supabase
                .from('posts')
                .update({ likes: post.like_count + 1 })
                .match({ id: postId })

            if (error) throw error
        } catch (error) {
            console.error('Error liking post:', (error as Error).message)
        }
    }

    const handleRepost = async (postId: string) => {
        try {
            const { error } = await supabase
                .from('posts')
                .update({ reposts: post.reposts + 1 })
                .match({ id: postId })

            if (error) throw error
        } catch (error) {
            console.error('Error reposting post:', (error as Error).message)
        }
    }

    return (
        <div className="space-y-6">
            <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 bg-emerald-200">
                            <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={post.user} />
                            <AvatarFallback>{post.user?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <h2 className="font-semibold text-lg">{post.user}</h2>
                            <p className="text-gray-500">{post.handle}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="mb-4 text-lg">{post.content}</p>
                </div>
                <div className="relative h-64 w-full mb-4">
                    <img
                        src={post.image}
                        alt="Post image"
                        className="transition-opacity object-fill duration-300 ease-in-out hover:opacity-90"
                    />
                </div>
                <div className="px-6 pb-4 flex justify-start space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center text-emerald-600 hover:text-emerald-700"
                    >
                        <ThumbsUp className="h-5 w-5 mr-1" />
                        <span>{post.like_count}</span>
                        <span className="sr-only">likes</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRepost(post.id)}
                        className="flex items-center text-emerald-600 hover:text-emerald-700"
                    >
                        <Repeat className="h-5 w-5 mr-1" />
                        <span>{post.reposts}</span>
                        <span className="sr-only">reposts</span>
                    </Button>
                </div>
            </div>
        </div>
    )
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
                <PostCard key={post.id} post={post} currentUserId={user?.id as string} />
            ))}
        </div>
    )
}